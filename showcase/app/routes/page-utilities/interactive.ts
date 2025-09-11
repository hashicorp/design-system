/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageUtilitiesInteractiveModel =
  ModelFrom<PageUtilitiesInteractiveRoute>;

export default class PageUtilitiesInteractiveRoute extends Route {}
