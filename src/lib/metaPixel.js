// ─── Meta Pixel & CAPI Helper Functions ───────────────────────────────────────
// Provides type-safe wrappers around window.fbq with event deduplication support.
// Sends events simultaneously to the browser Pixel and Vercel Serverless CAPI.

const generateEventId = (prefix) =>
    `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const isFbqReady = () =>
    typeof window !== 'undefined' && typeof window.fbq === 'function';

const sendToCAPI = async (eventName, data, eventID) => {
    try {
        const payload = {
            eventName,
            eventId: eventID,
            eventSourceUrl: typeof window !== 'undefined' ? window.location.href : '',
            customData: { ...data }
        };

        // Extract PII if provided
        if (payload.customData.$email) {
            payload.email = payload.customData.$email;
            delete payload.customData.$email;
        }
        if (payload.customData.$phone) {
            payload.phone = payload.customData.$phone;
            delete payload.customData.$phone;
        }

        await fetch('/api/meta-capi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error('CAPI fetch error:', error);
    }
};

// ─── Standard Events ─────────────────────────────────────────────────────────

export const trackPageView = () => {
    const eventID = generateEventId('pv');
    if (isFbqReady()) {
        window.fbq('track', 'PageView', {}, { eventID });
    }
    sendToCAPI('PageView', {}, eventID);
};

export const trackLead = (data = {}) => {
    const eventID = generateEventId('lead');
    if (isFbqReady()) {
        const cleanData = { ...data };
        delete cleanData.$email; delete cleanData.$phone;
        window.fbq('track', 'Lead', cleanData, { eventID });
    }
    sendToCAPI('Lead', data, eventID);
};

export const trackContact = (data = {}) => {
    const eventID = generateEventId('contact');
    if (isFbqReady()) {
        const cleanData = { ...data };
        delete cleanData.$email; delete cleanData.$phone;
        window.fbq('track', 'Contact', cleanData, { eventID });
    }
    sendToCAPI('Contact', data, eventID);
};

export const trackSchedule = (data = {}) => {
    const eventID = generateEventId('schedule');
    if (isFbqReady()) {
        const cleanData = { ...data };
        delete cleanData.$email; delete cleanData.$phone;
        window.fbq('track', 'Schedule', cleanData, { eventID });
    }
    sendToCAPI('Schedule', data, eventID);
};

export const trackViewContent = (data = {}) => {
    const eventID = generateEventId('vc');
    if (isFbqReady()) {
        const cleanData = { ...data };
        delete cleanData.$email; delete cleanData.$phone;
        window.fbq('track', 'ViewContent', cleanData, { eventID });
    }
    sendToCAPI('ViewContent', data, eventID);
};
