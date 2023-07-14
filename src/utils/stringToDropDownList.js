export const stringToDropDownList  = (array) => {
  var result = [];
  array.forEach((e) => {
    const [label, value] = e.split("|");
    result.push({ label, value });
  });
  return result;
};
