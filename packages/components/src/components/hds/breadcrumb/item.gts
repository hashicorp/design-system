/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';
import { array } from '@ember/helper';

import type { SafeString } from '@ember/template';

import { hdsLinkToModels } from '../../../helpers/hds-link-to-models.ts';
import { hdsLinkToQuery } from '../../../helpers/hds-link-to-query.ts';
import HdsInteractive from '../interactive/index.gts';
import HdsIcon from '../icon/index.gts';

import type { HdsIconSignature } from '../icon/index.gts';

export interface HdsBreadcrumbItemSignature {
  Args: {
    current?: boolean;
    maxWidth?: string;
    text: string;
    isRouteExternal?: boolean;
    icon?: HdsIconSignature['Args']['name'];
    route?: string;
    href?: string;
    models?: Array<string | number>;
    model?: string | number;
    query?: Record<string, string>;
    'current-when'?: string;
    replace?: boolean;
  };
  Element: HTMLLIElement;
}

export default class HdsBreadcrumbItem extends Component<HdsBreadcrumbItemSignature> {
  get maxWidth(): string | undefined {
    const { maxWidth } = this.args;

    if (maxWidth) {
      assert(
        `@maxWidth for "Hds::Breadcrumb::Item" must be a size as number in 'px' or in 'em' (eg. '200px' or '24em'); received: ${maxWidth}`,
        maxWidth.match(/^\d+(px|em)$/)
      );

      return maxWidth;
    } else {
      return undefined;
    }
  }

  get itemStyle(): SafeString | undefined {
    if (this.maxWidth) {
      return htmlSafe(`max-width: ${this.maxWidth}`);
    } else {
      return undefined;
    }
  }

  get classNames(): string {
    const classes = ['hds-breadcrumb__item'];

    return classes.join(' ');
  }

  <template>
    <li class="hds-breadcrumb__item" style={{this.itemStyle}} ...attributes>
      {{#if @current}}
        <div class="hds-breadcrumb__current">
          {{#if @icon}}
            <div class="hds-breadcrumb__icon">
              <HdsIcon @name={{@icon}} @size="16" @stretched={{true}} />
            </div>
          {{/if}}
          <span class="hds-breadcrumb__text">{{@text}}</span>
        </div>
      {{else}}
        <HdsInteractive
          class="hds-breadcrumb__link"
          @current-when={{@current-when}}
          @models={{hdsLinkToModels (array @model @models)}}
          @query={{hdsLinkToQuery (array @query)}}
          @replace={{@replace}}
          @route={{@route}}
          @href={{@href}}
          @isRouteExternal={{@isRouteExternal}}
        >
          {{#if @icon}}
            <div class="hds-breadcrumb__icon">
              <HdsIcon @name={{@icon}} @size="16" @stretched={{true}} />
            </div>
          {{/if}}
          <span class="hds-breadcrumb__text">{{@text}}</span>
        </HdsInteractive>
      {{/if}}
    </li>
  </template>
}
