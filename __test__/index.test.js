import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishResult = readFile('stylish_expected').trim();
const plainResult = readFile('plain_expected').trim();
const jsonResult = readFile('json_expected').trim();

test.each(['yml', 'json'])('gendiff %s', (extension) => {
  const file1 = getFixturePath(`nested_file1.${extension}`);
  const file2 = getFixturePath(`nested_file2.${extension}`);
  expect(gendiff(file1, file2)).toEqual(stylishResult);
  expect(gendiff(file1, file2, 'stylish')).toEqual(stylishResult);
  expect(gendiff(file1, file2, 'plain')).toEqual(plainResult);
  expect(gendiff(file1, file2, 'json')).toEqual(jsonResult);
});

test('json is correct', () => {
  const file1 = getFixturePath('nested_file1.json');
  const file2 = getFixturePath('nested_file2.json');
  const data = gendiff(file1, file2, 'json');
  expect(() => JSON.parse(data)).not.toThrow();
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
