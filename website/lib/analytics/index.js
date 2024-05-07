/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

'use strict';

module.exports = {
  name: require('./package').name,

  contentFor(type) {
    if (type === 'head-footer') {
      return `<script src="https://cdn.usefathom.com/script.js" data-spa="auto" data-site="PJPASXHG" defer></script>

      <meta name="google-site-verification" content="mx7oZncj-AnNjefq1rOLXEdtbrLbsrYP_vax-ZZWiOI" />`;
    }
  },
};
