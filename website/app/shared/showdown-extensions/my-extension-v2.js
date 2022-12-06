// https://github.com/showdownjs/showdown/wiki/Cookbook:-Using-language-and-output-extensions-on-the-same-block
// http://jsfiddle.net/tivie/1rqr7xy8/
export const myextv2 = function () {
  var matches = [];
  return [
    {
      type: 'lang',
      regex: /%start%([^]+?)%end%/gi,
      replace: function (s, match) {
        matches.push(match);
        var n = matches.length - 1;
        return '%PLACEHOLDER' + n + '%';
      },
    },
    {
      type: 'output',
      filter: function (text) {
        for (var i = 0; i < matches.length; ++i) {
          var pat = '<p>%PLACEHOLDER' + i + '% *</p>';
          text = text.replace(new RegExp(pat, 'gi'), matches[i]);
        }
        //reset array
        matches = [];
        return text;
      },
    },
  ];
};
