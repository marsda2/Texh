"use client";

import { Mic, X, Send, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";

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
  
  // Supabase Lead Capture States
  const [showModal, setShowModal] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
        const generatedBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(generatedBlob);
        setShowModal(true);
        
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

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !audioBlob) return;
    
    setIsSubmitting(true);
    try {
      // 1. Upload audio to storage
      const filename = `idea_${Date.now()}.webm`;
      const { error: uploadError } = await supabase.storage
        .from('audio_uploads')
        .upload(filename, audioBlob, {
           contentType: 'audio/webm',
           upsert: false
        });

      if (uploadError) throw new Error(uploadError.message);

      // 2. Get public URL
      const { data: publicData } = supabase.storage
        .from('audio_uploads')
        .getPublicUrl(filename);
      
      const audioUrl = publicData.publicUrl;

      // 3. Insert lead record into database
      const { error: dbError } = await supabase
        .from('voice_leads')
        .insert({
           email: email,
           audio_url: audioUrl
        });

      if (dbError) throw new Error(dbError.message);

      // Success!
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitSuccess(false);
        setEmail("");
        setAudioBlob(null);
      }, 3000);

    } catch (err: any) {
      console.error("Error subiendo a Supabase:", err);
      alert("Hubo un error al enviar tu idea. Por favor verifica tus credenciales de Supabase o intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Lead Capture Pop-up Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-md"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-gray-light"
              >
                {!submitSuccess && (
                  <button 
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-medium hover:text-obsidian transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}

                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-chartreuse rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="text-obsidian w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-heading font-black text-obsidian mb-2">¡Idea Recibida!</h3>
                    <p className="text-gray-dark font-body">Nuestro equipo la analizará y te contactaremos en breve.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="text-2xl font-heading font-black text-obsidian mb-2">¡Genial! Hemos grabado tu idea.</h3>
                      <p className="text-gray-dark font-body text-sm">Déjanos tu email para que podamos ponernos en contacto contigo y hacerla realidad.</p>
                    </div>

                    <form onSubmit={handleSubmitLead} className="flex flex-col gap-4">
                      <div>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@email.com" 
                          className="w-full px-4 py-3 bg-neutral border border-gray-light rounded-xl focus:outline-none focus:border-obsidian focus:ring-1 focus:ring-obsidian transition-all font-body text-obsidian placeholder:text-gray-medium"
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={isSubmitting || !email}
                        className="w-full bg-obsidian text-white font-heading font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-obsidian/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin text-chartreuse" /> : 'Enviar Idea'}
                      </button>

                      <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-gray-light"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-medium text-xs font-semibold uppercase tracking-wider">O</span>
                        <div className="flex-grow border-t border-gray-light"></div>
                      </div>

                      <button 
                        type="button" 
                        onClick={() => alert("Para habilitar Google Login, configura el proveedor de OAuth en Supabase Auth y actualiza la función signInWithOAuth().")}
                        className="w-full bg-white text-obsidian border border-gray-light font-heading font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                          <path fill="none" d="M1 1h22v22H1z" />
                        </svg>
                        Continuar con Google
                      </button>
                    </form>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

