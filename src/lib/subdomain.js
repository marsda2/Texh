/**
 * Subdomains that are NOT client sites. `app` is this platform (portal,
 * generator, contact cards); the marketing site lives on the bare domain.
 * Keep it in sync with the domains configured in Vercel.
 */
export const RESERVED_SUBDOMAINS = new Set([
    'www', 'app', 'api', 'admin', 'portal', 'dashboard', 'mail', 'email',
    'dev', 'staging', 'test', 'static', 'assets', 'cdn', 'status', 'docs', 'blog',
]);

/** True on app.texhco.com (and app.localhost in development). */
export function isPlatformHost() {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname;
    return host === 'app.texhco.com' || host === 'app.localhost';
}

/**
 * Utility to extract and normalize the subdomain for dynamic client routing.
 * Works seamlessly in both local development (localhost) and production (texhco.com).
 */
export function getSubdomain() {
    if (typeof window === 'undefined') return null;

    const hostname = window.location.hostname;
    const rootDomain = 'texhco.com';

    // 1. Localhost testing (e.g. "sofia.localhost", "barberia.localhost:5173")
    if (hostname.includes('localhost')) {
        const parts = hostname.split('.');
        if (parts.length > 1 && parts[0] !== 'localhost' && !RESERVED_SUBDOMAINS.has(parts[0].toLowerCase())) {
            return parts[0].toLowerCase().trim();
        }
        return null;
    }

    // 2. Production wildcard subdomains (e.g. "sofia.texhco.com")
    if (hostname.endsWith(rootDomain)) {
        const subdomain = hostname.replace(`.${rootDomain}`, '').trim();
        if (subdomain && subdomain !== rootDomain && !RESERVED_SUBDOMAINS.has(subdomain.toLowerCase())) {
            return subdomain.toLowerCase();
        }
    }

    return null;
}
