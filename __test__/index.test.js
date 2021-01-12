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
])('%s files format as %s', (extension, format) => {
  const file1 = getFixturePath(`nested_file1.${extension}`);
  const file2 = getFixturePath(`nested_file2.${extension}`);
  const stylishData = readFile('stylish_expected');
  const expected = stylishData.trim();
  expect(gendiff(file1, file2, format)).toEqual(expected);
});

test.each([
  ['json', 'plain'],
  ['yml', 'plain'],
])('%s files format as %s', (extension, format) => {
  const file1 = getFixturePath(`nested_file1.${extension}`);
  const file2 = getFixturePath(`nested_file2.${extension}`);
  const plainData = readFile('plain_expected');
  const expected = plainData.trim();
  expect(gendiff(file1, file2, format)).toEqual(expected);
});

test.each([
  ['json', 'json'],
  ['yml', 'json'],
])('%s files format as %s', (extension, format) => {
  const file1 = getFixturePath(`nested_file1.${extension}`);
  const file2 = getFixturePath(`nested_file2.${extension}`);
  const jsonData = readFile('json_expected');
  const expected = jsonData.trim();
  expect(gendiff(file1, file2, format)).toEqual(expected);
});

test('parse throws extension error', () => {
  const file1 = getFixturePath('nested_file1.yml');
  expect(() => {
    parse(file1, 'unsupported_extension');
  }).toThrow();
});

test('render throws format error', () => {
  expect(() => {
    render('imagine_this_is_tree', 'unsupported_format');
  }).toThrow();
});
