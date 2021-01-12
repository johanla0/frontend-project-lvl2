import _ from 'lodash';
import yaml from 'js-yaml';

const types = {
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
  json: JSON.parse,
};

const parse = (data, type) => {
  if (!_.has(types, type)) {
    throw new Error(
      `File ${type === '' ? 'without extension' : type} is not supported`,
    );
  }
  return types[type](data);
};

export default parse;
