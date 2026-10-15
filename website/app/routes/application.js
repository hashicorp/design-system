import Route from '@ember/routing/route';
import fetch from 'fetch';
import { service } from '@ember/service';
import { action } from '@ember/object';

import config from 'website/config/environment';

export default class ApplicationRoute extends Route {
  @service intl;

  beforeModel() {
    // needed to set the initial locale for the language selection live demo. Without this, the service isn't correctly initialized and the demos do not work.
    this.intl.setLocale(['en-us']);
  }

  model() {
    // TODO add fetch error handling similar to `website/app/routes/show.js`
    // potentially we may even want to abstract it away in a shared "util" file/method
    return fetch(`${config.rootURL}toc.json`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // we group the TOC under a specific "key", instead of spreading the content all over the model
        return { toc: res };
      });
  }

  @action
  willTransition(transition) {
    const fromPath = transition.from?.params?.path;
    const toPath = transition.to?.params?.path;

    if (
      fromPath?.startsWith('patterns/language-selection') &&
      !toPath?.startsWith('patterns/language-selection')
    ) {
      this.intl.setLocale(['en-us']);
    }
  }
}
