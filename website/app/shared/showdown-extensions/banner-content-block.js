const regex = new RegExp(`/^!!! (\w+)[\n\s]((.|\n)*?)!!!$/`, 'g');

// inspiration for this example taken from here: https://github.com/showdownjs/prettify-extension/blob/master/src/showdown-prettify.js
export const bannerContentBlock = {
  type: 'output',
  filter: function (source) {
    return source.replace(regex, function (_match, type, content) {
      console.log('banner', _match, type, content);
      return `<div class="${type}">\n${content}\n</div>`;
    });
  },
};
