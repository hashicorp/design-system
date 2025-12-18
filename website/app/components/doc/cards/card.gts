/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { LinkTo } from '@ember/routing';

import DocBadge from 'website/components/doc/badge';

interface Status {
  deprecated?: boolean;
  updated?: boolean;
  added?: boolean;
}

export interface DocCardsCardSignature {
  Args: {
    image?: string;
    title: string;
    caption?: string;
    status?: Status;
    route?: string;
    model?: unknown;
    href?: string;
    layout?: 'vertical' | 'horizontal';
  };
  Blocks: {
    default: [];
  };
  Element: HTMLLIElement;
}

export default class DocCardsCard extends Component<DocCardsCardSignature> {
  get classNames() {
    const classes = ['doc-cards-card'];
    const layout = this.args.layout ?? 'vertical';

    // add a class based on the @layout argument, default = 'vertical'
    classes.push(`doc-cards-card--layout-${layout}`);

    return classes.join(' ');
  }

  get badgeType() {
    if (this.args.status?.deprecated) {
      return 'warning-inverted';
    } else if (this.args.status?.updated) {
      return 'neutral-inverted';
    } else if (this.args.status?.added) {
      return 'information-inverted';
    }
    return undefined;
  }

  get badgeLabel() {
    if (this.args.status?.deprecated) {
      return 'Deprecated';
    } else if (this.args.status?.updated) {
      return 'Updated';
    } else if (this.args.status?.added) {
      return 'Added';
    }
    return undefined;
  }

  <template>
    <li class={{this.classNames}} ...attributes>
      {{#if @route}}
        <LinkTo
          class="doc-cards-card__link"
          @route={{@route}}
          @model={{@model}}
        >
          <img
            class="doc-cards-card__image"
            src={{@image}}
            alt=""
            role="presentation"
          />
          <div class="doc-cards-card__details">
            <p class="doc-cards-card__title">{{@title}}</p>
            {{#if this.badgeLabel}}
              <DocBadge
                class="doc-cards-card__badge"
                @type={{this.badgeType}}
                @size="medium"
              >{{this.badgeLabel}}</DocBadge>
            {{/if}}
            <p class="doc-cards-card_description">{{@caption}}</p>
          </div>
        </LinkTo>
      {{/if}}
      {{#if @href}}
        <a class="doc-cards-card__link" href={{@href}}>
          <img
            class="doc-cards-card__image"
            src={{@image}}
            alt=""
            role="presentation"
          />
          <div class="doc-cards-card__details">
            <p class="doc-cards-card__title">{{@title}}</p>
            {{#if this.badgeLabel}}
              <DocBadge
                class="doc-cards-card__badge"
                @type={{this.badgeType}}
                @size="medium"
              >{{this.badgeLabel}}</DocBadge>
            {{/if}}
            <p class="doc-cards-card_description">{{@caption}}</p>
          </div>
        </a>
      {{/if}}
    </li>
  </template>
}
