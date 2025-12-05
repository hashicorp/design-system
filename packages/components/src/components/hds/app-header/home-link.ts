/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import type { HdsIconSignature } from '../icon';
import type { HdsInteractiveSignature } from '../interactive/';

export interface HdsAppHeaderHomeLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    icon: HdsIconSignature['Args']['name'];
    isIconOnly?: boolean;
    color?: string;
    text: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

export default class HdsAppHeaderHomeLink extends Component<HdsAppHeaderHomeLinkSignature> {
  get text(): string {
    const { text } = this.args;

    assert(
      '@text for "Hds::AppHeader::HomeLink" must have a valid value',
      text !== undefined
    );

    return text;
  }

  get icon(): HdsIconSignature['Args']['name'] {
    const { icon } = this.args;

    assert(
      '@icon name for "Hds::AppHeader::HomeLink" must be provided',
      icon !== undefined
    );

    return icon;
  }

  get isIconOnly(): boolean {
    return this.args.isIconOnly ?? true;
  }
}
