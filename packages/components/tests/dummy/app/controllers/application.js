import Controller from '@ember/controller';
import { defaultValidator } from 'ember-a11y-refocus';

export default class ApplicationController extends Controller {
  transitionValidator(transition) {
    console.log(
      `ember-a11y-refocus transitionValidator - transitioned from ${transition.from.name} to ${transition.to.name}`,
      transition
    );
    if (transition.from.name === transition.to.name) {
      return false;
    } else {
      return defaultValidator(transition);
    }
  }
}
