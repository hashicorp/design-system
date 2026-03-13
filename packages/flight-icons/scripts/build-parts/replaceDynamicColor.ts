/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export default function replaceDynamicColor(source: string) {
  // completely remove any "fill" attribute that has #000001 ("dynamic" color in Figma, equivalent of "currentColor") as value
  // the reason for this is that the Ember addon uses the "fill" attribute with "currentColor" value (or a value passed as prop by the user)
  // to set the color of the children <path> elements (see https://github.com/hashicorp/flight/issues/200) so the only way to have it work properly
  // is not to use `fill="currentColor"` on the <path> elements, but to completely remove the fill attribute so it's inherited from the parent <SVG> element
  return source.replace(/ fill="#000001"/gi, '');
}
