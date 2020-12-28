import _ from 'lodash';

const getResult = (object1, object2) => {
  const result = {};
  const keysProcessed = [];
  let status = '';
  // const result = _.sortBy(object1, ['propertyName']).map((line) => {
  // });
  const orderedObject1 = Object.fromEntries(Object.entries(object1).sort());
  const orderedObject2 = Object.fromEntries(Object.entries(object2).sort());
  _.forOwn(orderedObject1, (value1, key) => {
    const value2 = _.get(orderedObject2, key);
    if (value1 === value2) { status = 'equal'; }
    if (value1 !== value2) {
      status = 'removed';
    }
    result[key] = { value1, value2, status };
    keysProcessed.push(key);
  });
  _.forOwn(orderedObject2, (value2, key) => {
    if (!keysProcessed.includes(key)) {
      status = 'added';
      result[key] = { value2, status };
    }
  });
  // console.log(JSON.stringify(result, '', 2));
  return result;
};

export default getResult;
