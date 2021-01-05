import yaml from 'js-yaml';

const types = {
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
  json: JSON.parse,
};

const parse = (type, data) => types[type](data);

export { parse as default };
