
const reverse = (arr: Array<any>): Array<any> => {
  let result = [];
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    result = [...result, arr[i]];
  }
  return result;
};

export default reverse;
