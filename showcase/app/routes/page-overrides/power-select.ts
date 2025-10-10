/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import type { ModelFrom } from 'showcase/utils/model-from-route';

export type PageOverridesPowerSelectModel =
  ModelFrom<PageOverridesPowerSelectRoute>;

export default class PageOverridesPowerSelectRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const OPTIONS: string[] = [
      'Oregon (us-west-2)',
      'N. Virginia (us-east-1)',
      'Ireland (eu-west-1)',
      'London (eu-west-2)',
      'Frankfurt (eu-central-1)',
    ];
    const SELECTED: string[] = ['Oregon (us-west-2)'];
    const SELECTEDMULTIPLE: string[] = [
      'Oregon (us-west-2)',
      'N. Virginia (us-east-1)',
      'Ireland (eu-west-1)',
    ];
    return { OPTIONS, SELECTED, SELECTEDMULTIPLE };
  }
}
