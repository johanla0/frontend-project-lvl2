import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const styles = {
  stylish,
  plain,
  json,
};

const render = (tree, format) => {
  if (!_.has(styles, format)) {
    throw new Error(`Format ${format} is not supported`);
  }
  return styles[format](tree);
};

export default render;
