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
    const err = new Error();
    err.message = `Format ${format} is not supported`;
    err.number = 1;
    throw err;
  }
  return styles[format](compared);
};

export default render;
