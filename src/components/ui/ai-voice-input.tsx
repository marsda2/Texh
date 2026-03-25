"use client";

import { Mic } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_WORDS = [
  "Necesito", "un", "ecosistema", "digital", "que", "escale", 
  "con", "alta", "frecuencia", "de", "pagos", "y", "usuarios", 
  "concurrentes", "para", "mi", "nueva", "startup", "tecnológica."
];

interface AIVoiceInputProps {
  onStart?: () => void;
  onStop?: (duration: number) => void;
  visualizerBars?: number;
  demoMode?: boolean;
  demoInterval?: number;
  className?: string;
  placeholderText?: string;
  recordingText?: string;
}

export function AIVoiceInput({
  onStart,
  onStop,
  visualizerBars = 48,
  demoMode = false,
  demoInterval = 3000,
  className,
  placeholderText = "Click to speak your needs...",
  recordingText = "Listening to your vision..."
}: AIVoiceInputProps) {
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isDemo, setIsDemo] = useState(demoMode);
  const [detectedWords, setDetectedWords] = useState<string[]>([]);

  useEffect(() => {
    if (submitted) {
      let index = 0;
      setDetectedWords([]);
      const wordInterval = setInterval(() => {
        if (index < MOCK_WORDS.length) {
          setDetectedWords(prev => {
            const newWords = [...prev, MOCK_WORDS[index]];
            if (newWords.length > 5) return newWords.slice(newWords.length - 5);
            return newWords;
          });
          index++;
        } else {
          clearInterval(wordInterval);
        }
      }, 500);
      return () => clearInterval(wordInterval);
    } else {
      setDetectedWords([]);
    }
  }, [submitted]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (submitted) {
      onStart?.();
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      if (time > 0) {
          onStop?.(time);
      }
      setTime(0);
    }

    return () => clearInterval(intervalId);
  }, [submitted, time, onStart, onStop]);

  useEffect(() => {
    if (!isDemo) return;

    let timeoutId: NodeJS.Timeout;
    const runAnimation = () => {
      setSubmitted(true);
      timeoutId = setTimeout(() => {
        setSubmitted(false);
        timeoutId = setTimeout(runAnimation, 1000);
      }, demoInterval);
    };

    const initialTimeout = setTimeout(runAnimation, 100);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, [isDemo, demoInterval]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClick = () => {
    if (isDemo) {
      setIsDemo(false);
      setSubmitted(false);
    } else {
      setSubmitted((prev) => !prev);
    }
  };

  return (
    <div className={cn("w-full py-12 overflow-hidden", className)}>
      <div className="relative max-w-4xl w-full mx-auto flex items-center justify-center flex-col gap-2">
        
        {/* Simulated Text Stream */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 lg:right-32 w-28 md:w-48 h-32 flex flex-col justify-end pointer-events-none" style={{ maskImage: "linear-gradient(to bottom, transparent, black 40%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 40%, black 100%)" }}>
          <AnimatePresence mode="popLayout">
            {detectedWords.map((w, i) => (
              <motion.div 
                key={i + w} 
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: Math.max(0.1, 1 - (detectedWords.length - 1 - i) * 0.3), y: 0, filter: "blur(0px)", scale: 1 - (detectedWords.length - 1 - i) * 0.05 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={cn("text-xs md:text-sm font-semibold tracking-tight text-right", submitted ? "text-obsidian/70" : "text-transparent")}
              >
                {w}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button
          className={cn(
            "group w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2 relative z-10",
            submitted
              ? "bg-chartreuse border-transparent shadow-[0_0_30px_rgba(201,255,31,0.4)] scale-105"
              : "bg-white border-obsidian/10 hover:border-obsidian/30 shadow-sm"
          )}
          type="button"
          onClick={handleClick}
        >
          {submitted && (
            <span className="absolute inset-0 rounded-full animate-ping border-2 border-chartreuse/50" />
          )}
          <Mic className={cn("w-6 h-6 transition-colors", submitted ? "text-obsidian" : "text-obsidian/70")} />
        </button>

        <span
          className={cn(
            "font-mono text-sm transition-opacity duration-300 font-bold",
            submitted
              ? "text-chartreuse"
              : "text-gray-medium"
          )}
        >
          {formatTime(time)}
        </span>

        <div className="h-4 w-64 flex items-center justify-center gap-[2px]">
          {[...Array(visualizerBars)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-[3px] rounded-full transition-all duration-300",
                submitted
                  ? "bg-chartreuse animate-pulse"
                  : "bg-gray-light h-1"
              )}
              style={
                submitted && isClient
                  ? {
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.05}s`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        <p className={cn("h-4 text-xs font-bold uppercase tracking-wider mt-2", submitted ? "text-chartreuse" : "text-obsidian")}>
          {submitted ? recordingText : placeholderText}
        </p>
      </div>
    </div>
  );
}
