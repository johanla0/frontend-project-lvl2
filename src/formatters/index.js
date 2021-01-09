import stylish from './stylish.js';
import plain from './plain.js';

const styles = {
  stylish,
  plain,
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
