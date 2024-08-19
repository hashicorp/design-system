/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

import type { ShwTextIndexComponentSignature } from './index';

export interface BodyComponentSignature {
  Args: {
    align?: ShwTextIndexComponentSignature['Args']['align'];
    weight?: ShwTextIndexComponentSignature['Args']['weight'];
    tag?: ShwTextIndexComponentSignature['Args']['tag'];
  };
  Blocks: {
    default: [];
  };
  Element: ShwTextIndexComponentSignature['Element'];
}

const BodyComponent = templateOnlyComponent<BodyComponentSignature>();

export default BodyComponent;
