import { modifier } from 'ember-modifier';

// Notice: we use a function-based modifier here instead of a class-based one
// because it's quite simple in its logic, and doesn't require injecting services
// see: https://github.com/ember-modifier/ember-modifier#function-based-modifiers

export default modifier((element, named) => {
  console.log('registerFocusAndMouseEvents invoked');
  // the "target" element the listeners are added to
  // notice: this is the element the Ember modifier is attached to
  const targetElement = element;
  // the events handlers for the different kind of interactions
  // notice: it's expressed as "named" argument (object) for the modifier
  const { onMouseEnter, onMouseLeave, onFocusIn, onFocusOut } = named;

  // notice: don't set `useCapture` to `true` or it will be called more then one time (one for each child node in the bubbling tree)
  targetElement.addEventListener('mouseenter', onMouseEnter);
  targetElement.addEventListener('mouseleave', onMouseLeave);
  targetElement.addEventListener('focusin', onFocusIn);
  targetElement.addEventListener('focusout', onFocusOut);

  // this (teardown) function is run when the element is removed from the DOM
  return () => {
    console.log('registerFocusAndMouseEvents teardown');
    targetElement.removeEventListener('mouseenter', onMouseEnter);
    targetElement.removeEventListener('mouseleave', onMouseLeave);
    targetElement.removeEventListener('focusin', onFocusIn);
    targetElement.removeEventListener('focusout', onFocusOut);
  };
});
