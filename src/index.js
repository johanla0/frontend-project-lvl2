import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
// import process from 'process';

const getObjectFromJson = (filepath) => {
  const json = fs.readFileSync(filepath, (err, data) => {
    if (err) throw err;
    console.log(data);
    return undefined;
  });
  const obj = JSON.parse(json);
  return obj;
};

const difference = (oldObject, newObject) => {
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
  _.forOwn(newObject, (valueNew, key) => {
    if (!keysProcessed.includes(key)) {
      lines.push({ propertyName: key, value: valueNew, change: 'add' });
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
  return result.join('\r\n');
};

export default () => {
  const program = new Command();
  program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      // console.log(`Current directory: ${process.cwd()}`);
      const jsonObject1 = getObjectFromJson(path.resolve(filepath1));
      const jsonObject2 = getObjectFromJson(path.resolve(filepath2));
      const whatsnew = difference(jsonObject1, jsonObject2);
      console.info(whatsnew);
      return whatsnew;
    });
  program.parse(process.argv);

  // program.option('-d, --debug', 'output extra debugging')
  // if (program.debug) console.log(program.opts());
};
