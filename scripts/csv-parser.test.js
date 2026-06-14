import { describe, expect, it } from 'vitest';
import { parseCsvLine } from './csv-parser.js';

describe('parseCsvLine', () => {
    it('parses simple comma-separated values', () => {
        const result = parseCsvLine('one,two,three');
        expect(result).toEqual(['one', 'two', 'three']);
    });

    it('ignores commas inside quotes', () => {
        const result = parseCsvLine('one,"two,with,commas",three');
        expect(result).toEqual(['one', 'two,with,commas', 'three']);
    });

    it('handles empty values between commas', () => {
        const result = parseCsvLine('one,,three');
        expect(result).toEqual(['one', '', 'three']);
    });

    it('handles empty trailing values', () => {
        const result = parseCsvLine('one,two,');
        expect(result).toEqual(['one', 'two', '']);
    });

    it('handles empty leading values', () => {
        const result = parseCsvLine(',two,three');
        expect(result).toEqual(['', 'two', 'three']);
    });

    it('handles single quoted values', () => {
        const result = parseCsvLine('"only"');
        expect(result).toEqual(['only']);
    });

    it('handles empty string', () => {
        const result = parseCsvLine('');
        expect(result).toEqual(['']);
    });

    it('strips quotes from output', () => {
        const result = parseCsvLine('foo,"bar"');
        expect(result).toEqual(['foo', 'bar']);
    });
});
