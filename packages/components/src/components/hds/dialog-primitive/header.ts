/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { HdsIconSignature } from '../icon';
import type { HdsDialogPrimitiveHeaderTitleTags } from './types';
import { HdsDialogPrimitiveHeaderTitleTagValues } from './types.ts';

export interface HdsDialogPrimitiveHeaderSignature {
  Args: {
    contextualClassPrefix?: string;
    id?: string;
    icon?: HdsIconSignature['Args']['name'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDismiss?: (event: MouseEvent, ...args: any[]) => void;
    titleTag?: HdsDialogPrimitiveHeaderTitleTags;
    tagline?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const NOOP = (): void => {};

export default class HdsDialogPrimitiveHeaderComponent extends Component<HdsDialogPrimitiveHeaderSignature> {
  get titleTag(): HdsDialogPrimitiveHeaderTitleTags {
    return this.args.titleTag ?? HdsDialogPrimitiveHeaderTitleTagValues.Div;
  }

  /**
   * @param onDismiss
   * @type {function}
   * @default () => {}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onDismiss(): (event: MouseEvent, ...args: any[]) => void {
    const { onDismiss } = this.args;

    // notice: this is a guard used in case the button is used as standalone element (eg. in the showcase)
    // in reality it's always used inside the main components as a yielded component, so the onDismiss handler is always defined
    if (typeof onDismiss === 'function') {
      return onDismiss;
    } else {
      return NOOP;
    }
  }
}
