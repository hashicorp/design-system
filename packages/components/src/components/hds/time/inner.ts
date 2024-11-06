/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';
import type { DefaultDisplayType } from './types.ts';

export interface HdsTimeInnerSignature {
  Args: {
    isValidDate: boolean;
    isValidDateRange: boolean;
    date?: Date;
    startDate?: Date;
    endDate?: Date;
    displayInner: {
      options: DefaultDisplayType | undefined;
      difference: { absValueInMs: number; valueInMs: number };
      relative: { value: number; unit: string };
    };
    isoUtcStringInner: string;
    register: () => void;
    unregister: () => void;
  };
  Element: HTMLTimeElement;
}

const HdsTimeInnerComponent = templateOnlyComponent<HdsTimeInnerSignature>();

export default HdsTimeInnerComponent;
