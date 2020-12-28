import _ from 'lodash';

const output = (obj) => {
  const result = [];
  _.forOwn(obj, (value, key) => {
    if (value.value1 === undefined) {
      result.push(`  + ${key}: ${value?.value2}`);
      return;
    }
    if (value.value2 === undefined) {
      result.push(`  - ${key}: ${value?.value1}`);
      return;
    }
    if (value?.value1 === value?.value2) {
      result.push(`    ${key}: ${value.value1}`);
      return;
    }
    if (value?.value1 !== value?.value2) {
      result.push(`  - ${key}: ${value.value1}`);
      result.push(`  + ${key}: ${value.value2}`);
    }
  });
  result.splice(0, 0, '{');
  result.push('}');
  return result.join('\n');
};

export default output;
