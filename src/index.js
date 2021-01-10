import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import getTree from './tree.js';
import render from './formatters/index.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = fs.readFileSync(path.resolve(filepath1), 'utf-8');
  const file2 = fs.readFileSync(path.resolve(filepath2), 'utf-8');
  const type1 = path.extname(filepath1);
  const type2 = path.extname(filepath2);
  const oldObject = parse(type1.slice(1), file1);
  const newObject = parse(type2.slice(1), file2);
  const tree = getTree(oldObject, newObject);
  return render(tree, format);
};

export default gendiff;
