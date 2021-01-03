import stylish from './formatters.js';

const styles = {
  stylish,
};

const output = (compared, style) => styles[style](compared);

export default output;
