/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const itemPreview = ({ item }) => {
  let content = '';
  switch (item.type) {
    case 'icon':
      content += `<div class="aa-ItemPreview aa-ItemPreview--icon">`;
      content += `  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">`;
      content += `    <use href="#flight-${item['icon-name']}-24"></use>`;
      content += `  </svg>`;
      content += `</div>`;
      break;
    case 'token':
      if (item['token-name'].match(/^token-typography/)) {
        content += `<div class="aa-ItemPreview aa-ItemPreview--token">`;
        content += `  Aa`;
        content += `</div>`;
      } else if (item['token-name'].match(/^token-color/)) {
        content += `<div class="aa-ItemPreview aa-ItemPreview--token" style="background-color: ${item['token-value']}">`;
        content += `</div>`;
      } else {
        content += `<div class="aa-ItemPreview aa-ItemPreview--token">`;
        content += `  T`;
        content += `</div>`;
      }
      break;
    default:
      content += `<div class="aa-ItemPreview aa-ItemPreview--illustration">`;
      if (item.previewImage) {
        content += `  <img src="/${item.previewImage}" alt="" role="presentation" />`;
      } else {
        // TODO! add a proper placeholder here!
        content += `  <img src="/assets/illustrations/home-abstract-small.jpg" alt="" role="presentation" />`;
      }
      content += `</div>`;
      break;
  }
  return content;
};

const itemBody = ({ item, html, components }) => {
  let content = '';
  content += `<div class="aa-ItemContentBody">`;
  switch (item.type) {
    case 'icon':
      content += `  <div class="aa-ItemContentTitle">\n`;
      content += `    Icon: ${item['icon-name']}\n`;
      content += `  </div>\n`;
      content += `  <div class="aa-ItemContentDescription">\n`;
      content += `    Alias: ${item['icon-aliases']}\n`;
      content += `  </div>\n`;
      break;
    case 'token':
      content += `  <div class="aa-ItemContentTitle">\n`;
      content += `    Token: ${item['token-name']}\n`;
      content += `  </div>\n`;
      if (item['token-value']) {
        content += `  <div class="aa-ItemContentDescription">\n`;
        content += `    Value: <code>${item['token-value']}</code>\n`;
        content += `  </div>\n`;
      }
      break;
    default:
      content += `  <div class="aa-ItemContentTitle">\n`;
      content += `    ${item.title}\n`;
      content += `  </div>\n`;
      if (item._highlightResult) {
        // TODO!
      }
      // content += `  <div class="aa-ItemContentDescription">\n`;
      // content += `    ${components.Snippet({
      //   hit: item,
      //   attribute: 'caption',
      // })}`;
      // content += `  </div>\n`;
      break;
  }
  content += `</div>`;
  return content;
};

const itemExtra = () => {
  let content = '';
  content += `<div class="aa-ItemExtra">`;
  content += `  <svg class="aa-ItemExtra__ReturnIcon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">`;
  content += `    <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />`;
  content += `  </svg>`;
  content += `</div>`;
  return content;
};

export const templatesItemFunction = () => {
  return ({ item, components, html }) => {
    const itemType = item.type || 'UNKNOWN TYPE';
    console.log(`ITEM / ${itemType.toUpperCase()}`, item);

    let content = '';
    content += `<a class="aa-ItemLinkWrapper" href="/${item.pageURL}">`;
    content += `  ${itemPreview({ item })}`;
    content += `  ${itemBody({ item, html, components })}`;
    content += `  ${itemExtra()}`;
    content += `</a>`;

    // IMPORTANT! you can't do html`${content}` or it will render HTML as a string
    // see: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/templates/#with-a-shim
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
    // - "The first argument of a tag function contains an array of string values."
    // see also Slack thread here with detailed explanation: https://hashicorp.slack.com/archives/C11JCBJTW/p1699356397851059
    return html([content]);
  };
};
