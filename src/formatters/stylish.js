import _ from 'lodash';

const numOfSpaces = 4;
const types = {
  added: '+',
  removed: '-',
  nested: ' ',
  unchanged: ' ',
};

const indent = (depth) => ' '.repeat(depth * numOfSpaces);

const stringify = (record, depth) => {
  if (!_.isPlainObject(record)) {
    return record;
  }
  const inner = JSON.stringify(record, '', indent(depth))
    .replace(/"([^"]+)":/g, '    $1:')
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
        return `${indent(depth - 1)}  ${types.added} ${propertyName}: ${stringify(
          value2,
          depth,
        )}`;
      case 'removed':
        return `${indent(depth - 1)}  ${
          types.removed
        } ${propertyName}: ${stringify(value1, depth)}`;
      case 'unchanged':
        return `${indent(depth - 1)}  ${
          types.unchanged
        } ${propertyName}: ${stringify(value1, depth)}`;
      case 'changed':
        return [
          `${indent(depth - 1)}  ${types.removed} ${propertyName}: ${stringify(
            value1,
            depth,
          )}`,
          `${indent(depth - 1)}  ${types.added} ${propertyName}: ${stringify(
            value2,
            depth,
          )}`,
        ];
      case 'nested':
        return [
          `${indent(depth - 1)}  ${types.nested} ${propertyName}: {`,
          ...build(children, depth + 1),
          `${indent(depth - 1)}    }`,
        ];
      default:
        return undefined;
    }
  });

  const result = build(compared);
  return [
    '{',
    ...result,
    '}',
  ].join('\n');
};

export { stylish as default };
