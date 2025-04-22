/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';

import HdsApplicationStateMedia from './media.gts';
import HdsApplicationStateHeader from './header.gts';
import HdsApplicationStateBody from './body.gts';
import HdsApplicationStateFooter from './footer.gts';
import { HdsApplicationStateAlignValues } from './types.ts';

import type { ComponentLike } from '@glint/template';
import type { HdsApplicationStateAligns } from './types.ts';
import type { HdsApplicationStateMediaSignature } from './media.gts';
import type { HdsApplicationStateHeaderSignature } from './header.gts';
import type { HdsApplicationStateBodySignature } from './body.gts';
import type { HdsApplicationStateFooterSignature } from './footer.gts';

export const ALIGNS: HdsApplicationStateAligns[] = Object.values(
  HdsApplicationStateAlignValues
);
export interface HdsApplicationStateSignature {
  Args: {
    align?: HdsApplicationStateAligns;
  };
  Blocks: {
    default: [
      {
        Media?: ComponentLike<HdsApplicationStateMediaSignature>;
        Header?: ComponentLike<HdsApplicationStateHeaderSignature>;
        Body?: ComponentLike<HdsApplicationStateBodySignature>;
        Footer?: ComponentLike<HdsApplicationStateFooterSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsApplicationState extends Component<HdsApplicationStateSignature> {
  get align(): HdsApplicationStateAligns {
    const validAlignValues: HdsApplicationStateAligns[] = Object.values(
      HdsApplicationStateAlignValues
    );

    assert(
      `@align for "Hds::ApplicationState" must be one of the following: ${validAlignValues.join(
        ', '
      )}; received: ${this.args.align}`,
      this.args.align == null || validAlignValues.includes(this.args.align)
    );

    return this.args.align ?? HdsApplicationStateAlignValues.Left;
  }

  get classNames(): string {
    const classes = ['hds-application-state'];

    // add a class based on the @align argument
    classes.push(`hds-application-state--align-${this.align}`);

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{yield
        (hash
          Media=HdsApplicationStateMedia
          Header=HdsApplicationStateHeader
          Body=HdsApplicationStateBody
          Footer=HdsApplicationStateFooter
        )
      }}
    </div>
  </template>
}
