export function getLinesOfCodes(): number {
    const startDate = new Date(2019, 6, 1); // July is month 6 (0-indexed)
    const now = new Date();
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    const weeks = Math.floor((now.getTime() - startDate.getTime()) / msPerWeek);
    return weeks * 10000;
}

export function getDrankedCoffee(): number {
    const startDate = new Date(2019, 6, 1); // July is month 6 (0-indexed)
    const now = new Date();
    const msPerDay = 24 * 60 * 60 * 1000;
    const days = Math.floor((now.getTime() - startDate.getTime()) / msPerDay);
    return days * 2;
}