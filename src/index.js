import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import compare from './compare.js';
import output from './output.js';

const gendiff = (filepath1, filepath2) => {
  const file1 = fs.readFileSync(path.resolve(filepath1), (err, data) => {
    if (err) throw err;
    console.log(data);
    return undefined;
  });
  const file2 = fs.readFileSync(path.resolve(filepath2), (err, data) => {
    if (err) throw err;
    console.log(data);
    return undefined;
  });
  const type1 = path.extname(filepath1);
  const type2 = path.extname(filepath2);
  const oldObject = parse(type1.slice(1), file1);
  const newObject = parse(type2.slice(1), file2);

  const result = compare(oldObject, newObject);
  // console.log(JSON.stringify(result, '', 2));
  return output(result);
  // const changes = (object, base) => _.transform(object, (result, value, key) => {
  // if (!_.isEqual(value, base[key])) {
  // result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
  // }
  // });
};

const run = () => {
  const program = new Command();
  program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      // console.log(`Current directory: ${process.cwd()}`);
      const whatsnew = gendiff(filepath1, filepath2);
      console.info(whatsnew);
      return whatsnew;
    });
  // program.option('-d, --debug', 'output extra debugging');
  // if (program.debug) console.log(program.opts());
  program.parse(process.argv);
};

export { run as default, gendiff };
