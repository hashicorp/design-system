import { modifier } from 'ember-modifier';
import { assert } from '@ember/debug';

import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  // this could be used in the future if we want to give consumers an option to hide the "floating" element when the "anchor" hides from the viewport
  // see: https://floating-ui.com/docs/hide
  // hide,
  offset,
  shift,
  // this could be used in the future if we want to give consumers an option to:
  // - let the "floating" element auto-resize when there is not enough space (usually vertical) in the viewport to contain the entire "floating" element
  // - let the "floating" element match the width of the "trigger" (it may have min/max width/heigh via CSS too)
  // see: https://floating-ui.com/docs/size
  // notice: below you can find a preliminary code implementation that was tested and worked relatively well
  // size,
} from '@floating-ui/dom';

export const DEFAULT_PLACEMENT = 'bottom';
export const PLACEMENTS = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
];

// we use this function to process all the options provided to the modifier in a single place,
// in relation to the Floating UI APIs, and keep the modifier code more clean/simple
export const getFloatingUIOptions = (options) => {
  let {
    placement = DEFAULT_PLACEMENT,
    strategy = 'absolute', // we don't need to use `fixed` if we use the Popover API for the "floating" element (it puts the element in the `top-layer`)
    offsetOptions,
    flipOptions = { padding: 8 },
    shiftOptions = { padding: 8 },
    middlewareExtra = [],
    enableCollisionDetection,
    arrowElement,
    arrowPadding = 8, // stop 8px from the edges of the "floating" element
  } = options;

  // we build dynamically the list of middleware functions to invoke, depending on the options provided

  const middleware = [];

  // https://floating-ui.com/docs/offset
  middleware.push(offset(offsetOptions));

  // https://floating-ui.com/docs/flip
  // https://floating-ui.com/docs/shift
  if (
    enableCollisionDetection === true ||
    enableCollisionDetection === 'flip'
  ) {
    middleware.push(flip(flipOptions));
  }
  if (
    (enableCollisionDetection === true) |
    (enableCollisionDetection === 'shift')
  ) {
    middleware.push(shift(shiftOptions));
  }

  // https://floating-ui.com/docs/arrow
  if (arrowElement) {
    middleware.push(
      arrow({
        element: arrowElement,
        padding: arrowPadding,
      })
    );
  }

  // TODO? commenting this for now, will need to make this conditional to some argument (and understand how this relates to the `@height` argument)
  // https://floating-ui.com/docs/size#match-reference-width
  // size({
  //   apply({ rects, elements }) {
  //     Object.assign(elements.floating.style, {
  //       width: `${rects.reference.width}px`,
  //     });
  //   },
  // });
  // size({
  //   apply: ({ availableWidth, availableHeight, middlewareData }) => {
  //     middlewareData.size = { availableWidth, availableHeight };
  //   },
  // }),

  middleware.push(...middlewareExtra);

  return {
    placement,
    strategy,
    middleware,
  };
};

// Notice: we use a function-based modifier here instead of a class-based one
// because it's quite simple in its logic, and doesn't require injecting services
// see: https://github.com/ember-modifier/ember-modifier#function-based-modifiers

export default modifier((element, positional, named = {}) => {
  // the element that "floats" next to the "anchor" (whose position is calculated in relation to the anchor)
  // notice: this is the element the Ember modifier is attached to
  const floatingElement = element;

  // the element that acts as an "anchor" for the "floating" element
  // it can be a DOM (string) selector or a DOM element
  // notice: it's expressed as "positional" argument (array of arguments) for the modifier
  const _anchorTarget = positional[0];
  const anchorElement =
    typeof _anchorTarget === 'string'
      ? document.querySelector(_anchorTarget)
      : _anchorTarget;

  assert(
    '`hds-anchored-position` modifier - the provided "anchoring" element is not defined correctly',
    anchorElement instanceof HTMLElement || anchorElement instanceof SVGElement
  );

  // the "arrow" element (optional) associated with the "floating" element
  // it can be a DOM selector (string) or a DOM element
  // notice: for convenience it's declared inside the "named" argument (object) for the modifier but we extract it to its own variable
  const _arrowTarget = named?.arrow;
  const arrowElement =
    typeof _arrowTarget === 'string'
      ? document.querySelector(_arrowTarget)
      : _arrowTarget;

  assert(
    '`hds-anchored-position` modifier - the provided "arrow" element is not defined correctly',
    arrowElement === undefined ||
      arrowElement instanceof HTMLElement ||
      arrowElement instanceof SVGElement
  );

  // the Floating UI "options" to apply to the "floating" element
  // notice: it's expressed as "named" argument (object) for the modifier
  const floatingOptions = getFloatingUIOptions({ ...named, arrowElement });

  const computeFloatingPosition = async () => {
    // important to know: `computePosition()` is not stateful, it only positions the "floating" element once
    // see: https://floating-ui.com/docs/computePosition
    const state = await computePosition(
      anchorElement,
      floatingElement,
      floatingOptions
    );

    let { x, y, placement, strategy, middlewareData } = state;

    Object.assign(floatingElement.style, {
      position: strategy,
      top: `${y}px`,
      left: `${x}px`,
      // TODO? commenting this for now, will need to make this conditional to some argument (and understand how this relates to the `@height` argument)
      // maxHeight: `${middlewareData.size.availableHeight - 10}px`,
    });

    if (arrowElement && middlewareData.arrow) {
      // we assign a "data" attribute to the "arrow" element so we can use CSS (in the consuming components) to position/rotate it accordingly and we avoid calculating at runtime values that technically we already know
      // (similar to what Tippy.js does: https://github.com/atomiks/tippyjs/blob/master/src/scss/svg-arrow.scss)
      // IMPORTANT: floating-ui assumes the "arrow" container is square!
      arrowElement.setAttribute('data-hds-anchored-arrow-placement', placement);

      // we set `x` or `y` value (depends on the position of the arrow in relation to the "floating" element placement)
      // see: https://floating-ui.com/docs/arrow#usage
      Object.assign(arrowElement.style, {
        left:
          middlewareData.arrow.x != null ? `${middlewareData.arrow.x}px` : '',
        top:
          middlewareData.arrow.y != null ? `${middlewareData.arrow.y}px` : '',
      });
    }
  };

  // the `autoUpdate` function automatically updates the position of the floating element when necessary.
  // it should only be called when the floating element is mounted on the DOM or visible on the screen.
  // it returns a "cleanup" function that should be invoked when the floating element is removed from the DOM or hidden from the screen.
  // see: https://floating-ui.com/docs/autoUpdate
  const cleanupFloatingUI = autoUpdate(
    anchorElement,
    floatingElement,
    computeFloatingPosition
  );

  // this (teardown) function is run when the element is removed from the DOM
  return () => {
    cleanupFloatingUI();
  };
});
