import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import { gendiff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedData = { nested: [], plain: [] };

// eslint-disable-next-line no-undef
beforeAll(() => {
  const plainData = readFile('flat_expected');
  const nestedData = readFile('nested_expected');
  expectedData.plain = plainData.trim();
  expectedData.nested = nestedData.trim();
});

test('gendiff with flat json', () => {
  const file1 = getFixturePath('flat_file1.json');
  const file2 = getFixturePath('flat_file2.json');
  const expected = expectedData.plain;
  const actual = gendiff(file1, file2);
  expect(actual).toEqual(expected);
});

test('gendiff with flat yaml', () => {
  const file1 = getFixturePath('flat_file1.yml');
  const file2 = getFixturePath('flat_file2.yml');
  const expected = expectedData.plain;
  const actual = gendiff(file1, file2);
  expect(actual).toEqual(expected);
});

test('gendiff with nested json', () => {
  const file1 = getFixturePath('nested_file1.json');
  const file2 = getFixturePath('nested_file2.json');
  const expected = expectedData.nested;
  const actual = gendiff(file1, file2);
  expect(actual).toEqual(expected);
});

// test('gendiff with nested yaml', () => {
//   const file1 = getFixturePath('nested_file1.yml');
//   const file2 = getFixturePath('nested_file2.yml');
//   const expected = expectedData.nested;
//   const actual = gendiff(file1, file2);
//   expect(actual).toEqual(expected);
// });
