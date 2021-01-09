import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const styles = {
  stylish,
  plain,
  json,
};

const render = (compared, format) => {
  if (styles[format] === undefined) {
    throw new Error(`Format ${format} is not supported`);
  }
  return styles[format](compared);
};

export default render;
