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

const stylishData = readFile('stylish_expected');
const plainData = readFile('plain_expected');
const jsonData = readFile('json_expected');
const expectedStylish = stylishData.trim();
const expectedPlain = plainData.trim();
const expectedJson = jsonData.trim();

test('json format stylish', () => {
  const file1 = getFixturePath('nested_file1.json');
  const file2 = getFixturePath('nested_file2.json');
  const expected = expectedStylish;
  const actual = gendiff(file1, file2);
  expect(actual).toEqual(expected, 'stylish');
});

test('yaml format stylish', () => {
  const file1 = getFixturePath('nested_file1.yml');
  const file2 = getFixturePath('nested_file2.yml');
  const expected = expectedStylish;
  const actual = gendiff(file1, file2);
  expect(actual).toEqual(expected, 'stylish');
});

test('json format plain', () => {
  const file1 = getFixturePath('nested_file1.json');
  const file2 = getFixturePath('nested_file2.json');
  const expected = expectedPlain;
  const actual = gendiff(file1, file2, 'plain');
  expect(actual).toEqual(expected);
});

test('yaml format plain', () => {
  const file1 = getFixturePath('nested_file1.yml');
  const file2 = getFixturePath('nested_file2.yml');
  const expected = expectedPlain;
  const actual = gendiff(file1, file2, 'plain');
  expect(actual).toEqual(expected);
});

test('json format json', () => {
  const file1 = getFixturePath('nested_file1.json');
  const file2 = getFixturePath('nested_file2.json');
  const expected = expectedJson;
  const actual = gendiff(file1, file2, 'json');
  expect(actual).toEqual(expected);
});

test('yaml format json', () => {
  const file1 = getFixturePath('nested_file1.yml');
  const file2 = getFixturePath('nested_file2.yml');
  const expected = expectedJson;
  const actual = gendiff(file1, file2, 'json');
  expect(actual).toEqual(expected);
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
