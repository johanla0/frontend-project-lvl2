import _ from 'lodash';

const numOfSpaces = 4;
const types = {
  added: '+',
  removed: '-',
  nested: ' ',
  unchanged: ' ',
};

const stringify = (record, depth) => {
  if (!_.isPlainObject(record)) {
    return record;
  }
  const indent = depth * numOfSpaces;
  const inner = JSON.stringify(record, '', indent)
    .replace(/"([^"]+)":/g, '    $1:')
    .replace(/: "([^"]+)"/g, ': $1')
    .replace(',', '')
    .replace(/}/g, `${' '.repeat(indent)}}`);
  return inner;
};

const stylish = (compared) => {
  const build = (obj, depth = 1) => obj.flatMap(({
    propertyName, children, value1, value2, type,
  }) => {
    const indentation = ' '.repeat(depth * numOfSpaces - 4);
    switch (type) {
      case 'added':
        return `${indentation}  ${types.added} ${propertyName}: ${stringify(
          value2,
          depth,
        )}`;
      case 'removed':
        return `${indentation}  ${types.removed} ${propertyName}: ${stringify(
          value1,
          depth,
        )}`;
      case 'unchanged':
        return `${indentation}  ${types.unchanged} ${propertyName}: ${stringify(
          value1,
          depth,
        )}`;
      case 'changed':
        return [
          `${indentation}  ${types.removed} ${propertyName}: ${stringify(
            value1,
            depth,
          )}`,
          `${indentation}  ${types.added} ${propertyName}: ${stringify(
            value2,
            depth,
          )}`,
        ];
      case 'nested':
        return [
          `${indentation}  ${types.nested} ${propertyName}: {`,
          ...build(children, depth + 1),
          `${indentation}    }`,
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
