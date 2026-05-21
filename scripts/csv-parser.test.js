import test from 'node:test';
import assert from 'node:assert';
import { parseCsvLine } from './csv-parser.js';

test('parseCsvLine', async (t) => {
    await t.test('parses simple comma-separated values', () => {
        const result = parseCsvLine('one,two,three');
        assert.deepStrictEqual(result, ['one', 'two', 'three']);
    });

    await t.test('ignores commas inside quotes', () => {
        const result = parseCsvLine('one,"two,with,commas",three');
        assert.deepStrictEqual(result, ['one', 'two,with,commas', 'three']);
    });

    await t.test('handles empty values between commas', () => {
        const result = parseCsvLine('one,,three');
        assert.deepStrictEqual(result, ['one', '', 'three']);
    });

    await t.test('handles empty trailing values', () => {
        const result = parseCsvLine('one,two,');
        assert.deepStrictEqual(result, ['one', 'two', '']);
    });

    await t.test('handles empty leading values', () => {
        const result = parseCsvLine(',two,three');
        assert.deepStrictEqual(result, ['', 'two', 'three']);
    });

    await t.test('handles single quoted values', () => {
        const result = parseCsvLine('"only"');
        assert.deepStrictEqual(result, ['only']);
    });

    await t.test('handles empty string', () => {
        const result = parseCsvLine('');
        assert.deepStrictEqual(result, ['']);
    });

    await t.test('strips quotes from output', () => {
        const result = parseCsvLine('foo,"bar"');
        assert.deepStrictEqual(result, ['foo', 'bar']);
    });
});
