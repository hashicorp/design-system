/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { elementsToClassNames } from './showdown-extensions/elements-to-classnames';
import { pageSections } from './showdown-extensions/page-sections';
import { contentBlocks } from './showdown-extensions/content-blocks';
import { removeAutoPTags } from './showdown-extensions/remove-auto-p-tags';

// SET SHOWDOWN SETTINGS HERE:
// https://showdownjs.com/docs/available-options/
// https://github.com/showdownjs/showdown/wiki/Showdown-Options

export const showdownConfig = {
  // enable support for tables in markdown
  // see: https://showdownjs.com/docs/available-options/#tables
  tables: true,
  // enable support for strikethrough in markdown
  // see: https://showdownjs.com/docs/available-options/#strikethrough
  strikethrough: true,
  // enable support for image sizes in markdown
  // see: https://showdownjs.com/docs/available-options/#parseimgdimensions
  parseImgDimensions: true,
  // enable custom ID for a heading
  // see: https://showdownjs.com/docs/available-options/#customizedheaderid
  // notice: later it may be replaced with a more comprehensive way to handle HTML attributes (similar to https://github.com/arve0/markdown-it-attrs)
  customizedHeaderId: true,
  // enable generations of heading IDs compatible with GitHub style
  // see: https://showdownjs.com/docs/available-options/#ghcompatibleheaderid
  ghCompatibleHeaderId: true,
  // add default class for each HTML element generated
  // see: https://github.com/showdownjs/showdown/wiki/Extensions + https://showdownjs.com/docs/tutorials/add-default-class-to-html/
  extensions: [
    pageSections,
    ...elementsToClassNames,
    contentBlocks,
    removeAutoPTags,
  ],
};
