import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) { return '[complex value]'; }
  if (typeof value === 'string') { return `'${value}'`; }
  return value;
};

const getAcc = (acc) => (acc === '' ? '' : `${acc}.`);

const plain = (compared) => {
  const build = (obj, acc = '') => obj.flatMap(({
    propertyName, children, oldValue, newValue, type,
  }) => {
    switch (type) {
      case 'added':
        return [`Property '${getAcc(acc)}${propertyName}' was added with value: ${getValue(newValue)}`];
      case 'removed':
        return [`Property '${getAcc(acc)}${propertyName}' was removed`];
      case 'updated':
        return [
          `Property '${getAcc(acc)}${propertyName}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`,
        ];
      case 'nested':
        return [...build(children, `${getAcc(acc)}${propertyName}`)];
      default:
        return undefined;
    }
  });
  const result = build(compared);
  return [...result].filter((elem) => elem !== undefined).join('\n');
};

export { plain as default };
