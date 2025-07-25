/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';

import type { PageComponentsFormSuperSelectModel } from 'showcase/routes/page-components/form/super-select';

export default class PageComponentsFormSuperSelectController extends Controller {
  declare model: PageComponentsFormSuperSelectModel;

  @action
  resultCountMessage(resultCount: number) {
    return `${resultCount} total`;
  }

  @action
  noop() {}
}
