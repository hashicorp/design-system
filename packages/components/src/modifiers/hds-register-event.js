import { modifier } from 'ember-modifier';

// Notice: we use a function-based modifier here instead of a class-based one
// because it's quite simple in its logic, and doesn't require injecting services
// see: https://github.com/ember-modifier/ember-modifier#function-based-modifiers

// this modifier is a "replacement" of the standard `{{on 'event' myFunction}}`
// it's needed because the {{on}} modifier can't be applied conditionally, apparently
// see: https://github.com/emberjs/ember.js/issues/19869#issuecomment-1909118910
// see: https://github.com/emberjs/ember.js/pull/20629
// see also: https://github.com/emberjs/ember.js/blob/main/packages/%40ember/-internals/glimmer/lib/modifiers/on.ts#L30
export default modifier((element, positional, named) => {
  // the "target" element the listeners are added to
  // notice: this is the element the Ember modifier is attached to
  const targetElement = element;
  // the event name and handler to apply to the element
  // notice: it's expressed as "positional" argument (array) for the modifier
  const [event, eventHandler] = positional;
  // the options for the `addEventListener()` method
  // see: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
  // notice: it's expressed as "named" argument (object) for the modifier
  const { useCapture = false } = named ?? {};

  targetElement.addEventListener(event, eventHandler, useCapture);

  // this (teardown) function is run when the element is removed from the DOM
  return () => {
    targetElement.removeEventListener(event, eventHandler, useCapture);
  };
});
