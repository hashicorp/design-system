/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';

import { HdsApplicationStateAlignValues } from './types.ts';
import HdsApplicationStateMedia from './media.gts';
import HdsApplicationStateHeader from './header.gts';
import HdsApplicationStateBody from './body.gts';
import HdsApplicationStateFooter from './footer.gts';

import type { HdsApplicationStateAligns } from './types.ts';

export const ALIGNS: HdsApplicationStateAligns[] = Object.values(
  HdsApplicationStateAlignValues
);
export interface HdsApplicationStateSignature {
  Args: {
    align?: HdsApplicationStateAligns;
    isAutoCentered?: boolean;
  };
  Blocks: {
    default: [
      {
        Media?: typeof HdsApplicationStateMedia;
        Header?: typeof HdsApplicationStateHeader;
        Body?: typeof HdsApplicationStateBody;
        Footer?: typeof HdsApplicationStateFooter;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsApplicationState extends Component<HdsApplicationStateSignature> {
  get isAutoCentered(): boolean {
    return this.args.isAutoCentered ?? true;
  }

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

    if (this.isAutoCentered) {
      classes.push('hds-application-state--is-auto-centered');
    }

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
