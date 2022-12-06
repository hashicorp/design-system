export const myext = function () {
  var myext1 = {
    type: 'lang',
    regex: /markdown/g,
    replace: 'showdown',
  };
  var myext2 = {
    type: 'lang',
    regex: /test/g,
    replace: '✅',
  };
  return [myext1, myext2];
};
