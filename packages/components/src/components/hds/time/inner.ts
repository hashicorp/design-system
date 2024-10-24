/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsTimeInnerSignature {
  Args: {
    isValid: boolean;
    date: unknown;
    displayInner: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options: any;
      difference: { absValueInMs: number; valueInMs: number };
      relative: { value: number; unit: string };
    };
    isoUtcString: string;
  };
  Element: HTMLTimeElement;
}

const HdsTimeInnerComponent = templateOnlyComponent<HdsTimeInnerSignature>();

export default HdsTimeInnerComponent;
