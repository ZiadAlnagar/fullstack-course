export const useSortBy = (array, prop) =>
  array.slice().sort((a, b) => (a[prop] < b[prop] ? 1 : a[prop] > b[prop] ? -1 : 0));

export default {
  useSortBy,
};
