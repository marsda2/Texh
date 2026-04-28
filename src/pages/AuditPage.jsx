import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ArrowRight, CheckCircle2, ShieldCheck, Mail, Phone, Info } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { supabase } from '../lib/supabase';
import { SEO } from '../components/SEO';

const AuditPage = () => {
    const { t, language } = useLanguage();
    const es = language === 'es';

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [service, setService] = useState('');
    const [message, setMessage] = useState('');
    
    const [step, setStep] = useState(1); // 1: DateTime, 2: Info, 3: Success
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Generate next 14 days (excluding weekends)
    const [availableDays, setAvailableDays] = useState([]);
    useEffect(() => {
        const days = [];
        let date = new Date();
        while (days.length < 10) {
            date.setDate(date.getDate() + 1);
            if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
                days.push(new Date(date));
            }
        }
        setAvailableDays(days);
    }, []);

    const timeSlots = ["10:00", "11:00", "12:00", "15:00", "16:00", "17:00"];

    const handleNext = () => {
        if (selectedDate && selectedTime) {
            setStep(2);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = {
            date: formatDate(selectedDate),
            time_slot: selectedTime,
            email: emailOrPhone, // the edge function looks at email field specifically
            iso_date: selectedDate.toISOString(), // exact date for ICS generation
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        try {
            // Inserción en Supabase que disparará el Webhook/Edge Function
            const { error } = await supabase
                .from('call_bookings')
                .insert(data);
                
            if (error) throw error;
            
            // Trigger GA Event if window.gtag exists
            if (window.gtag) {
                window.gtag('event', 'book_audit', {
                    'event_category': 'audit',
                    'event_label': service
                });
            }

            setTimeout(() => {
                setIsSubmitting(false);
                setStep(3);
            }, 1000);
        } catch (err) {
            console.error('Error booking audit:', err);
            setIsSubmitting(false);
            alert(es ? 'Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.' : 'There was an error processing your request. Please try again.');
        }
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat(es ? 'es-ES' : 'en-US', { 
            weekday: 'short', month: 'short', day: 'numeric' 
        }).format(date);
    };

    return (
        <div className="min-h-screen bg-neutral pt-32 pb-24 px-4 flex flex-col items-center justify-center relative overflow-hidden">
            <SEO 
                title={es ? "Auditoría Digital Gratuita" : "Free Digital Audit"}
                description={es ? "Reserva tu sesión estratégica gratuita con nuestros ingenieros." : "Book your free strategy session with our engineers."}
                url="https://texhco.com/audit"
            />
            {/* Visual Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-chartreuse/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-obsidian/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl border border-obsidian/5 overflow-hidden flex flex-col md:flex-row relative z-10">
                
                {/* Left Panel: Branding & Context */}
                <div className="w-full md:w-1/3 bg-obsidian p-10 text-white flex flex-col relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-chartreuse to-white opacity-50" />
                    
                    <span className="px-3 py-1 bg-chartreuse/20 text-chartreuse text-[10px] font-black uppercase tracking-widest rounded-full border border-chartreuse/20 w-fit mb-8">
                        {es ? 'Sesión Estratégica' : 'Strategy Session'}
                    </span>
                    
                    <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-6">
                        {es ? 'Auditoría' : 'Digital'}<br/>
                        <span className="text-chartreuse">{es ? 'Digital' : 'Audit'}</span>
                    </h2>
                    
                    <p className="text-white/60 text-sm mb-12 leading-relaxed">
                        {es 
                            ? 'Analizaremos tu ecosistema digital actual y trazaremos un plan exacto para escalar tu negocio.' 
                            : 'We will analyze your current digital ecosystem and map out an exact plan to scale your business.'}
                    </p>

                    <div className="mt-auto space-y-6">
                        <div className="flex items-start gap-4">
                            <Clock className="text-chartreuse w-5 h-5 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-sm text-white">30 Min</h4>
                                <p className="text-white/70 text-xs">{es ? 'Videollamada' : 'Video call'}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <CalendarIcon className="text-chartreuse w-5 h-5 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-sm text-white">Google Meet</h4>
                                <p className="text-white/70 text-xs">{es ? 'Enlace automático' : 'Automatic link'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Form / Calendar */}
                <div className="w-full md:w-2/3 p-8 md:p-12">
                    
                    {/* Steps Header */}
                    {step < 3 && (
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-obsidian text-white' : 'bg-gray-100 text-obsidian/40'}`}>1</div>
                                <span className={`text-xs font-bold uppercase tracking-wider ${step >= 1 ? 'text-obsidian' : 'text-obsidian/40'}`}>
                                    {es ? 'Fecha' : 'Date'}
                                </span>
                            </div>
                            <div className="h-[2px] w-8 bg-gray-200" />
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-obsidian text-white' : 'bg-gray-100 text-obsidian/40'}`}>2</div>
                                <span className={`text-xs font-bold uppercase tracking-wider ${step >= 2 ? 'text-obsidian' : 'text-obsidian/40'}`}>
                                    {es ? 'Detalles' : 'Details'}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Step 1: Calendar */}
                    {step === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div>
                                <h3 className="text-xl font-black text-obsidian mb-4">{es ? 'Selecciona un día' : 'Select a day'}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {availableDays.map((day, i) => {
                                        const isSelected = selectedDate?.getTime() === day.getTime();
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedDate(day)}
                                                className={`p-4 rounded-2xl border text-left transition-all ${
                                                    isSelected 
                                                        ? 'border-chartreuse bg-chartreuse/5 shadow-md scale-[1.02]' 
                                                        : 'border-obsidian/10 hover:border-obsidian/30 hover:bg-neutral'
                                                }`}
                                            >
                                                <span className="block text-xs uppercase tracking-wider text-obsidian/50 font-bold mb-1">
                                                    {new Intl.DateTimeFormat(es ? 'es-ES' : 'en-US', { weekday: 'short' }).format(day)}
                                                </span>
                                                <span className={`block font-black text-lg ${isSelected ? 'text-obsidian' : 'text-obsidian'}`}>
                                                    {new Intl.DateTimeFormat(es ? 'es-ES' : 'en-US', { day: 'numeric', month: 'short' }).format(day)}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {selectedDate && (
                                <div className="animate-in fade-in slide-in-from-bottom-4">
                                    <h3 className="text-xl font-black text-obsidian mb-4">{es ? 'Selecciona una hora' : 'Select a time'}</h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {timeSlots.map((time, i) => {
                                            const isSelected = selectedTime === time;
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`p-3 rounded-xl border font-bold text-sm transition-all ${
                                                        isSelected 
                                                            ? 'border-obsidian bg-obsidian text-white shadow-lg' 
                                                            : 'border-obsidian/10 text-obsidian hover:border-obsidian/30'
                                                    }`}
                                                >
                                                    {time}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleNext}
                                disabled={!selectedDate || !selectedTime}
                                className="w-full bg-chartreuse text-obsidian py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#b0df1a] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                            >
                                {es ? 'Continuar' : 'Continue'}
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    )}

                    {/* Step 2: Info Form */}
                    {step === 2 && (
                        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="bg-neutral p-4 rounded-2xl mb-8 flex items-center justify-between border border-obsidian/5">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-obsidian/50 font-bold mb-1">{es ? 'Selección' : 'Selected'}</p>
                                    <p className="font-black text-obsidian text-sm">
                                        {formatDate(selectedDate)} a las {selectedTime}
                                    </p>
                                </div>
                                <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-obsidian underline hover:text-chartreuse">
                                    {es ? 'Cambiar' : 'Change'}
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/40 ml-4 flex items-center gap-2">
                                    <ShieldCheck size={12} />
                                    {es ? 'Email o Teléfono *' : 'Email or Phone *'}
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        placeholder={es ? 'tu@email.com o +34 600...' : 'you@email.com or +1 234...'}
                                        value={emailOrPhone}
                                        onChange={e => setEmailOrPhone(e.target.value)}
                                        className="w-full bg-white border border-obsidian/10 rounded-2xl p-4 text-sm font-bold focus:ring-4 ring-chartreuse/20 outline-none transition-all"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 text-obsidian/20">
                                        <Mail size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/40 ml-4 flex items-center gap-2">
                                    <Info size={12} />
                                    {es ? 'Servicio *' : 'Service *'}
                                </label>
                                <select
                                    required
                                    value={service}
                                    onChange={e => setService(e.target.value)}
                                    className="w-full bg-white border border-obsidian/10 rounded-2xl p-4 text-sm font-bold focus:ring-4 ring-chartreuse/20 outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>{es ? '— Selecciona una opción —' : '— Select an option —'}</option>
                                    <option value="Web Premium">Web Premium & UX</option>
                                    <option value="IA Automatizacion">AI & Automation</option>
                                    <option value="SEO Local">Local SEO & Maps</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !emailOrPhone || !service}
                                className="w-full bg-obsidian text-chartreuse py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-obsidian/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-8 shadow-xl shadow-obsidian/10"
                            >
                                {isSubmitting ? '...' : (es ? 'Confirmar Auditoría' : 'Confirm Audit')}
                            </button>
                        </form>
                    )}

                    {/* Step 3: Success */}
                    {step === 3 && (
                        <div className="py-12 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-500">
                            <div className="w-20 h-20 rounded-3xl bg-chartreuse flex items-center justify-center shadow-2xl shadow-chartreuse/30 rotate-3">
                                <CheckCircle2 size={36} className="text-obsidian stroke-[3px]" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-obsidian uppercase tracking-tight">
                                    {es ? '¡Auditoría Confirmada!' : 'Audit Confirmed!'}
                                </h3>
                                <p className="text-obsidian/60 font-medium max-w-sm mx-auto">
                                    {es 
                                        ? `Te hemos enviado una invitación de Google Calendar al correo o teléfono proporcionado para el ${formatDate(selectedDate)} a las ${selectedTime}.` 
                                        : `We've sent a Google Calendar invite to the provided contact for ${formatDate(selectedDate)} at ${selectedTime}.`}
                                </p>
                            </div>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="px-10 py-4 bg-obsidian text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-obsidian/90 transition-all shadow-xl mt-8"
                            >
                                {es ? 'Volver al Inicio' : 'Back to Home'}
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AuditPage;
