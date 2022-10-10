import Controller from '@ember/controller';
import { defaultValidator } from 'ember-a11y-refocus';

export default class ApplicationController extends Controller {
  // https://github.com/ember-a11y/ember-a11y-refocus#customizing-the-definition-of-a-route-change
  transitionValidator(transition) {
    if (transition.to.queryParams) {
      console.log('transition to queryParams...should not reset focus');
      return false;
    } else {
      console.log(`second one: ${transition.to.queryParams}`);
      return defaultValidator(transition);
    }
  }
}
