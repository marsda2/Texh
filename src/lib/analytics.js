import { trackLead, trackContact, trackSchedule } from './metaPixel';

export const sendGAEvent = (eventName, eventParams) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, eventParams);
    }
};

export const trackLeadEvent = (source, value = 100, email = null, phone = null) => {
    sendGAEvent('generate_lead', {
        currency: 'USD',
        value: value,
        lead_source: source
    });

    const metaData = { value, currency: 'USD', content_name: source };
    if (email) metaData.$email = email;
    if (phone) metaData.$phone = phone;
    trackLead(metaData);
};

export const trackContactEvent = (source, email = null, phone = null) => {
    sendGAEvent('contact', { lead_source: source });
    const metaData = { content_name: source };
    if (email) metaData.$email = email;
    if (phone) metaData.$phone = phone;
    trackContact(metaData);
};

export const trackScheduleEvent = (source, email = null, phone = null) => {
    sendGAEvent('schedule', { lead_source: source });
    const metaData = { content_name: source };
    if (email) metaData.$email = email;
    if (phone) metaData.$phone = phone;
    trackSchedule(metaData);
};
