import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';
import parse from '../src/parsers.js';
import render from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['json', 'stylish'],
  ['yml', 'stylish'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['json', 'json'],
  ['yml', 'json'],
])('%s files format as %s', (extension, format) => {
  const file1 = getFixturePath(`nested_file1.${extension}`);
  const file2 = getFixturePath(`nested_file2.${extension}`);
  const data = readFile(`${format}_expected`);
  const expected = data.trim();
  expect(gendiff(file1, file2, format)).toEqual(expected);
});

test('parse throws unsupported error', () => {
  expect(() => {
    parse('imagine_a_stream_of_bytes', 'with_unsupported_mime_type');
  }).toThrowError('not supported');
});

test('render throws unsupported error', () => {
  expect(() => {
    render('imagine_a_tree', 'and_unsupported_format');
  }).toThrowError('not supported');
});
