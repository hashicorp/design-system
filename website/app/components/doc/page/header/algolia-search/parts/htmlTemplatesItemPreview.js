/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const htmlPreviewIcon = ({ html, iconName }) => html`
  <div class="aa-ItemPreview aa-ItemPreview--icon">
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href="#flight-${iconName}-24"></use>
    </svg>
  </div>
`;

const htmlPreviewToken = ({ html, tokenName, tokenValue, tokenType }) => {
  let style = '';
  let content = '';
  if (tokenName.match(/^token-typography/)) {
    content = 'Aa';
  } else if (tokenType === 'color' || tokenName.match(/^token-color/)) {
    style = `background-color: ${tokenValue}`;
  } else {
    content = 'T';
  }
  return html`
    <div class="aa-ItemPreview aa-ItemPreview--token" style="${style}">
      ${content}
    </div>
  `;
};

const htmlPreviewIllustration = ({ html, imgSrc }) => {
  return html`
    <div class="aa-ItemPreview aa-ItemPreview--illustration">
      <img src="${imgSrc}" alt="" role="presentation" />
    </div>
  `;
};

export const htmlTemplatesItemPreview = ({ html, item }) => {
  switch (item.type) {
    case 'suggestion':
      return htmlPreviewIcon({ html, iconName: item.previewIcon });
    case 'icon':
      return htmlPreviewIcon({ html, iconName: item['icon-name'] });
    case 'token':
      return htmlPreviewToken({
        html,
        tokenName: item['token-name'],
        tokenValue: item['token-value'],
        tokenType: item['token-type'],
      });
    default:
      if (item.previewImage) {
        return htmlPreviewIllustration({ html, imgSrc: item.previewImage });
      } else {
        return htmlPreviewIllustration({
          html,
          // TODO! create custom placeholder image?
          imgSrc: '/assets/illustrations/home-abstract-small.jpg',
        });
      }
  }
};
