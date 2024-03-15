import { modifier } from 'ember-modifier';

// Notice: we use a function-based modifier here instead of a class-based one
// because it's quite simple in its logic, and doesn't require injecting services
// see: https://github.com/ember-modifier/ember-modifier#function-based-modifiers

// we don't use the standard `{{on 'event' myFunction}}` modifier because it's not possible to apply them conditionally
// see: https://github.com/emberjs/ember.js/issues/19869#issuecomment-1909118910
// see: https://github.com/emberjs/ember.js/pull/20629
export default modifier((element, positional) => {
  console.log(`registerEvent invoked for event ${positional[0]}`);
  // the "target" element the listeners are added to
  // notice: this is the element the Ember modifier is attached to
  const targetElement = element;
  // the event name and handler to apply to the element
  // notice: it's expressed as "positional" argument (array) for the modifier
  const [event, eventHandler] = positional;

  // IMPORTANT: don't set `useCapture` to `true` or it will be called more then one time (one for each child node in the bubbling tree)
  targetElement.addEventListener(event, eventHandler);

  // this (teardown) function is run when the element is removed from the DOM
  return () => {
    console.log(`registerEvent teardown for event ${positional[0]}`);
    targetElement.removeEventListener(event, eventHandler);
  };
});
