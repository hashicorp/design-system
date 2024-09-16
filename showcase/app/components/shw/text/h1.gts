/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import ShwText from './index';
import type { ShwTextSignature } from './index';

export interface ShwTextH1Signature {
  Args: {
    align?: ShwTextSignature['Args']['align'];
    weight?: ShwTextSignature['Args']['weight'];
    tag?: ShwTextSignature['Args']['tag'];
  };
  Blocks: {
    default: [];
  };
  Element: ShwTextSignature['Element'];
}

export default class ShwTextH1 extends Component<ShwTextH1Signature> {
  <template>
    <ShwText
      @variant="h1"
      @align={{@align}}
      @weight={{@weight}}
      @tag={{@tag}}
      ...attributes
    >{{yield}}</ShwText>
  </template>
}
