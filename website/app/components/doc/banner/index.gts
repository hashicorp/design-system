/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import type Owner from '@ember/owner';

import { HdsIcon } from '@hashicorp/design-system-components/components';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

export const TYPES = [
  'info',
  'information',
  // 'success',
  'warning',
  'critical',
  'insight',
  'callout',
];

type BannerTypes = (typeof TYPES)[number];

interface DocBannerComponentSignature {
  Args: {
    type: BannerTypes;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class DocBanner extends Component<DocBannerComponentSignature> {
  constructor(owner: Owner, args: DocBannerComponentSignature['Args']) {
    super(owner, args);
    assert(
      `@type for "Doc::Banner" must be one of the following: ${TYPES.join(
        ', ',
      )}; received: ${this.args.type}`,
      TYPES.includes(this.args.type),
    );
  }

  get icon() {
    let icon: HdsIconSignature['Args']['name'] | undefined;
    switch (this.args.type) {
      case 'info':
      case 'information':
        icon = 'info';
        break;
      case 'warning':
        icon = 'alert-triangle';
        break;
      case 'critical':
        icon = 'alert-diamond';
        break;
      case 'insight':
        icon = 'bulb';
        break;
      case 'callout':
        icon = 'discussion-circle';
        break;
      default:
        break;
    }
    return icon;
  }

  get classNames() {
    const classes = ['doc-banner'];

    // add a class based on the @type argument
    classes.push(`doc-banner--type-${this.args.type}`);

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{#if this.icon}}
        <HdsIcon class="doc-banner__icon" @name={{this.icon}} @size="24" />
      {{/if}}
      <div class="doc-banner__content">
        {{yield}}
      </div>
    </div>
  </template>
}
