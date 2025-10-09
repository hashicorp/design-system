/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { Select } from 'ember-power-select/components/power-select';
import type { PageComponentsFormSuperSelectModel } from 'showcase/routes/page-components/form/super-select';

export default class PageComponentsFormSuperSelectController extends Controller {
  declare model: PageComponentsFormSuperSelectModel;

  @tracked basicModalActive = false;

  @action
  resultCountMessage(resultCount: number) {
    return `${resultCount} total`;
  }

  @action
  noop() {}

  @action
  handleKeydown(select: Select, e: KeyboardEvent): undefined {
    // console.log('handleKeyDown activated - ', e.key);
    if (e.key === 'Escape') {
      // console.log('ESCAPE KEY pressed');
      e.stopImmediatePropagation();
    }
  }

  @action
  activateModal(): void {
    this.basicModalActive = true;
  }

  @action
  deactivateModal(): void {
    this.basicModalActive = false;
  }
}
