import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import buildTree from './tree.js';
import render from './formatters/index.js';

const getFileExtension = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const type1 = getFileExtension(filepath1);
  const type2 = getFileExtension(filepath2);
  const oldObject = parse(file1, type1);
  const newObject = parse(file2, type2);
  const tree = buildTree(oldObject, newObject);
  return render(tree, format);
};

export default gendiff;
