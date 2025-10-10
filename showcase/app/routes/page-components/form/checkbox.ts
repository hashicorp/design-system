/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import type { ModelFrom } from 'showcase/utils/model-from-route';

export type PageComponentsFormCheckboxModel =
  ModelFrom<PageComponentsFormCheckboxRoute>;

export default class PageComponentsFormCheckboxRoute extends Route {}
