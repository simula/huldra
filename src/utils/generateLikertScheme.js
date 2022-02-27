import _ from "lodash";

const generateLikertScheme = (size) => {
  return _.range(1, size + 1).map((e) => {
    const scheme = { value: e, text: e.toString() };
    return scheme;
  });
};
export { generateLikertScheme };
