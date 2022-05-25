import Controller from '@ember/controller';
import { scheduleOnce } from '@ember/runloop';

function replaceMockStates() {
  document.querySelectorAll('[mock-state-value]').forEach((element) => {
    let targets;
    if (element.attributes['mock-state-selector']) {
      targets = element.querySelectorAll(
        element.attributes['mock-state-selector'].value
      );
    } else {
      targets = [element];
    }
    const states = element.attributes['mock-state-value'].value.split('+');
    const classes = states.map((state) => `mock-${state.trim()}`);
    targets.forEach((target) => {
      target.classList.add(...classes);
    });
  });
}
export default class ComponentsController extends Controller {
  constructor() {
    super(...arguments);
    scheduleOnce('afterRender', this, replaceMockStates);
  }
}
