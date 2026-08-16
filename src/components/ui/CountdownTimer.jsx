import React, { useState, useEffect } from 'react';

export const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 9,
        hours: 23,
        minutes: 59,
        seconds: 59
    });

    useEffect(() => {
        const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;
        let targetTime = localStorage.getItem('auditCountdownTarget');
        const now = new Date().getTime();

        if (!targetTime || parseInt(targetTime, 10) <= now) {
            // Set for 10 days from now
            targetTime = now + TEN_DAYS_MS;
            localStorage.setItem('auditCountdownTarget', targetTime.toString());
        } else {
            targetTime = parseInt(targetTime, 10);
        }

        const updateTimer = () => {
            const currentNow = new Date().getTime();
            let difference = targetTime - currentNow;

            if (difference <= 0) {
                // Reset dynamically if expired
                targetTime = currentNow + TEN_DAYS_MS;
                localStorage.setItem('auditCountdownTarget', targetTime.toString());
                difference = targetTime - currentNow;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            setTimeLeft({ days, hours, minutes, seconds });
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <span className="font-mono tracking-tighter inline-flex items-center gap-1 font-bold">
            <span className="animate-pulse text-chartreuse">⏱</span>
            <span>{String(timeLeft.days).padStart(2, '0')}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s</span>
        </span>
    );
};

