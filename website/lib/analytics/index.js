/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

'use strict';

module.exports = {
  name: require('./package').name,

  contentFor(type) {
    if (type === 'head-footer' && process.env.VERCEL_ENV === 'production') {
      return `<script src="https://cdn.usefathom.com/script.js" data-spa="auto" data-site="PPQLJJKK" data-excluded-domains="vercel.app,localhost" defer></script>
      
      <meta name="google-site-verification" content="mx7oZncj-AnNjefq1rOLXEdtbrLbsrYP_vax-ZZWiOI" />`;
    }
  },
};
