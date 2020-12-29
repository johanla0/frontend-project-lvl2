import _ from 'lodash';

const output = (obj) => {
  const result = [];
  _.forOwn(obj, (value, key) => {
    switch (value?.status) {
      case 'added':
        result.push(`  + ${key}: ${value?.value2}`);
        return;
      case 'removed':
        result.push(`  - ${key}: ${value?.value1}`);
        return;
      case 'unchanged':
        result.push(`    ${key}: ${value.value1}`);
        return;
      case 'changed':
        result.push(`  - ${key}: ${value.value1}`);
        result.push(`  + ${key}: ${value.value2}`);
        break;
      default:
    }
  });
  result.splice(0, 0, '{');
  result.push('}');
  return result.join('\n');
};

export default output;
