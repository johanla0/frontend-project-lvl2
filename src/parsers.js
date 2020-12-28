import yaml from 'js-yaml';

const getObjectFromFileJson = (data, format) => {
  if (format === '.yml' || format === '.yaml') {
    return yaml.safeLoad(data);
  }
  return JSON.parse(data);
};

export { getObjectFromFileJson as default };
