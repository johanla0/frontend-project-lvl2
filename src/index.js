import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import compare from './compare.js';
import render from './formatters/index.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = fs.readFileSync(
    path.resolve(filepath1),
    'ascii',
    (err, data) => {
      if (err) throw err;
      console.log(data);
      return undefined;
    },
  );
  const file2 = fs.readFileSync(
    path.resolve(filepath2),
    'ascii',
    (err, data) => {
      if (err) throw err;
      console.log(data);
      return undefined;
    },
  );
  const type1 = path.extname(filepath1);
  const type2 = path.extname(filepath2);
  const oldObject = parse(type1.slice(1), file1);
  const newObject = parse(type2.slice(1), file2);
  const compared = compare(oldObject, newObject);
  return render(compared, format);
};

export default gendiff;
