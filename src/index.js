import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import parse from './parsers.js';
import buildTree from './tree.js';
import render from './formatters/index.js';

const getMimeType = (filepath) => mime.lookup(filepath);
const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');
const getData = (filepath) => parse(readFile(filepath), getMimeType(filepath));

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const oldObject = getData(filepath1);
  const newObject = getData(filepath2);
  const tree = buildTree(oldObject, newObject);
  return render(tree, format);
};

export default gendiff;
