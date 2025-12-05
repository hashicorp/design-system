/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';
import type { HdsTextDisplaySignature } from '../text/display';

export interface HdsPageHeaderTitleSignature {
  Args: HdsTextDisplaySignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HdsTextDisplaySignature['Element'];
}

const HdsPageHeaderTitle = TemplateOnlyComponent<HdsPageHeaderTitleSignature>();

export default HdsPageHeaderTitle;
