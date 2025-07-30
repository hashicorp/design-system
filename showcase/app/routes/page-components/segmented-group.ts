/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsSegmentedGroupModel =
  ModelFrom<PageComponentsSegmentedGroupRoute>;

export default class PageComponentsSegmentedGroupRoute extends Route {}
