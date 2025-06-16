/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class InternationalizationTranslationController extends Controller {
  @service intl;

  @tracked lang = null;

  @action
  setLang(event) {
    event.preventDefault();
    const { value } = event.target;
    this.lang = value;

    try {
      this.intl.setLocale(value);
    } catch {
      // will throw an error if the locale is unset
    }
  }
}
