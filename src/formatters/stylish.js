import _ from 'lodash';

const numOfSpaces = 4;

const types = {
  added: '  + ',
  removed: '  - ',
  unchanged: '    ',
  nested: '    ',
};

const indent = (depth) => ' '.repeat(depth * numOfSpaces);

const stringify = (record, depth) => {
  if (!_.isObject(record)) {
    return record;
  }
  const entries = Object.entries(record).flatMap(
    ([key, value]) => `${indent(depth + 1)}${key}: ${stringify(value, depth + 1)}`,
  );
  return ['{', ...entries, `${indent(depth)}}`].join('\n');
};

const formatProperty = (depth, type, propertyName) => `${indent(depth - 1)}${types[type]}${propertyName}`;

const stylish = (tree) => {
  const represent = (obj, depth = 1) => obj.flatMap(({
    propertyName, children, oldValue, newValue, type,
  }) => {
    switch (type) {
      case 'added':
        return `${formatProperty(depth, type, propertyName)}: ${stringify(
          newValue,
          depth,
        )}`;
      case 'removed':
      case 'unchanged':
        return `${formatProperty(depth, type, propertyName)}: ${stringify(
          oldValue,
          depth,
        )}`;
      case 'updated':
        return [
          `${formatProperty(depth, 'removed', propertyName)}: ${stringify(
            oldValue,
            depth,
          )}`,
          `${formatProperty(depth, 'added', propertyName)}: ${stringify(
            newValue,
            depth,
          )}`,
        ];
      case 'nested':
        return [
          `${formatProperty(depth, type, propertyName)}: {`,
          ...represent(children, depth + 1),
          `${indent(depth)}}`,
        ];
      default:
        throw new Error(`Unknown node type ${type}`);
    }
  });

  const result = represent(tree);
  return ['{', ...result, '}'].join('\n');
};

export default stylish;
