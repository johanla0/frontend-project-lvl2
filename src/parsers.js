import yaml from 'js-yaml';

const mapping = {
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
  json: JSON.parse,
};

const parse = (type, data) => mapping[type](data);

export { parse as default };
