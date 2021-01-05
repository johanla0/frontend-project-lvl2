import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

const styles = {
  stylish,
  plain,
};

const output = (compared, format) => styles[format](compared);

export default output;
