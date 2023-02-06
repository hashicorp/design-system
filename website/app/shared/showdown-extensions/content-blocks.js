/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// inspiration for this approach: https://github.com/showdownjs/showdown/wiki/Cookbook:-Using-language-and-output-extensions-on-the-same-block
export const contentBlocks = function () {
  var langExtension = {
    // we use the "lang" here because we want to replace the `!!!` delimitiers before everything else
    // so that the contained markdown is normally interpreted, parsed and converted
    // see: https://github.com/showdownjs/showdown/wiki/Extensions#type-propertyrequired
    type: 'lang',
    filter: function (text) {
      // console.log('langExtension1 text', '\n', text, '\n\n');
      // https://regex101.com/r/j4PHPo/1
      const langRegex = new RegExp(/^!!! (\w+)[\n\s]((.|\n)*?)!!!$/, 'gm');
      text = text.replace(langRegex, function (_match, type, content) {
        // we use the PHP tag as passthrough "tag" because is simply ignored by the `hashHTMLBlocks` function in Showdown
        // see: https://github.com/showdownjs/showdown/blob/master/src/subParsers/makehtml/hashHTMLBlocks.js#L93-L95
        return `\n<?php start="content-block" type="${type.toLowerCase()}" ?>\n${content}\n<?php end="content-block" type="${type.toLowerCase()}" ?>\n`;
      });
      // console.log('langExtension2 text', '\n', text, '\n\n');
      return text;
    },
  };
  var outputExtension = {
    type: 'output',
    filter: function (text) {
      // console.log('outputExtension1 text', '\n', text, '\n\n');
      // https://regex101.com/r/DebuYI/1
      const outputRegex = new RegExp(
        /<\?php start="content-block" type="(.*?)" \?>\n?/,
        'g'
      );
      text = text.replace(outputRegex, function (_match, type) {
        if (type === 'do' || type === 'dont') {
          return `<Doc::DoDont @type="${type}">\n`;
        } else {
          return `<Doc::Banner @type="${type}">\n`;
        }
      });
      text = text.replace(
        /\n?<\?php end="content-block" type="(.*?)" \?>/g,
        function (_match, type) {
          if (type === 'do' || type === 'dont') {
            return '</Doc::DoDont>';
          } else {
            return '</Doc::Banner>';
          }
        }
      );
      // console.log('outputExtension2 text', '\n', text, '\n\n');
      return text;
    },
  };
  return [langExtension, outputExtension];
};
