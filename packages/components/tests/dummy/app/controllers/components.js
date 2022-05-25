import Controller from '@ember/controller';
import { scheduleOnce } from '@ember/runloop';

function replaceDummyStates() {
  document.querySelectorAll('[mock-state-value]').forEach(function (element) {
    let target;
    if (element.attributes['mock-state-selector']) {
      target = element.querySelector(
        element.attributes['mock-state-selector'].value
      );
    } else {
      target = element;
    }
    const state = element.attributes['mock-state-value'].value;
    target.classList.add(`mock-${state}`);
  });
}

export default class ComponentsController extends Controller {
  constructor() {
    super(...arguments);
    scheduleOnce('afterRender', this, replaceDummyStates);
  }
}
