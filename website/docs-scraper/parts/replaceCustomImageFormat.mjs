/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const replaceCustomImageFormat = (markdownContent) =>
  // this is a custom syntax coming from `shadowjs`
  // see: https://github.com/showdownjs/showdown/blob/95255984ad80acf745ed74605bd3ad8357dc9b33/src/subParsers/makehtml/images.js#L9
  // eg. ![Hello cats!](http://placekitten.com/g/300/200/ =770x*)
  markdownContent.replace(
    /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/gim,
    (_match, p1, p2, p3) => `![${p1}!](${p3})`
  );
