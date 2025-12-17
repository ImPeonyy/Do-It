export function countWords(text: string): number {
    if (!text) return 0;

    return text.trim().split(/\s+/).filter(Boolean).length;
}

export function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomBuffer = new Uint32Array(1);
        crypto.getRandomValues(randomBuffer);
        const j = randomBuffer[0] % (i + 1);

        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

export function formatDateToDDMMYYYY(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
}