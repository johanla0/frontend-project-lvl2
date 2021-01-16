import _ from 'lodash';

const buildTree = (oldObject, newObject) => {
  const oldProperties = Object.keys(oldObject);
  const newProperties = Object.keys(newObject);
  const properties = _.sortBy(_.union(oldProperties, newProperties));
  const types = {
    added: (property) => ({
      propertyName: property,
      newValue: newObject[property],
      type: 'added',
    }),
    removed: (property) => ({
      propertyName: property,
      oldValue: oldObject[property],
      type: 'removed',
    }),
    nested: (property) => ({
      propertyName: property,
      children: buildTree(oldObject[property], newObject[property]),
      type: 'nested',
    }),
    updated: (property) => ({
      propertyName: property,
      oldValue: oldObject[property],
      newValue: newObject[property],
      type: 'updated',
    }),
    unchanged: (property) => ({
      propertyName: property,
      oldValue: oldObject[property],
      type: 'unchanged',
    }),
  };
  const compare = (property) => {
    if (!_.has(oldObject, property)) { return types.added(property); }
    if (!_.has(newObject, property)) { return types.removed(property); }
    if (_.isPlainObject(oldObject[property]) && _.isPlainObject(newObject[property])) {
      return types.nested(property);
    }
    if (oldObject[property] !== newObject[property]) { return types.updated(property); }
    return types.unchanged(property);
  };
  return properties.map(compare);
};

export default buildTree;
