export const myext = function () {
  var myext1 = {
    type: 'lang',
    regex: /yyyyyy/g,
    replace: 'yyyyyy',
  };
  var myext2 = {
    type: 'lang',
    regex: /test/g,
    replace: '✅',
  };
  return [myext1, myext2];
};
