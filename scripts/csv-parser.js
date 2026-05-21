export function parseCsvLine(line) {
    const parts = [];
    let currentWord = '';
    let inQuotes = false;
    for (let char of line) {
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
            parts.push(currentWord);
            currentWord = '';
        } else {
            currentWord += char;
        }
    }
    parts.push(currentWord);
    return parts;
}
