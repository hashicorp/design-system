/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { pageTitle } from 'ember-page-title';
import { service } from '@ember/service';
import { registerDestructor } from '@ember/destroyable';
import type Owner from '@ember/owner';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionDemo from 'showcase/components/page-internationalization/translation/sub-sections/demo';
import SubSectionHelpersServices from 'showcase/components/page-internationalization/translation/sub-sections/helpers-services';
import SubSectionOverride from 'showcase/components/page-internationalization/translation/sub-sections/override';

import type { IntlService } from 'ember-intl';

export default class TranslationIndex extends Component {
  @service declare readonly intl: IntlService;

  @tracked lang: string | undefined = undefined;
  _localeOnEntry: string | undefined = undefined;

  constructor(owner: Owner, args: Record<string, never>) {
    super(owner, args);

    // store the locale on entry so we can restore it on exit
    this._localeOnEntry = this.intl.primaryLocale;
    this.lang = this._localeOnEntry;

    registerDestructor(this, (): void => {
      if (this._localeOnEntry) {
        // reset the locale to the one we had on entry
        this.intl.setLocale(this._localeOnEntry);
      }
    });
  }

  onLangChange = (event: Event) => {
    const { value } = event.target as HTMLInputElement;

    this.lang = value;

    try {
      this.intl.setLocale(this.lang);
    } catch {
      console.error(
        `No locale found for the provided language code. Using fallback translation.`,
      );
    }
  };

  <template>
    {{pageTitle "Translation"}}

    <ShwTextH1>Translation</ShwTextH1>

    <section data-test-percy>
      <SubSectionDemo @lang={{this.lang}} @onLangChange={{this.onLangChange}} />
      <SubSectionHelpersServices @lang={{this.lang}} />
      <SubSectionOverride />
    </section>
  </template>
}
