import Route from '@ember/routing/route';

// Notice: this will later be imported directly from the component
// This list comes from Structure, and is the list of official HTML supported types for the <input> element (see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
// We will likely review what we're supporting for HDS
const TYPES = [
  'button',
  'checkbox',
  'color',
  'date',
  'datetime-local', // added as replacement for "datetime"
  // 'datetime', // this is obsolete: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
  'email',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week',
];

export default class ComponentsFormTextInputRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];
    return {
      TYPES,
      STATES,
    };
  }
}
