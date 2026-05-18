import crypto from 'crypto';

const hashData = (data) => {
    if (!data) return undefined;
    // Meta requires SHA256 hashed, lowercase, trimmed strings
    return crypto.createHash('sha256').update(String(data).trim().toLowerCase()).digest('hex');
};

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const PIXEL_ID = process.env.VITE_META_PIXEL_ID || process.env.META_PIXEL_ID;
    const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
    const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE; // e.g., TEST53332

    if (!PIXEL_ID || !ACCESS_TOKEN) {
        console.error('Missing Meta configuration');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const { eventName, eventId, eventSourceUrl, email, phone, customData, fbc, fbp } = req.body;

        const userData = {
            client_user_agent: req.headers['user-agent'],
            // Vercel populates x-forwarded-for
            client_ip_address: req.headers['x-forwarded-for'] || '127.0.0.1',
        };

        if (fbc) userData.fbc = fbc;
        if (fbp) userData.fbp = fbp;

        // Hash Personally Identifiable Information (PII) before sending to Meta
        if (email) userData.em = [hashData(email)];
        if (phone) {
            // Remove non-numeric characters for phone normalization
            const normalizedPhone = phone.replace(/[^\d]/g, '');
            if (normalizedPhone) userData.ph = [hashData(normalizedPhone)];
        }

        const payload = {
            data: [
                {
                    event_name: eventName,
                    event_time: Math.floor(Date.now() / 1000),
                    action_source: 'website',
                    event_id: eventId,
                    event_source_url: eventSourceUrl,
                    user_data: userData,
                    custom_data: customData || {}
                }
            ]
        };

        if (TEST_EVENT_CODE) {
            payload.test_event_code = TEST_EVENT_CODE;
        }

        const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Meta CAPI Error:', data);
            return res.status(response.status).json(data);
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Internal Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
