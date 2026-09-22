import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { eq } from 'ember-truth-helpers';
import { t } from 'ember-intl';
import { service } from '@ember/service';
import { registerDestructor } from '@ember/destroyable';

import type { IntlService } from 'ember-intl';
import type Owner from '@ember/owner';

import {
  HdsAppHeader,
  HdsDropdown,
} from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

type LanguageOption = 'en-us' | 'es-es';

export default class LocalComponent extends Component {
  @service declare readonly intl: IntlService;

  @tracked selectedLanguage: IntlService['primaryLocale'] = undefined;
  _localeOnEntry: IntlService['primaryLocale'] = undefined;

  constructor(owner: Owner, args: Record<string, never>) {
    super(owner, args);

    // store the locale on entry so we can restore it on exit
    this._localeOnEntry = this.intl.primaryLocale;
    this.selectedLanguage = this._localeOnEntry;

    registerDestructor(this, (): void => {
      if (this._localeOnEntry) {
        // reset the locale to the one we had on entry
        this.intl.setLocale(this._localeOnEntry);
      }
    });
  }

  selectLanguage = (
    language: LanguageOption,
    close: (event?: Event) => void,
    event?: Event,
  ) => {
    this.selectedLanguage = language;
    try {
      this.intl.setLocale(language);
    } catch {
      console.error(
        `No locale found for the provided language code. Using fallback translation.`,
      );
    }
    close(event);
  };

  <template>
    {{! for demo purposes, we set @hasA11yRefocus to false but in your app it will probably need to be set to true (or omitted to rely on defaults) }}
    <HdsAppHeader @hasA11yRefocus={{false}}>
      <:logo>
        <DocPlaceholder
          @height="2em"
          @width="auto"
          @text="HomeLink"
          @background="#e4e4e4"
        />
      </:logo>

      <:globalActions>
        <DocPlaceholder
          @height="2em"
          @width="auto"
          @text="OrgSwitcher"
          @background="#e4e4e4"
        />
      </:globalActions>

      <:utilityActions>
        <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
          <dd.ToggleIcon
            @icon="globe"
            @text={{t "website.pages.patterns.language-selection.trigger-text"}}
          />
          <dd.Checkmark
            @selected={{eq this.selectedLanguage "en-us"}}
            {{on "click" (fn this.selectLanguage "en-us" dd.close)}}
          >{{t
              "website.pages.patterns.language-selection.english-option"
            }}</dd.Checkmark>
          <dd.Checkmark
            @selected={{eq this.selectedLanguage "es-es"}}
            {{on "click" (fn this.selectLanguage "es-es" dd.close)}}
          >{{t
              "website.pages.patterns.language-selection.spanish-option"
            }}</dd.Checkmark>
        </HdsDropdown>

        <DocPlaceholder
          @height="2em"
          @width="auto"
          @text="HelpMenu"
          @background="#e4e4e4"
        />
        <DocPlaceholder
          @height="2em"
          @width="auto"
          @text="UserMenu"
          @background="#e4e4e4"
        />
      </:utilityActions>
    </HdsAppHeader>
  </template>
}
