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

const stylish = (tree) => {
  const represent = (obj, depth = 1) => obj.flatMap(({
    propertyName, children, oldValue, newValue, type,
  }) => {
    switch (type) {
      case 'added':
        return `${indent(depth - 1)}  + ${propertyName}: ${stringify(newValue, depth)}`;
      case 'removed':
        return `${indent(depth - 1)}  - ${propertyName}: ${stringify(oldValue, depth)}`;
      case 'unchanged':
        return `${indent(depth - 1)}    ${propertyName}: ${stringify(oldValue, depth)}`;
      case 'updated':
        return [
          `${indent(depth - 1)}  - ${propertyName}: ${stringify(oldValue, depth)}`,
          `${indent(depth - 1)}  + ${propertyName}: ${stringify(newValue, depth)}`,
        ];
      case 'nested':
        return [`${indent(depth)}${propertyName}: {`,
          ...represent(children, depth + 1),
          `${indent(depth)}}`];
      default:
        throw new Error(`Unknown node type ${type}`);
    }
  });

  const result = represent(tree);
  return ['{', ...result, '}'].join('\n');
};

export default stylish;
