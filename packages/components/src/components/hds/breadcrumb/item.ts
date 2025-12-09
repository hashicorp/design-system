/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';

import type { LinkTo } from '@ember/routing';
import type { SafeString } from '@ember/template';
import type { HdsIconSignature } from '../icon/index';
import { getLinkToExternal } from '../../../utils/hds-link-to-external.ts';

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
  /**
   *
   * @param linkToExternal
   * @type LinkTo | null
   * @default null
   */
  get linkToExternal(): LinkTo | null {
    const component = getLinkToExternal();
    if (component === null) {
      assert(
        `HdsBreadcrumbItem: You attempted to use an external link without configuring HDS with an external component. Please add this in your app.js file:

import { setLinkToExternal } from '@hashicorp/design-system-components/utils/hds-link-to-external';
setLinkToExternal(LinkToExternalComponent);`
      );
    }
    return component;
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
