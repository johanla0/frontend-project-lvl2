import _ from 'lodash';

const getResult = (object1, object2) => {
  const result = {};
  const keysProcessed = [];
  // const result = _.sortBy(object1, ['propertyName']).map((line) => {
  // });
  const orderedObject1 = Object.fromEntries(Object.entries(object1).sort());
  const orderedObject2 = Object.fromEntries(Object.entries(object2).sort());
  _.forOwn(orderedObject1, (value1, key) => {
    const value2 = _.get(orderedObject2, key);
    keysProcessed.push(key);
    if (value2 === undefined) {
      result[key] = { value1, status: 'removed' };
      return;
    }
    if (value1 === value2) {
      result[key] = { value1, value2, status: 'unchanged' };
      return;
    }
    if (value1 !== value2) {
      result[key] = { value1, value2, status: 'changed' };
    }
  });
  _.forOwn(orderedObject2, (value2, key) => {
    if (!keysProcessed.includes(key)) {
      result[key] = { value2, status: 'added' };
    }
  });
  // console.log(JSON.stringify(result, '', 2));
  return result;
};

export default getResult;
