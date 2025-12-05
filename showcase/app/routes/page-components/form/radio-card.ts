/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import type { ModelFrom } from 'showcase/utils/model-from-route';

export type PageComponentsFormRadioCardModel =
  ModelFrom<PageComponentsFormRadioCardRoute>;

export default class PageComponentsFormRadioCardRoute extends Route {}
