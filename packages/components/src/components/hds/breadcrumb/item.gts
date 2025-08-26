/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { assert } from '@ember/debug';
import { LinkTo } from '@ember/routing';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import hdsLinkToModels from '../../../helpers/hds-link-to-models.ts';
import hdsLinkToQuery from '../../../helpers/hds-link-to-query.ts';
import { hdsResolveLinkToExternal } from '../../../utils/hds-resolve-link-to-external.ts';
import HdsIcon from '../icon/index.gts';

import type Owner from '@ember/owner';
import type { SafeString } from '@ember/template';
import type { HdsIconSignature } from '../icon';
import { tracked } from '@glimmer/tracking';

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
  @tracked linkToExternal: LinkTo | null = null;

  constructor(owner: Owner, args: HdsBreadcrumbItemSignature['Args']) {
    super(owner, args);

    // we want to avoid resolving the component if it's not needed
    if (args.isRouteExternal) {
      void this.resolveLinkToExternal();
    }
  }

  async resolveLinkToExternal() {
    this.linkToExternal = await hdsResolveLinkToExternal(
      this.args.isRouteExternal
    );
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
        {{#if @isRouteExternal}}
          <this.linkToExternal
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
          </this.linkToExternal>
        {{else}}
          <LinkTo
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
          </LinkTo>
        {{/if}}
      {{/if}}
    </li>
  </template>
}
