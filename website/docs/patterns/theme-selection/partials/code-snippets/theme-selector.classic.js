import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
// import { action } from '@ember/object';
// import { service } from '@ember/service';
// import { registerDestructor } from '@ember/destroyable';

export default class LocalComponent extends Component {
  @tracked selectedTheme = 'system';
  // @service intl;

  // @tracked selectedLanguage;
  // _localeOnEntry;

  // constructor(owner, args) {
  //   super(owner, args);

  //   // store the locale on entry so we can restore it on exit
  //   this._localeOnEntry = this.intl.primaryLocale;
  //   this.selectedLanguage = this._localeOnEntry;

  //   registerDestructor(this, () => {
  //     if (this._localeOnEntry) {
  //       // reset the locale to the one we had on entry
  //       this.intl.setLocale(this._localeOnEntry);
  //     }
  //   });
  // }

  // @action
  // selectLanguage(language, close, event) {
  //   this.selectedLanguage = language;
  //   try {
  //     this.intl.setLocale(language);
  //   } catch {
  //     console.error(
  //       'No locale found for the provided language code. Using fallback translation.'
  //     );
  //   }
  //   close(event);
  // }
}
