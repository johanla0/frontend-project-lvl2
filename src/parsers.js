import yaml from 'js-yaml';

const types = {
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
  json: JSON.parse,
};

const parse = (type, data) => {
  if (types[type] === undefined) {
    throw new Error(
      `File ${type === '' ? 'without extension' : type} is not supported`,
    );
  }
  return types[type](data);
};

export { parse as default };
