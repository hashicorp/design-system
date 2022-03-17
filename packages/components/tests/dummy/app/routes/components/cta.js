import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ComponentsCtaRoute extends Route {
  @tracked isAction = false;

  @action
  mySpecialAction() {
    this.isAction = !this.isAction;
    console.log(`isAction is ${this.isAction}`);
  }
}
