/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// inspiration for this approach: https://github.com/showdownjs/showdown/wiki/Cookbook:-Using-language-and-output-extensions-on-the-same-block
export const pageSections = function () {
  var langExtension = {
    // we use the "lang" here because we want to replace the `!!!` delimitiers before everything else
    // so that the contained markdown is normally interpreted, parsed and converted
    // see: https://github.com/showdownjs/showdown/wiki/Extensions#type-propertyrequired
    type: 'lang',
    filter: function (text) {
      // console.log('langExtension1 text', '\n', text, '\n\n');
      // https://regex101.com/r/ZMRcG9/1
      const langRegex = new RegExp(
        /^<section data-tab="([^>]*)">((.|\n)*?)<\/section>$/,
        'gm'
      );
      text = text.replace(langRegex, function (_match, tab, content) {
        // we use the ASP tag as passthrough "tag" because is simply ignored by the `hashHTMLBlocks` function in Showdown
        // see: https://github.com/showdownjs/showdown/blob/master/src/subParsers/makehtml/hashHTMLBlocks.js#L93-L95
        return `\n<%asp start="page-section" tab="${tab}" %>\n${content}\n<%asp end="page-section" %>\n`;
      });
      // console.log('langExtension2 text', '\n', text, '\n\n');
      return text;
    },
  };
  var outputExtension = {
    type: 'output',
    filter: function (text) {
      // console.log('outputExtension1 text', '\n', text, '\n\n');
      text = text.replace(
        /<%asp start="page-section" tab="(.*)" %>\n?/g,
        function (_match, tab) {
          // TODO understand if this is enough or we need something more solid
          const id = tab.toLowerCase().replace(' ', '-');
          return `<section id="${id}" data-tab="${tab}">\n`;
        }
      );
      text = text.replace(/\n?<%asp end="page-section" %>/g, '</section>');
      // console.log('outputExtension2 text', '\n', text, '\n\n');
      return text;
    },
  };
  return [langExtension, outputExtension];
};
