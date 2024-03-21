import { modifier } from 'ember-modifier';

import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  // this could be used in the future if we want to give consumers an option to hide the popover when the "trigger" hides from the viewport
  // see: https://floating-ui.com/docs/hide
  // hide,
  offset,
  shift,
  // this could be used in the future if we want to give consumers an option to:
  // - let the "popover" auto-resize when there is not enough space (usually vertical) in the viewport to contain the entire popover
  // - let the "popover" match the width of the "trigger" (it may have min/max width/heigh via CSS too)
  // see: https://floating-ui.com/docs/size
  // notice: below you can find a preliminary code implementation that was tested and worked relatively well
  // size,
} from '@floating-ui/dom';

// we use this function to process all the options provided to the modifier in a single place,
// in relation to the Floating UI APIs, and keep the modifier code more clean/simple
function getFloatingUIOptions(popoverOptions) {
  let {
    popoverPlacement = 'bottom',
    popoverPositionStrategy = 'absolute', // we don't need to use `fixed` if we use the Popover API (it puts the element in the `top-layer`)
    popoverOffsetOptions,
    popoverEnableCollisionDetection,
    popoverFlipOptions = { padding: 8 },
    popoverShiftOptions = { padding: 8 },
    popoverArrow,
    popoverMiddlewareExtra = [],
  } = popoverOptions;

  // we build dynamically the list of middleware functions to invoke, depending on the options provided

  const popoverMiddleware = [];

  // https://floating-ui.com/docs/offset
  popoverMiddleware.push(offset(popoverOffsetOptions));

  // TODO? split the option in two to support collision detection only in one direction like for the power-select?
  if (popoverEnableCollisionDetection) {
    popoverMiddleware.push(
      // https://floating-ui.com/docs/flip
      flip(popoverFlipOptions),
      // https://floating-ui.com/docs/shift
      shift(popoverShiftOptions)
    );
  }

  if (popoverArrow) {
    popoverMiddleware.push(
      // https://floating-ui.com/docs/arrow
      arrow({
        element: popoverArrow,
        padding: 8, // stop 8px from the edges of the "bubble" element
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

  popoverMiddleware.push(...popoverMiddlewareExtra);

  return {
    placement: popoverPlacement,
    strategy: popoverPositionStrategy,
    middleware: popoverMiddleware,
  };
}

// Notice: we use a function-based modifier here instead of a class-based one
// because it's quite simple in its logic, and doesn't require injecting services
// see: https://github.com/ember-modifier/ember-modifier#function-based-modifiers

export default modifier((element, positional, named) => {
  // the "popover" element that "floats" next to the anchor (whose position is calculated in relation to the anchor)
  // notice: this is the element the Ember modifier is attached to
  const popoverElement = element;
  // the "toggle" element that acts as an "anchor" for the "floating" element
  // notice: it's expressed as "positional" argument (array of arguments) for the modifier
  const toggleElement = positional[0];
  // the "arrow" element (optional)
  const arrowElement = named?.popoverOptions?.popoverArrow;
  // the Floating UI "options" to apply to the popover
  // notice: it's expressed as "named" argument (object) for the modifier
  const popoverOptions = getFloatingUIOptions(named.popoverOptions ?? {});

  const computePopoverPosition = async () => {
    // important to know: `computePosition()` is not stateful, it only positions the "floating" element once
    // see: https://floating-ui.com/docs/computePosition
    const state = await computePosition(
      toggleElement,
      popoverElement,
      popoverOptions
    );

    let { x, y, placement, strategy, middlewareData } = state;

    Object.assign(popoverElement.style, {
      position: strategy,
      top: `${y}px`,
      left: `${x}px`,
      // TODO? commenting this for now, will need to make this conditional to some argument (and understand how this relates to the `@height` argument)
      // maxHeight: `${middlewareData.size.availableHeight - 10}px`,
    });

    if (arrowElement && middlewareData.arrow) {
      // to avoid calculating at runtime values that we already know
      // we assign a "data" attribute to the "arrow" element
      // and use CSS to position/rotate it accordingly
      // (similar to what Tippy.js does: https://github.com/atomiks/tippyjs/blob/master/src/scss/svg-arrow.scss)
      // IMPORTANT: floating-ui assumes the "arrow" container is square!
      arrowElement.setAttribute('data-hds-popover-placement', placement);

      // we set `x` or `y` value (depends on the position of the arrow in relation to the popover placement)
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
    toggleElement,
    popoverElement,
    computePopoverPosition
  );

  // this (teardown) function is run when the element is removed from the DOM
  return () => {
    cleanupFloatingUI();
  };
});
