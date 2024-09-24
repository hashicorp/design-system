/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { eq } from 'ember-truth-helpers';
// eslint-disable-next-line ember/no-at-ember-render-modifiers
import didInsert from '@ember/render-modifiers/modifiers/did-insert';

import { TextTagValues, TextAlignValues, TextWeightValues } from './types';

import type { TextTags, TextVariants, TextAligns, TextWeights } from './types';

export const AVAILABLE_TAGS: string[] = Object.values(TextTagValues);
export const AVAILABLE_ALIGNS: string[] = Object.values(TextAlignValues);
export const AVAILABLE_WEIGHTS: string[] = Object.values(TextWeightValues);

export const MAPPING_VARIANT_TO_TAG: Record<TextVariants, TextTags> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h5',
  body: 'p',
};

type AvailableElements =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLDivElement;

export interface ShwTextSignature {
  Args: {
    tag?: TextTags;
    variant: TextVariants;
    align?: TextAligns;
    weight?: TextWeights;
  };
  Blocks: {
    default: [];
  };
  Element: AvailableElements;
}

export default class ShwTextComponent extends Component<ShwTextSignature> {
  /**
   * Get a tag to render based on the `@tag` argument passed or the value of `this.size` (via mapping)
   *
   * @method #tag
   * @return {string} The html tag to use in the dynamic render of the component
   */
  get tag(): TextTags {
    const { tag } = this.args;

    if (tag) {
      assert(
        `@tag for "Shw::Text" must be one of the following: ${AVAILABLE_TAGS.join(
          ', '
        )}; received: ${tag}`,
        AVAILABLE_TAGS.includes(tag)
      );
    }

    return this.args.tag || MAPPING_VARIANT_TO_TAG[this.variant];
  }

  /**
   * Sets the "variant" (style) for the text
   * Accepted values: see AVAILABLE_VARIANTS
   *
   * @type {TextVariants}
   *
   * @param variant
   * @return {TextVariants}
   */
  get variant(): TextVariants {
    const { variant } = this.args;

    assert(
      `You need to provide a @variant arguments to "Shw::Text"`,
      variant !== undefined
    );

    return variant;
  }

  /**
   * Sets the alignment of the text
   * Accepted values: see AVAILABLE_ALIGNS
   *
   * @param align
   * @type {TextAligns | undefined}
   */
  get align(): TextAligns | undefined {
    const { align } = this.args;

    if (align) {
      assert(
        `@align for "Shw::Text" must be one of the following: ${AVAILABLE_ALIGNS.join(
          ', '
        )}; received: ${align}`,
        AVAILABLE_ALIGNS.includes(align)
      );
    }

    return align;
  }

  /**
   * Sets the weight of the text
   * Accepted values: see AVAILABLE_WEIGHTS
   *
   * @param weight
   * @type {TextWeights}
   */
  get weight(): TextWeights {
    const { weight = 'inherit' } = this.args;

    return weight;
  }

  /**
   * Get the class names to apply to the component.
   * @method #classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['shw-text'];

    // Add a class based on the @variant or @tag arguments
    classes.push(`shw-text-${this.variant}`);

    // Add a class based on the @weight argument
    if (this.weight && this.weight !== 'inherit') {
      classes.push(`shw-text-weight-${this.weight}`);
    }

    // Add a class based on the @align argument
    if (this.align) {
      classes.push(`shw-text-align-${this.align}`);
    }

    return classes.join(' ');
  }

  addHeadingLink = (element: HTMLHeadingElement) => {
    const innerText = element.innerText;
    const sanitizedId = innerText
      .trim()
      .toLowerCase()
      .replace(/\W/g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-+|-+$/gm, '')
      .substring(0, 64);

    let uniqueId = '';
    for (let i = 0; i < 100; i++) {
      uniqueId = i > 0 ? `${sanitizedId}-${i}` : sanitizedId;
      if (!document.getElementById(uniqueId)) {
        break;
      }
    }
    // update the heading
    element.id = uniqueId;
    element.classList.add('shw-page-heading-scroll-margin-top');
    // inject an anchor element
    const anchor = document.createElement('a');
    anchor.href = `#${uniqueId}`;
    anchor.className = 'shw-page-heading-link';
    anchor.setAttribute('aria-labelledby', uniqueId);
    element.prepend(anchor);
  };

  <template>
    {{#if (eq this.tag "h1")}}
      <h1 class={{this.classNames}} ...attributes>{{yield}}</h1>
    {{else if (eq this.tag "h2")}}
      <h2
        class={{this.classNames}}
        {{didInsert this.addHeadingLink}}
        ...attributes
      >{{yield}}</h2>
    {{else if (eq this.tag "h3")}}
      <h3
        class={{this.classNames}}
        {{didInsert this.addHeadingLink}}
        ...attributes
      >{{yield}}</h3>
    {{else if (eq this.tag "h4")}}
      <h4
        class={{this.classNames}}
        {{didInsert this.addHeadingLink}}
        ...attributes
      >{{yield}}</h4>
    {{else if (eq this.tag "h5")}}
      <h5
        class={{this.classNames}}
        {{didInsert this.addHeadingLink}}
        ...attributes
      >{{yield}}</h5>
    {{else if (eq this.tag "h6")}}
      <h6
        class={{this.classNames}}
        {{didInsert this.addHeadingLink}}
        ...attributes
      >{{yield}}</h6>
    {{else if (eq this.tag "p")}}
      <p class={{this.classNames}} ...attributes>{{yield}}</p>
    {{else if (eq this.tag "span")}}
      <span class={{this.classNames}} ...attributes>{{yield}}</span>
    {{else}}
      <div class={{this.classNames}} ...attributes>{{yield}}</div>
    {{/if}}
  </template>
}
