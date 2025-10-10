/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { SIZES as TOGGLE_SIZES } from '@hashicorp/design-system-components/components/hds/rich-tooltip/toggle';
import {
  PLACEMENTS,
  ENABLE_COLLISION_DETECTION_OPTIONS,
} from '@hashicorp/design-system-components/modifiers/hds-anchored-position';
import type { HdsBadgeColors } from '@hashicorp/design-system-components/components/hds/badge/types';
import type { HdsIconSignature } from '@hashicorp/design-system-components/components/hds/icon/index';

import type { ModelFrom } from 'showcase/utils/model-from-route';

export type PageComponentsRichTooltipModel =
  ModelFrom<PageComponentsRichTooltipRoute>;

type TextAlignOptions = 'left' | 'center' | 'right';

interface DEMO_TABLE_DATA_ITEM {
  id: number;
  'peer-name': string;
  'cluster-partition': string;
  'cluster-icon': HdsIconSignature['Args']['name'];
  status: {
    text: string;
    color: HdsBadgeColors;
    icon: HdsIconSignature['Args']['name'];
  };
  tagsCount: number;
}

export default class PageComponentsRichTooltipRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];

    const DEMO_TABLE_DATA: DEMO_TABLE_DATA_ITEM[] = [
      {
        id: 1,
        'peer-name': 'cluster-2-partition-2',
        'cluster-partition': 'cluster-2 / partition-2',
        'cluster-icon': 'boundary-color',
        status: { text: 'pending', color: 'neutral', icon: 'loading' },
        tagsCount: 12,
      },
      {
        id: 2,
        'peer-name': 'cluster-3-partition-3',
        'cluster-partition': 'cluster-3 / partition-3',
        'cluster-icon': 'terraform-color',
        status: { text: 'establishing', color: 'highlight', icon: 'loading' },
        tagsCount: 58,
      },
      {
        id: 3,
        'peer-name': 'cluster-4-partition-4',
        'cluster-partition': 'cluster-4 / partition-4',
        'cluster-icon': 'nomad-color',
        status: { text: 'failed', color: 'critical', icon: 'x' },
        tagsCount: 23,
      },
      {
        id: 4,
        'peer-name': 'cluster-5-partition-5',
        'cluster-partition': 'cluster-5 / partition-5',
        'cluster-icon': 'waypoint-color',
        status: { text: 'active', color: 'success', icon: 'check' },
        tagsCount: 105,
      },
    ];

    const TEXT_ALIGNMENTS: TextAlignOptions[] = ['left', 'center', 'right'];

    return {
      PLACEMENTS,
      STATES,
      DEMO_TABLE_DATA,
      TOGGLE_SIZES,
      ENABLE_COLLISION_DETECTION_OPTIONS,
      TEXT_ALIGNMENTS,
    };
  }
}
