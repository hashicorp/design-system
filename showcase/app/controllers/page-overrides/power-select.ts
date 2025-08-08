/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import type { PageOverridesPowerSelectModel } from 'showcase/routes/page-overrides/power-select';

export default class PageOverridesPowerSelectController extends Controller {
  declare model: PageOverridesPowerSelectModel;

  @action
  noop() {}
}
