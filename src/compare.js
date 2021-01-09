import _ from 'lodash';

const compare = (oldObject, newObject) => {
  const oldProperties = Object.keys(oldObject);
  const newProperties = Object.keys(newObject);
  const properties = _.sortBy(_.union(oldProperties, newProperties));
  const build = (property) => {
    if (!_.has(oldObject, property)) {
      return { propertyName: property, newValue: newObject[property], type: 'added' };
    }
    if (!_.has(newObject, property)) {
      return { propertyName: property, oldValue: oldObject[property], type: 'removed' };
    }
    if (
      _.isPlainObject(oldObject[property])
      && _.isPlainObject(newObject[property])
    ) {
      return {
        propertyName: property,
        children: compare(oldObject[property], newObject[property]),
        type: 'nested',
      };
    }
    if (oldObject[property] !== newObject[property]) {
      return {
        propertyName: property,
        oldValue: oldObject[property],
        newValue: newObject[property],
        type: 'updated',
      };
    }
    return {
      propertyName: property,
      oldValue: oldObject[property],
      type: 'unchanged',
    };
  };
  return properties.map(build);
};

export default compare;
