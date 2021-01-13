import _ from 'lodash';
import yaml from 'js-yaml';

const types = {
  'text/yaml': yaml.safeLoad,
  'application/json': JSON.parse,
};

const parse = (data, type) => {
  if (!_.has(types, type)) {
    throw new Error(
      `File ${type} is not supported`,
    );
  }
  return types[type](data);
};

export default parse;
