/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';
import type { DefaultDisplayType } from '../../../services/types.ts';

export interface HdsTimeSingleSignature {
  Args: {
    date: Date | undefined;
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

const HdsTimeSingleComponent = templateOnlyComponent<HdsTimeSingleSignature>();

export default HdsTimeSingleComponent;
