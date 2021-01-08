import _ from 'lodash';

const numOfSpaces = 4;

const indent = (depth) => ' '.repeat(depth * numOfSpaces);

const stringify = (record, depth) => {
  if (!_.isPlainObject(record)) {
    return record;
  }
  const inner = JSON.stringify(record, '', indent(depth))
    .replace(/"([^"]+)":/g, `${indent(1)}$1:`)
    .replace(/: "([^"]+)"/g, ': $1')
    .replace(',', '')
    .replace(/}/g, `${indent(depth)}}`);
  return inner;
};

const stylish = (compared) => {
  const build = (obj, depth = 1) => obj.flatMap(({
    propertyName, children, value1, value2, type,
  }) => {
    switch (type) {
      case 'added':
        return `${indent(depth - 1)}  + ${propertyName}: ${stringify(value2, depth)}`;
      case 'removed':
        return `${indent(depth - 1)}  - ${propertyName}: ${stringify(value1, depth)}`;
      case 'unchanged':
        return `${indent(depth - 1)}    ${propertyName}: ${stringify(value1, depth)}`;
      case 'updated':
        return [
          `${indent(depth - 1)}  - ${propertyName}: ${stringify(value1, depth)}`,
          `${indent(depth - 1)}  + ${propertyName}: ${stringify(value2, depth)}`,
        ];
      case 'nested':
        return [`${indent(depth)}${propertyName}: {`,
          ...build(children, depth + 1),
          `${indent(depth)}}`];
      default:
        return undefined;
    }
  });

  const result = build(compared);
  return ['{', ...result, '}'].join('\n');
};

export { stylish as default };
