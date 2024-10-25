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
      options:
        | {
            displayFormat: {
              month: string;
              day: string;
              year: string;
              hour?: string;
              minute?: string;
              second?: string;
            } | null;
            showFriendly: boolean;
            showRelative: boolean;
            tooltipFormat: {
              month: string;
              day: string;
              year: string;
              hour: string;
              minute: string;
              second?: string;
            } | null;
          }
        | undefined;
      difference: { absValueInMs: number; valueInMs: number };
      relative: { value: number; unit: string };
    };
    isoUtcString: string;
  };
  Element: HTMLTimeElement;
}

const HdsTimeInnerComponent = templateOnlyComponent<HdsTimeInnerSignature>();

export default HdsTimeInnerComponent;
