import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) { return '[complex value]'; }
  if (_.isString(value)) { return `'${value}'`; }
  return value;
};

const getAcc = (acc) => (acc === '' ? '' : `${acc}.`);

const plain = (tree) => {
  const represent = (obj, acc = '') => obj.flatMap(({
    propertyName, children, oldValue, newValue, type,
  }) => {
    switch (type) {
      case 'added':
        return [
          `Property '${getAcc(
            acc,
          )}${propertyName}' was added with value: ${getValue(newValue)}`,
        ];
      case 'removed':
        return [`Property '${getAcc(acc)}${propertyName}' was removed`];
      case 'unchanged':
        return '';
      case 'updated':
        return [
          `Property '${getAcc(
            acc,
          )}${propertyName}' was updated. From ${getValue(
            oldValue,
          )} to ${getValue(newValue)}`,
        ];
      case 'nested':
        return [...represent(children, `${getAcc(acc)}${propertyName}`)];
      default:
        throw new Error(`Unknown node type ${type}`);
    }
  });
  const result = represent(tree);
  return [...result].filter((elem) => elem !== '').join('\n');
};

export { plain as default };
