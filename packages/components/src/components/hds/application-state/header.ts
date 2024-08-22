/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { HdsApplicationStateTitleTagValues } from './types.ts';

import type { HdsIconSignature } from '../icon';
import type { HdsApplicationStateTitleTags } from './types';
export interface HdsApplicationStateHeaderSignature {
  Args: {
    title?: string;
    titleTag?: HdsApplicationStateTitleTags;
    errorCode?: string;
    icon?: HdsIconSignature['Args']['name'];
  };
  Element: HTMLDivElement;
}

export default class HdsApplicationStateHeaderComponent extends Component<HdsApplicationStateHeaderSignature> {
  get titleTag(): HdsApplicationStateTitleTags {
    return this.args.titleTag ?? HdsApplicationStateTitleTagValues.Div;
  }
}
