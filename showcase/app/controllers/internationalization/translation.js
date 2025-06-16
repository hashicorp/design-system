/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class InternationalizationTranslationController extends Controller {
  queryParams = ['lang'];

  @tracked lang = 'en';

  @action
  setLang(event) {
    event.preventDefault();
    const { value } = event.target;
    this.lang = value;
  }

  get langDetails() {
    return {
      en: { label: 'English', text: 'This text is displayed in English' },
      es: { label: 'Spanish', text: 'This text is displayed in Spanish' },
      fr: { label: 'French', text: 'This text is displayed in French' },
    }[this.lang];
  }
}
