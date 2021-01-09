import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedData = {};

// eslint-disable-next-line no-undef
beforeAll(() => {
  const stylishData = readFile('stylish_expected');
  const plainData = readFile('plain_expected');
  const jsonData = readFile('json_expected');
  expectedData.stylish = stylishData.trim();
  expectedData.plain = plainData.trim();
  expectedData.json = jsonData.trim();
});

test('json format stylish', () => {
  const file1 = getFixturePath('nested_file1.json');
  const file2 = getFixturePath('nested_file2.json');
  const expected = expectedData.stylish;
  const actual = gendiff(file1, file2);
  expect(actual).toEqual(expected, 'stylish');
});

test('yaml format stylish', () => {
  const file1 = getFixturePath('nested_file1.yml');
  const file2 = getFixturePath('nested_file2.yml');
  const expected = expectedData.stylish;
  const actual = gendiff(file1, file2);
  expect(actual).toEqual(expected, 'stylish');
});

test('json format plain', () => {
  const file1 = getFixturePath('nested_file1.json');
  const file2 = getFixturePath('nested_file2.json');
  const expected = expectedData.plain;
  const actual = gendiff(file1, file2, 'plain');
  expect(actual).toEqual(expected);
});

test('yaml format plain', () => {
  const file1 = getFixturePath('nested_file1.yml');
  const file2 = getFixturePath('nested_file2.yml');
  const expected = expectedData.plain;
  const actual = gendiff(file1, file2, 'plain');
  expect(actual).toEqual(expected);
});

test('json format json', () => {
  const file1 = getFixturePath('nested_file1.json');
  const file2 = getFixturePath('nested_file2.json');
  const expected = expectedData.json;
  const actual = gendiff(file1, file2, 'json');
  expect(actual).toEqual(expected);
});

test('yaml format json', () => {
  const file1 = getFixturePath('nested_file1.yml');
  const file2 = getFixturePath('nested_file2.yml');
  const expected = expectedData.json;
  const actual = gendiff(file1, file2, 'json');
  expect(actual).toEqual(expected);
});
