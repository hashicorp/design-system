/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';
import { LinkTo } from '@ember/routing';
import { dependencySatisfies, importSync, macroCondition } from '@embroider/macros';
import HdsIcon from '../icon/index.gts';
import hdsLinkToModels from '../../../helpers/hds-link-to-models.ts';
import hdsLinkToQuery from '../../../helpers/hds-link-to-query.ts';

import type { SafeString } from '@ember/template';
import type { HdsIconSignature } from '../icon';
import type Owner from '@ember/owner';

export interface HdsBreadcrumbItemSignature {
  Args: {
    current?: boolean;
    maxWidth?: string;
    text: string;
    isRouteExternal?: boolean;
    icon?: HdsIconSignature['Args']['name'];
    route?: string;
    models?: Array<string | number>;
    model?: string | number;
    query?: Record<string, string>;
    'current-when'?: string;
    replace?: boolean;
  };
  Element: HTMLLIElement;
}

export default class HdsBreadcrumbItem extends Component<HdsBreadcrumbItemSignature> {
  linkToComponent = LinkTo;

  constructor(owner: Owner, args: HdsBreadcrumbItemSignature['Args']) {
    super(owner, args);

    if (this.args.isRouteExternal) {
      if (macroCondition(dependencySatisfies('ember-engines', '*'))) {
        // @ts-expect-error: shape is unknown
        this.linkToComponent = importSync(
          'ember-engines/components/link-to-external-component.js'
        ).default as LinkTo;
      } else {
        assert(
          `@isRouteExternal is only available when using the "ember-engines" addon. Please install it to use this feature.`,
          false
        );
      }
    }
  }

  /**
   * @param maxWidth
   * @type {string}
   * @default undefined
   * @description A parameter that can be applied to an "item" to limit its max-width
   */
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

  /**
   * Get the inline style to apply to the item.
   * @method BreadcrumbItem#itemStyle
   * @return {string} The "style" attribute to apply to the item.
   */
  get itemStyle(): SafeString | undefined {
    if (this.maxWidth) {
      return htmlSafe(`max-width: ${this.maxWidth}`);
    } else {
      return undefined;
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method BreadcrumbItem#classNames
   * @return {string} The "class" attribute to apply to the component.
   */
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
        <this.linkToComponent
          class="hds-breadcrumb__link"
          @current-when={{@current-when}}
          @models={{hdsLinkToModels @model @models}}
          @query={{hdsLinkToQuery @query}}
          @replace={{@replace}}
          @route={{@route}}
        >
          {{#if @icon}}
            <div class="hds-breadcrumb__icon">
              <HdsIcon @name={{@icon}} @size="16" @stretched={{true}} />
            </div>
          {{/if}}
          <span class="hds-breadcrumb__text">{{@text}}</span>
        </this.linkToComponent>
      {{/if}}
    </li>
  </template>
}
