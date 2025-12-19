/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import DocCardsCard from 'website/components/doc/cards/card';
import type { DocCardsCardSignature } from 'website/components/doc/cards/card';

interface DocCardsDeckSignature {
  Args: {
    cards?: DocCardsCardSignature['Args'][];
    cols?: '2' | '3' | '4';
    layout?: 'vertical' | 'horizontal';
  };
  Blocks: {
    default: [];
  };
  Element: HTMLUListElement;
}

export default class DocCardsDeck extends Component<DocCardsDeckSignature> {
  get cols() {
    return this.args.cols ?? '2';
  }
  get classNames() {
    const classes = ['doc-cards-deck'];

    classes.push(`doc-cards-deck--layout-${this.cols}cols`);

    return classes.join(' ');
  }

  <template>
    <ul class={{this.classNames}} ...attributes role="list">
      {{#if @cards}}
        {{#each @cards as |card|}}
          <DocCardsCard
            @image={{card.image}}
            @title={{card.title}}
            @caption={{card.caption}}
            @status={{card.status}}
            @route={{card.route}}
            @model={{card.model}}
            @href={{card.href}}
            @layout={{@layout}}
          />
        {{/each}}
      {{else}}
        {{yield}}
      {{/if}}
    </ul>
  </template>
}
