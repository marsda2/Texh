import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Clock, Check, Loader2, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';

// ─── Constants ───────────────────────────────────────────────────────────────
const NY_TZ = 'America/New_York';

// 30-min slots, 9:00 AM – 4:30 PM ET
const TIME_SLOTS = [
    '9:00 AM', '9:30 AM',
    '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM',
];

const MONTH_NAMES_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const MONTH_NAMES_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_LABELS_ES = ['Lu','Ma','Mi','Ju','Vi','Sa','Do'];
const DAY_LABELS_EN = ['Mo','Tu','We','Th','Fr','Sa','Su'];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getNYToday() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: NY_TZ }));
}

function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

function isWeekday(date) {
    const d = date.getDay();
    return d !== 0 && d !== 6; // not Sun or Sat
}

function isPastDay(date) {
    const today = getNYToday();
    today.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d < today;
}

// ─── BookingModal ─────────────────────────────────────────────────────────────
const BookingModal = ({ open, onClose, language = 'es' }) => {
    const today = getNYToday();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [visible, setVisible] = useState(false);

    // Animate in
    useEffect(() => {
        if (open) { setTimeout(() => setVisible(true), 10); }
        else { setVisible(false); }
    }, [open]);

    // Close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') handleClose(); };
        if (open) document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [open]);

    const handleClose = useCallback(() => {
        setVisible(false);
        setTimeout(() => {
            onClose();
            setSuccess(false);
            setSelectedDate(null);
            setSelectedSlot(null);
            setEmail('');
        }, 300);
    }, [onClose]);

    // Calendar grid: days of the current view month
    const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
    // ISO week: Mon first → shift Sun to 7
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const prevMonth = () => {
        if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
        else setViewMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
        else setViewMonth(m => m + 1);
    };

    const canGoPrev = () => {
        return !(viewYear === today.getFullYear() && viewMonth === today.getMonth());
    };

    const handleDayClick = (day) => {
        const date = new Date(viewYear, viewMonth, day);
        if (isPastDay(date) || !isWeekday(date)) return;
        setSelectedDate(date);
        setSelectedSlot(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedSlot || !email.includes('@')) return;
        setIsSubmitting(true);
        try {
            const dateStr = `${viewYear}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
            const { error } = await supabase.from('call_bookings').insert({
                email: email.trim(),
                date: dateStr,
                time_slot: selectedSlot,
                timezone: NY_TZ,
            });
            if (error) throw error;
            setSuccess(true);
        } catch (err) {
            console.error('Booking error:', err);
            alert(es ? 'Hubo un error al agendar la llamada. Por favor, intenta de nuevo.' : 'There was an error booking the call. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const es = language === 'es';
    const monthNames = es ? MONTH_NAMES_ES : MONTH_NAMES_EN;
    const dayLabels = es ? DAY_LABELS_ES : DAY_LABELS_EN;

    if (!open) return null;

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
            style={{ background: `rgba(33,33,33,${visible ? 0.55 : 0})`, transition: 'background 0.3s ease', backdropFilter: 'blur(4px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            {/* Modal card */}
            <div
                className="relative bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden"
                style={{
                    transform: visible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
                    opacity: visible ? 1 : 0,
                    transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}
            >
                {/* Header bar */}
                <div className="sticky top-0 z-10 bg-obsidian px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Calendar size={20} className="text-chartreuse" />
                        <div>
                            <p className="text-chartreuse font-heading font-black text-base tracking-tight">
                                {es ? 'Agendar Llamada' : 'Schedule a Call'}
                            </p>
                            <p className="text-white/50 text-xs font-body">
                                {es ? 'Horario laboral · Nueva York (ET)' : 'Business hours · New York (ET)'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                {success ? (
                    /* ── Success state ── */
                    <div className="flex flex-col items-center gap-4 py-14 px-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-chartreuse flex items-center justify-center">
                            <Check size={28} className="text-obsidian" />
                        </div>
                        <h3 className="font-heading font-black text-obsidian text-2xl">
                            {es ? '¡Cita confirmada!' : 'Call confirmed!'}
                        </h3>
                        <p className="text-gray-dark font-body text-sm max-w-xs">
                            {es
                                ? `Nos vemos el ${selectedDate?.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })} a las ${selectedSlot} ET. Te enviaremos los detalles a ${email}.`
                                : `See you on ${selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${selectedSlot} ET. We'll send details to ${email}.`
                            }
                        </p>
                        <button
                            onClick={handleClose}
                            className="mt-4 bg-obsidian text-chartreuse px-8 py-3 rounded-2xl font-heading font-bold text-sm tracking-wider uppercase hover:bg-obsidian/90 transition-all"
                        >
                            {es ? 'Cerrar' : 'Close'}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">

                        {/* ── Calendar ── */}
                        <div>
                            {/* Month nav */}
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    type="button"
                                    onClick={prevMonth}
                                    disabled={!canGoPrev()}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-obsidian hover:bg-neutral disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <span className="font-heading font-black text-obsidian text-sm tracking-wide uppercase">
                                    {monthNames[viewMonth]} {viewYear}
                                </span>
                                <button
                                    type="button"
                                    onClick={nextMonth}
                                    className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-obsidian hover:bg-neutral transition-colors"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>

                            {/* Day labels */}
                            <div className="grid grid-cols-7 mb-2">
                                {dayLabels.map(d => (
                                    <div key={d} className="text-center text-[10px] font-heading font-bold tracking-widest text-gray-400 uppercase py-1">
                                        {d}
                                    </div>
                                ))}
                            </div>

                            {/* Day cells */}
                            <div className="grid grid-cols-7 gap-y-1">
                                {/* leading empty cells */}
                                {Array.from({ length: startOffset }).map((_, i) => (
                                    <div key={`e-${i}`} />
                                ))}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const date = new Date(viewYear, viewMonth, day);
                                    const past = isPastDay(date);
                                    const weekend = !isWeekday(date);
                                    const isToday = isSameDay(date, today);
                                    const isSelected = selectedDate && isSameDay(date, selectedDate);
                                    const disabled = past || weekend;

                                    return (
                                        <button
                                            type="button"
                                            key={day}
                                            onClick={() => handleDayClick(day)}
                                            disabled={disabled}
                                            className={`
                                                relative mx-auto w-9 h-9 rounded-full text-sm font-heading font-semibold
                                                flex items-center justify-center transition-all duration-200
                                                ${isSelected
                                                    ? 'bg-obsidian text-chartreuse shadow-lg scale-110'
                                                    : disabled
                                                        ? 'text-gray-300 cursor-not-allowed'
                                                        : 'text-obsidian hover:bg-neutral cursor-pointer'
                                                }
                                            `}
                                        >
                                            {day}
                                            {isToday && !isSelected && (
                                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-chartreuse" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ── Time slots ── */}
                        {selectedDate && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock size={14} className="text-obsidian" />
                                    <span className="text-xs font-heading font-bold tracking-widest text-obsidian uppercase">
                                        {es ? 'Hora (New York ET)' : 'Time (New York ET)'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {TIME_SLOTS.map(slot => (
                                        <button
                                            type="button"
                                            key={slot}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`
                                                py-2 px-1 rounded-xl text-xs font-heading font-bold tracking-wide
                                                border transition-all duration-200
                                                ${selectedSlot === slot
                                                    ? 'bg-obsidian text-chartreuse border-obsidian shadow-md scale-105'
                                                    : 'bg-neutral border-gray-200 text-obsidian hover:border-obsidian'
                                                }
                                            `}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── Email ── */}
                        {selectedDate && selectedSlot && (
                            <div>
                                <label className="block text-xs font-heading font-bold tracking-widest text-obsidian uppercase mb-2">
                                    {es ? 'Tu Email *' : 'Your Email *'}
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder={es ? 'tu@email.com' : 'you@email.com'}
                                    className="w-full bg-neutral border border-gray-200 focus:border-obsidian focus:shadow-[0_0_0_3px_rgba(33,33,33,0.08)] outline-none rounded-2xl px-5 py-3.5 text-obsidian font-body text-sm transition-all duration-300 placeholder:text-gray-400"
                                />
                            </div>
                        )}

                        {/* ── Summary + Submit ── */}
                        {selectedDate && selectedSlot && (
                            <div className="bg-neutral rounded-2xl p-4 flex flex-col gap-3 border border-gray-200">
                                <p className="text-xs font-heading font-bold tracking-widest text-obsidian/60 uppercase">
                                    {es ? 'Resumen' : 'Summary'}
                                </p>
                                <div className="flex flex-col gap-1">
                                    <p className="text-obsidian font-body text-sm font-semibold">
                                        📅 {selectedDate.toLocaleDateString(es ? 'es-ES' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </p>
                                    <p className="text-obsidian font-body text-sm font-semibold">
                                        🕐 {selectedSlot} <span className="text-gray-400 font-normal">New York (ET)</span>
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !email.includes('@')}
                                    className="w-full flex items-center justify-center gap-2 bg-obsidian text-chartreuse py-3.5 rounded-2xl font-heading font-black text-sm tracking-wider uppercase transition-all duration-300 hover:bg-obsidian/90 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 mt-1"
                                >
                                    {isSubmitting
                                        ? <Loader2 size={16} className="animate-spin" />
                                        : <Check size={16} />
                                    }
                                    {es ? 'Confirmar Llamada' : 'Confirm Call'}
                                </button>
                            </div>
                        )}

                        {!selectedDate && (
                            <p className="text-center text-gray-400 text-xs font-body">
                                {es ? '↑ Selecciona un día disponible (lun–vie)' : '↑ Pick an available day (Mon–Fri)'}
                            </p>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
