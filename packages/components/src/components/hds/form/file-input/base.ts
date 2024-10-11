/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

export interface HdsFormFileInputBaseSignature {
  Element: HTMLInputElement;
}

const HdsFormFileInputBase =
  templateOnlyComponent<HdsFormFileInputBaseSignature>();

export default HdsFormFileInputBase;
