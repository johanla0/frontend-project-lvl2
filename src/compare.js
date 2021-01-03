import _ from 'lodash';

const compare = (oldObject, newObject) => {
  const oldKeys = Object.keys(oldObject);
  const newKeys = Object.keys(newObject);
  const properties = _.sortBy(_.union(oldKeys, newKeys));
  const build = (property) => {
    if (_.isPlainObject(oldObject[property]) && _.isPlainObject(newObject[property])) {
      return {
        propertyName: property,
        children: compare(oldObject[property], newObject[property]),
        type: 'nested',
      };
    }
    if (!_.has(oldObject, property)) {
      return { propertyName: property, value2: newObject[property], type: 'added' };
    }
    if (!_.has(newObject, property)) {
      return { propertyName: property, value1: oldObject[property], type: 'removed' };
    }
    if (oldObject[property] !== newObject[property]) {
      return {
        propertyName: property,
        value1: oldObject[property],
        value2: newObject[property],
        type: 'changed',
      };
    }
    return {
      propertyName: property,
      value1: oldObject[property],
      value2: oldObject[property],
      type: 'unchanged',
    };
  };
  return properties.map(build);
};

export default compare;
