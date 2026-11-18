export function normalizeName(rawName: string): string {
    return rawName.trim();
}

export function isBlank(normalizedValue: string): boolean {
    return normalizedValue === "";
}

export function normalizeEmail(rawEmail: string): string {
    return rawEmail.trim().toLowerCase();
}

export function isValidEmail(normalizedEmail: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
}
