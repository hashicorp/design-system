/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';

import type { PageComponentsToastModel } from 'showcase/routes/page-components/toast';

export default class PageComponentsToastController extends Controller {
  declare model: PageComponentsToastModel;

  @action
  noop() {}
}
