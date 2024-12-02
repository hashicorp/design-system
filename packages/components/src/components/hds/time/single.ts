/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';
import type { DisplayType } from '../../../services/hds-time-types.ts';

export interface HdsTimeSingleSignature {
  Args: {
    date?: Date;
    displayInner: DisplayType;
    isoUtcString?: string;
    register: () => void;
    unregister: () => void;
  };
  Element: HTMLTimeElement;
}

const HdsTimeSingleComponent = templateOnlyComponent<HdsTimeSingleSignature>();

export default HdsTimeSingleComponent;
