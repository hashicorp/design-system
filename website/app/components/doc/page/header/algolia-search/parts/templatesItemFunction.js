/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { htmlTemplatesItemPreview } from './htmlTemplatesItemPreview';
import { htmlTemplatesItemBody } from './htmlTemplatesItemBody';
import { htmlTemplatesItemExtra } from './htmlTemplatesItemExtra';

export const templatesItemFunction = () => {
  return ({ item, components, html }) => {
    // DEBUG - Very useful for debugging, don't delete it
    // const itemType = item.type || 'UNKNOWN TYPE';
    // console.log(`ITEM / ${itemType.toUpperCase()}`, item);

    // IMPORTANT! to use html`${something}`, `something` needs to be DOM nodes, it can't be a string, or it will render HTML as a string!
    // see: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/templates/#with-a-shim
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
    // - "The first argument of a tag function contains an array of string values."
    // see also Slack thread here with detailed explanation: https://hashicorp.slack.com/archives/C11JCBJTW/p1699356397851059

    return html`
      <a class="aa-ItemLinkWrapper" href="${item.searchResultURL}">
        <!-- preview -->
        ${htmlTemplatesItemPreview({ item, html })}
        <!-- body -->
        ${htmlTemplatesItemBody({ item, html, components })}
        <!-- extra -->
        ${htmlTemplatesItemExtra({ html })}
      </a>
    `;
  };
};
