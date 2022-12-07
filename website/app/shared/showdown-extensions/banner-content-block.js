const PLACEHOLDER = 'div';

const langRegex = new RegExp(/^!!! (\w+)[\n\s]((.|\n)*?)!!!$/, 'gm');
const outputRegex = new RegExp(`<(\/)?${PLACEHOLDER}`, 'g');

export const bannerContentBlock = function () {
  var langExtension = {
    // we use the "lang" here because we want to replace the `!!!` delimitiers before everything else
    // so that the contained markdown is normally interpreted, parsed and converted
    // see: https://github.com/showdownjs/showdown/wiki/Extensions#type-propertyrequired
    type: 'lang',
    // https://regex101.com/r/j4PHPo/1
    regex: langRegex,
    replace: function (text) {
      console.log('langExtension1 text', text);
      const newText = text.replace(langRegex, function (_match, type, content) {
        console.log('langExtension2', _match, type, content);
        // return `<${PLACEHOLDER} data-banner-type="${type}" data-markdown="1">\n${content}\n</${PLACEHOLDER}>`;
        return `\n\n<?php start data-banner-type="${type}" ?>\n<div data-markdown="1">\n${content}\n</div>\n<?php end ?>\n\n`;
      });
      console.log('langExtension1 newText', newText);
      return newText;
    },
  };
  var outputExtension = {
    type: 'output',
    // regex: outputRegex,
    // replace: function (text) {
    //   // TODO maybe we can use this regex https://regex101.com/r/Z91et6/1 to replace both tags at the same time?
    //   console.log('outputExtension old text', text);
    //   const newText = text.replace(outputRegex, `<$1Doc::Banner`);
    //   console.log('outputExtension newText', newText);
    //   return newText;
    // },
    filter: function (text) {
      // TODO maybe we can use this regex https://regex101.com/r/Z91et6/1 to replace both tags at the same time?
      console.log('outputExtension old text', '\n\n', text, '\n\n');
      let newText = text.replace(/<\?php start/g, '<Doc::Banner');
      newText = newText.replace(/<\?php end/g, '</Doc::Banner');
      newText = newText.replace(/\?>/g, '>');
      console.log('outputExtension newText', '\n\n', newText, '\n\n');
      return newText;
    },
    // filter: function (text) {
    //   text = text.replace(outputRegex, `<$1Doc::Banner`);
    //   return text;
    // },
  };
  return [langExtension, outputExtension];
};

// export const bannerContentBlock_ZZZ = [
//   {
//     type: 'lang',
//     regex: regex,
//     replace: function (text) {
//       console.log('banner1', text);
//       return text.replace(regex, function (_match, type, content) {
//         console.log('banner2a', _match);
//         console.log('banner2b', type);
//         console.log('banner2c', content);
//         return `<div data-banner-type="${type}" class="doc-banner" data-markdown="1">\n${content}\n</div>`;
//         // return `<aaa class="${type}" data-markdown="1">\n${content}\n</aaa>`;
//       });
//     },
//   },
// ];
