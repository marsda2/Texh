"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, color-mix(in srgb, #212121 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, #212121 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-matte {
      color: #212121;
      text-shadow: 
          0 10px 30px color-mix(in srgb, #212121 20%, transparent), 
          0 2px 4px color-mix(in srgb, #212121 10%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, #212121 0%, color-mix(in srgb, #212121 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 10px 20px color-mix(in srgb, #212121 15%, transparent)) 
          drop-shadow(0px 2px 4px color-mix(in srgb, #212121 10%, transparent));
  }

  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .premium-depth-card {
      background: linear-gradient(145deg, #111111 0%, #000000 100%); 
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(201,255,31,0.06) 0%, transparent 40%); 
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .iphone-bezel {
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #52525B, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: 
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({ 
  brandName = "TEXH CO.",
  tagline1 = "Tu negocio online,",
  tagline2 = "sin complicaciones.",
  cardHeading = "Tu Socio Digital.",
  cardDescription = <><span className="text-white font-semibold">Texh Co</span> te acompaña paso a paso para tener una web profesional y conseguir más clientes en internet.</>,
  metricValue = 100,
  metricLabel = "Clientes",
  className, 
  ...props 
}: CinematicHeroProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  },[]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 30, scale: 0.95 });
      gsap.set(".text-days", { autoAlpha: 0, y: 30 });
      gsap.set(".main-card", { autoAlpha: 0, y: 50, scale: 0.95 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0, y: 20 });
      
      const introTl = gsap.timeline({ delay: 0.1 });
      
      introTl
        .to(".text-track", { duration: 1, autoAlpha: 1, y: 0, scale: 1, ease: "expo.out" })
        .to(".text-days", { duration: 1, autoAlpha: 1, y: 0, ease: "power4.out" }, "-=0.8")
        .to(".main-card", { duration: 1.2, autoAlpha: 1, y: 0, scale: 1, ease: "expo.out" }, "-=0.6")
        .to(".mockup-wrapper", { duration: 1, autoAlpha: 1, y: 0, ease: "power3.out" }, "-=0.8")
        .to(".phone-widget", { duration: 0.8, autoAlpha: 1, y: 0, stagger: 0.1, ease: "back.out(1.2)" }, "-=0.6")
        .to(".progress-ring", { strokeDashoffset: 60, duration: 1.5, ease: "power3.inOut" }, "-=0.8")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 1.5, ease: "expo.out" }, "-=1.5")
        .to(".floating-badge", { duration: 1, autoAlpha: 1, y: 0, stagger: 0.15, ease: "back.out(1.5)" }, "-=1.0")
        .to(".card-left-text", { duration: 1, autoAlpha: 1, y: 0, ease: "power3.out" }, "-=1.0")
        .to(".card-right-text", { duration: 1, autoAlpha: 1, y: 0, ease: "power3.out" }, "-=1.0");

    }, containerRef);
    return () => ctx.revert();
  },[metricValue]); 

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full min-h-screen pt-32 pb-16 px-4 md:px-8 flex flex-col items-center justify-start bg-transparent font-body antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-20" aria-hidden="true" />

      {/* Hero Texts */}
      <div className="hero-text-wrapper z-10 flex flex-col items-center justify-center text-center w-full mb-12">
        <h1 className="text-track gsap-reveal text-3d-matte text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tighter">
          {tagline2}
        </h1>
      </div>

      <div className="w-full max-w-7xl flex items-center justify-center z-20" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex flex-col lg:flex-row items-center justify-center w-full min-h-[600px] rounded-[32px] md:rounded-[40px] px-6 py-12 lg:px-12 lg:py-16"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* Left Text */}
          <div className="card-left-text gsap-reveal flex-1 flex flex-col justify-center text-center lg:text-left z-20 w-full mb-12 lg:mb-0">
            <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 lg:mb-6 tracking-tight">
              {cardHeading}
            </h3>
            <p className="text-gray-300 text-base md:text-lg font-body font-normal leading-relaxed max-w-md mx-auto lg:mx-0">
              {cardDescription}
            </p>
          </div>

          {/* Center Mockup */}
          <div className="mockup-wrapper relative flex-1 flex items-center justify-center z-10 mb-12 lg:mb-0" style={{ perspective: "1000px" }}>
            <div className="relative transform scale-90 md:scale-100 lg:scale-110">
              <div
                ref={mockupRef}
                className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d"
              >
                <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
                  <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                  <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                  </div>

                  <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                    <div className="phone-widget flex justify-between items-center mb-8">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-1">Texh Dashboard</span>
                        <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Panel</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-chartreuse text-obsidian flex items-center justify-center font-bold text-sm border border-white/10 shadow-lg shadow-black/50">Admin</div>
                    </div>

                    <div className="phone-widget relative w-44 h-44 mx-auto flex items-center justify-center mb-8 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                      <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                        <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                        <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#C9FF1F" strokeWidth="12" />
                      </svg>
                      <div className="text-center z-10 flex flex-col items-center">
                        <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">0</span>
                        <span className="text-[8px] text-gray-400 uppercase tracking-[0.1em] font-bold mt-0.5">{metricLabel}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-chartreuse/20 to-chartreuse/5 flex items-center justify-center mr-3 border border-chartreuse/20 shadow-inner">
                          <svg className="w-4 h-4 text-chartreuse drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 w-20 bg-neutral-300 rounded-full mb-2 shadow-inner" />
                          <div className="h-1.5 w-12 bg-neutral-600 rounded-full shadow-inner" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                  </div>
                </div>
              </div>

              <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-chartreuse/20 to-chartreuse/10 flex items-center justify-center border border-chartreuse/30 shadow-inner">
                  <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">🚀</span>
                </div>
                <div>
                  <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Negocios Online</p>
                  <p className="text-gray-300 text-[10px] lg:text-xs font-medium">100% Operativos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="card-right-text gsap-reveal flex-1 flex justify-center lg:justify-end z-20 w-full">
            <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-heading font-black uppercase tracking-tighter text-card-silver-matte text-center lg:text-right">
              {brandName}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
