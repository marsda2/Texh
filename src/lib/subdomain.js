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
        if (parts.length > 1 && parts[0] !== 'localhost' && parts[0] !== 'www') {
            return parts[0].toLowerCase().trim();
        }
        return null;
    }

    // 2. Production wildcard subdomains (e.g. "sofia.texhco.com")
    if (hostname.endsWith(rootDomain)) {
        const subdomain = hostname.replace(`.${rootDomain}`, '').trim();
        if (subdomain && subdomain !== 'www' && subdomain !== rootDomain) {
            return subdomain.toLowerCase();
        }
    }

    return null;
}
