export function parseCsvLine(line) {
    const parts = [];
    let start = 0;
    let inQuotes = false;
    let currentWord = '';

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            currentWord += line.substring(start, i);
            inQuotes = !inQuotes;
            start = i + 1;
        } else if (char === ',' && !inQuotes) {
            currentWord += line.substring(start, i);
            parts.push(currentWord);
            currentWord = '';
            start = i + 1;
        }
    }

    currentWord += line.substring(start);
    parts.push(currentWord);
    return parts;
}
