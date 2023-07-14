export const labelToDropdownList = (array) => {
  var result = [];
  array.forEach((e) => {
    result.push({ label: e, value: e });
  });
  return result;
};
