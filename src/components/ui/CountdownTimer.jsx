import React, { useState, useEffect } from 'react';

export const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 9,
        hours: 23,
        minutes: 59,
        seconds: 59
    });

    useEffect(() => {
        // Find or create target date in localStorage
        let targetTime = localStorage.getItem('auditCountdownTarget');
        if (!targetTime) {
            // Set for 10 days from now
            targetTime = new Date().getTime() + 10 * 24 * 60 * 60 * 1000;
            localStorage.setItem('auditCountdownTarget', targetTime.toString());
        } else {
            targetTime = parseInt(targetTime, 10);
        }

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetTime - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                // If it expired, just keep it at 0
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <span className="font-mono tracking-tighter">
            ⏱ {String(timeLeft.days).padStart(2, '0')}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
    );
};
