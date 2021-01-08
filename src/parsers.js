import yaml from 'js-yaml';

const types = {
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
  json: JSON.parse,
};

const parse = (type, data) => {
  if (types[type] === undefined) {
    const err = new Error();
    err.message = `Unsupported file ${type === '' ? 'without extension' : type}`;
    err.number = 2;
    throw err;
  }
  return types[type](data);
};

export { parse as default };
