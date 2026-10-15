import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class LocalComponent extends Component {
  @service intl;

  @tracked selectedLanguage;

  constructor(owner, args) {
    super(owner, args);
    this.selectedLanguage = this.intl.primaryLocale;
  }

  @action
  selectLanguage(language, close, event) {
    this.selectedLanguage = language;
    try {
      this.intl.setLocale(language);
    } catch {
      console.error(
        'No locale found for the provided language code. Using fallback translation.'
      );
    }
    close(event);
  }
}
