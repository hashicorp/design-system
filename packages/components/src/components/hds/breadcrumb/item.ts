/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';

import { hdsResolveLinkToExternal } from '../../../utils/hds-resolve-link-to-external.ts';

import type Owner from '@ember/owner';
import type { LinkTo } from '@ember/routing';
import type { SafeString } from '@ember/template';
import type { HdsIconSignature } from '../icon/index';

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

  resolveLinkToExternal() {
    this.linkToExternal = hdsResolveLinkToExternal(this.args.isRouteExternal);
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
}
