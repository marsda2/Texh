export const sendGAEvent = (eventName, eventParams) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, eventParams);
    }
};

export const trackLeadEvent = (source, value = 100) => {
    sendGAEvent('generate_lead', {
        currency: 'USD',
        value: value,
        lead_source: source
    });
};
