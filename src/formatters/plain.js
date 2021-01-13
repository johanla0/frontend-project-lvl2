import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) { return '[complex value]'; }
  if (_.isString(value)) { return `'${value}'`; }
  return value;
};

const formatName = (acc) => (acc === '' ? '' : `${acc}.`);

const plain = (tree) => {
  const represent = (obj, acc = '') => obj.flatMap(({
    propertyName, children, oldValue, newValue, type,
  }) => {
    switch (type) {
      case 'added':
        return `Property '${formatName(acc)}${propertyName}' was added with value: ${formatValue(newValue)}`;
      case 'removed':
        return `Property '${formatName(acc)}${propertyName}' was removed`;
      case 'unchanged':
        return null;
      case 'updated':
        return `Property '${formatName(acc)}${propertyName}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
      case 'nested':
        return represent(children, `${formatName(acc)}${propertyName}`);
      default:
        throw new Error(`Unknown node type ${type}`);
    }
  });
  return represent(tree).filter((elem) => elem !== null).join('\n');
};

export default plain;
