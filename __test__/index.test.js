import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';

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
  const file1 = getFixturePath('unsupported_file.xml');
  const file2 = getFixturePath('nested_file2.json');
  expect(() => {
    gendiff(file1, file2);
  }).toThrowError('not supported');
});

test('render throws unsupported error', () => {
  const file1 = getFixturePath('nested_file1.json');
  const file2 = getFixturePath('nested_file2.json');
  expect(() => {
    gendiff(file1, file2, 'and_unsupported_format');
  }).toThrowError('not supported');
});
