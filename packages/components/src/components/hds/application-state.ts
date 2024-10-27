/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsApplicationStateAlignValues } from './application-state/types.ts';

import type { ComponentLike } from '@glint/template';
import type { HdsApplicationStateAligns } from './application-state/types.ts';
import type { HdsApplicationStateMediaSignature } from './application-state/media.ts';
import type { HdsApplicationStateHeaderSignature } from './application-state/header.ts';
import type { HdsApplicationStateBodySignature } from './application-state/body.ts';
import type { HdsApplicationStateFooterSignature } from './application-state/footer.ts';

export const ALIGNS: string[] = Object.values(HdsApplicationStateAlignValues);
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
}
