import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getObjectFromFileJson = (filepath) => {
  const json = fs.readFileSync(filepath, (err, data) => {
    if (err) throw err;
    console.log(data);
    return undefined;
  });
  return JSON.parse(json);
};

const gendiff = (filepath1, filepath2) => {
  const oldObject = getObjectFromFileJson(path.resolve(filepath1));
  const newObject = getObjectFromFileJson(path.resolve(filepath2));
  if (_.isEqual(oldObject, newObject)) { return oldObject; }
  const lines = [];
  const keysProcessed = [];
  _.forOwn(oldObject, (valueOld, key) => {
    const valueNew = _.get(newObject, key);
    if (valueOld === valueNew) {
      lines.push({ propertyName: key, value: valueOld, change: 'no' });
    } else if (valueNew === undefined) {
      lines.push({ propertyName: key, value: valueOld, change: 'remove' });
    } else {
      lines.push({ propertyName: key, value: valueOld, change: 'remove' });
      lines.push({ propertyName: key, value: valueNew, change: 'add' });
    }
    keysProcessed.push(key);
  });
  _.forOwn(newObject, (value, key) => {
    if (!keysProcessed.includes(key)) {
      lines.push({ propertyName: key, value, change: 'add' });
    }
  });
  const result = _.sortBy(lines, ['propertyName']).map((line) => {
    if (line.change === 'no') {
      return (`    ${line.propertyName}: ${line.value}`);
    } if (line.change === 'remove') {
      return (`  - ${line.propertyName}: ${line.value}`);
    }
    return (`  + ${line.propertyName}: ${line.value}`);
  });
  result.splice(0, 0, '{');
  result.push('}');
  // const changes = (object, base) => _.transform(object, (result, value, key) => {
  // if (!_.isEqual(value, base[key])) {
  // result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
  // }
  // });
  return result.join('\n');
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
