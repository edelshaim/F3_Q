import fs from 'fs';
import path from 'path';

const csvPath = path.resolve('./f3-codex-export.csv');
const outPath = path.resolve('./src/data/exercises.json');

const content = fs.readFileSync(csvPath, 'utf8');
const lines = content.split('\n');
const headers = lines[0].split(',');

const exercises = [];
for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Custom split ignoring commas inside quotes
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

    if (parts.length >= 3) {
        const rawName = parts[1].trim();
        const name = rawName.replace(/^["']|["']$/g, '');
        const rawDesc = parts[2].trim();
        let description = rawDesc.replace(/^["']|["']$/g, '').replace(/<[^>]*>?/gm, '').trim(); // strip html and quotes

        if (name && description) {
            exercises.push({ name, description });
        }
    }
}

// Ensure src/data exists
const dataDir = path.dirname(outPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(outPath, JSON.stringify(exercises, null, 2));
console.log(`Parsed ${exercises.length} exercises to ${outPath}`);
