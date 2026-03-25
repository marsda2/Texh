"use client";

import { Mic } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_WORDS = [
  "Necesito", "un", "ecosistema", "digital", "que", "escale", 
  "con", "alta", "frecuencia", "de", "pagos", "y", "usuarios", 
  "concurrentes", "para", "mi", "nueva", "startup", "tecnológica."
];

const FALLBACK_MESSAGES = [
  "Capturando audio...",
  "Escuchando tu idea...",
  "Procesando voz...",
  "Analizando detalles...",
  "Recopilando información..."
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
  placeholderText = "Pulsa para contar tu idea...",
  recordingText = "Escuchando tu visión..."
}: AIVoiceInputProps) {
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isDemo, setIsDemo] = useState(demoMode);
  const [detectedWords, setDetectedWords] = useState<string[]>([]);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    setIsClient(true);
    // Inicializar SpeechRecognition si está disponible en el navegador (Chrome/Safari)
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "es-ES";
      
      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript.trim()) {
          const words = currentTranscript.trim().split(" ");
          setDetectedWords(words.slice(Math.max(words.length - 5, 0)));
        }
      };
    }
  }, []);

  // Timer & Límite de 5 minutos
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (submitted) {
      intervalId = setInterval(() => {
        setTime((t) => {
          const newTime = t + 1;
          timeRef.current = newTime;
          
          if (!isDemo && newTime >= 300) { // 5 minutos = 300 segundos
            // Forzar parada tras 5 mins
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
               mediaRecorderRef.current.stop();
            }
            return 300;
          }
          return newTime;
        });
      }, 1000);
    } else {
      setTime(0);
      timeRef.current = 0;
    }

    return () => clearInterval(intervalId);
  }, [submitted, isDemo]);

  // Animación Demo
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

  // Palabras mock durante Demo
  useEffect(() => {
    if (isDemo && submitted) {
      let index = 0;
      setDetectedWords([]);
      const wordInterval = setInterval(() => {
        if (index < MOCK_WORDS.length) {
          setDetectedWords(prev => {
            const newWords = [...prev, MOCK_WORDS[index]];
            return newWords.length > 5 ? newWords.slice(newWords.length - 5) : newWords;
          });
          index++;
        } else {
          clearInterval(wordInterval);
        }
      }, 500);
      return () => clearInterval(wordInterval);
    } else if (isDemo && !submitted) {
      setDetectedWords([]);
    }
  }, [submitted, isDemo]);

  // Palabras fallback si no hay Web Speech API en un navegador
  useEffect(() => {
    if (!isDemo && submitted && !recognitionRef.current) {
        let msgIndex = 0;
        setDetectedWords([FALLBACK_MESSAGES[0]]);
        const fallbackInterval = setInterval(() => {
            msgIndex = (msgIndex + 1) % FALLBACK_MESSAGES.length;
            setDetectedWords([FALLBACK_MESSAGES[msgIndex]]);
        }, 3000);
        return () => clearInterval(fallbackInterval);
    }
    if (!isDemo && !submitted) {
        setDetectedWords([]);
    }
  }, [submitted, isDemo]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        alert(`¡Audio capturado (${formatTime(timeRef.current)})!\nEl blob está listo para subirse a Supabase.`);
        console.log("Audio blob listo para Supabase:", audioBlob);
        
        audioChunksRef.current = [];
        stream.getTracks().forEach(track => track.stop());
        setSubmitted(false);
        onStop?.(timeRef.current);
        
        if (recognitionRef.current) {
             try { recognitionRef.current.stop(); } catch(e){}
        }
      };
      
      mediaRecorder.start();
      setSubmitted(true);
      onStart?.();
      
      if (recognitionRef.current) {
         setDetectedWords([]);
         try { recognitionRef.current.start(); } catch(e){}
      }
      
    } catch (err) {
      console.error("Error al acceder al micrófono:", err);
      alert("Por favor, permite el acceso al micrófono de tu navegador para poder grabar tu idea.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    } else {
      setSubmitted(false);
    }
  };

  const handleClick = () => {
    if (isDemo) {
      setIsDemo(false);
      setSubmitted(false);
      setTimeout(startRecording, 100);
      return;
    }
    
    if (submitted) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={cn("w-full py-12 overflow-hidden", className)}>
      <div className="relative max-w-4xl w-full mx-auto flex items-center justify-center flex-col gap-2">
        
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

