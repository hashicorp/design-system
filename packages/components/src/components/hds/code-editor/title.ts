/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { HdsTextBodySignature } from '../text/body';

export interface HdsCodeEditorTitleSignature {
  Args: {
    tag?: HdsTextBodySignature['Args']['tag'];
  };
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

export default class HdsCodeEditorTitle extends Component<HdsCodeEditorTitleSignature> {
  get tag() {
    return this.args.tag ?? 'h2';
  }
}
