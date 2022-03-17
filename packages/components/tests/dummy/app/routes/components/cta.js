import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ComponentsCtaRoute extends Route {
  @action
  mySpecialAction() {
    let mSA = 'my special action';
    console.log(`${mSA}`);
  }
}
