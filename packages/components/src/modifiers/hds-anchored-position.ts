/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { modifier } from 'ember-modifier';
import { assert } from '@ember/debug';

import {
  autoUpdate,
  computePosition,
  offset,
  flip,
  shift,
  limitShift,
  autoPlacement,
  arrow,
  // ---
  // this could be used in the future if we want to give consumers an option to hide the "floating" element when the "anchor" hides from the viewport
  // see: https://floating-ui.com/docs/hide
  // hide,
  // ---
  size,
} from '@floating-ui/dom';

import type {
  Placement,
  Strategy,
  OffsetOptions,
  FlipOptions,
  ShiftOptions,
  AutoPlacementOptions,
  ArrowOptions,
  Middleware,
} from '@floating-ui/dom';

export const DEFAULT_PLACEMENT = 'bottom';
export const PLACEMENTS: Placement[] = [
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

// share the same default value of "padding" for `flip/shift/autoPlacement` options
// this refers to the minimum distance from the boundaries' edges (the viewport)
// before the floating element changes its position (flips, shifts, or autoplace itself)
const DEFAULT_EDGE_DISTANCE = 8;

export type FloatingUIOptions = {
  placement?: Placement;
  strategy?: Strategy;
  offsetOptions?: OffsetOptions;
  flipOptions?: FlipOptions;
  shiftOptions?: ShiftOptions;
  autoPlacementOptions?: AutoPlacementOptions;
  middlewareExtra?: Middleware[];
  enableCollisionDetection?: boolean | 'shift' | 'flip' | 'auto';
  arrowElement?: ArrowOptions['element'];
  arrowPadding?: ArrowOptions['padding'];
  matchToggleWidth?: boolean;
};

// we use this function to process all the options provided to the modifier in a single place,
// in relation to the Floating UI APIs, and keep the modifier code more clean/simple
export const getFloatingUIOptions = (
  options: FloatingUIOptions
): {
  placement: Placement;
  strategy: Strategy;
  middleware: Middleware[];
} => {
  const {
    placement = DEFAULT_PLACEMENT,
    strategy = 'absolute', // we don't need to use `fixed` if we use the Popover API for the "floating" element (it puts the element in the `top-layer`)
    offsetOptions,
    flipOptions = { padding: DEFAULT_EDGE_DISTANCE },
    shiftOptions = { padding: DEFAULT_EDGE_DISTANCE, limiter: limitShift() },
    autoPlacementOptions = { padding: DEFAULT_EDGE_DISTANCE },
    middlewareExtra = [],
    enableCollisionDetection,
    arrowElement,
    arrowPadding,
    matchToggleWidth,
  } = options;

  // we build dynamically the list of middleware functions to invoke, depending on the options provided

  const middleware = [];

  // https://floating-ui.com/docs/offset
  middleware.push(offset(offsetOptions));

  // https://floating-ui.com/docs/flip
  // https://floating-ui.com/docs/shift
  // https://floating-ui.com/docs/autoPlacement
  if (
    enableCollisionDetection === true ||
    enableCollisionDetection === 'flip'
  ) {
    middleware.push(flip(flipOptions));
  }
  if (
    enableCollisionDetection === true ||
    enableCollisionDetection === 'shift'
  ) {
    middleware.push(shift(shiftOptions));
  }
  if (enableCollisionDetection === 'auto') {
    middleware.push(autoPlacement(autoPlacementOptions));
  }

  // https://floating-ui.com/docs/arrow
  if (arrowElement) {
    middleware.push(
      arrow({
        element: arrowElement,
        padding: arrowPadding ?? 0,
      })
    );
  }

  // https://floating-ui.com/docs/size#match-reference-width
  if (matchToggleWidth) {
    middleware.push(
      size({
        apply({ rects, elements }) {
          // wrap Object.assign inside a requestAnimationFrame to avoid ResizeObserver loop limit exceeded error
          // https://github.com/floating-ui/floating-ui/issues/1740
          requestAnimationFrame(() => {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          });
        },
      })
    );
  }

  middleware.push(...middlewareExtra);

  return {
    placement,
    strategy,
    middleware,
  };
};

export interface HdsAnchoredPositionSignature {
  Element: HTMLElement;
  Args: {
    Positional: [HTMLElement | SVGElement];
    Named: FloatingUIOptions & { arrowSelector?: string };
  };
}

// Notice: we use a function-based modifier here instead of a class-based one
// because it's quite simple in its logic, and doesn't require injecting services
// see: https://github.com/ember-modifier/ember-modifier#function-based-modifiers

export default modifier<HdsAnchoredPositionSignature>(
  (element, positional, named = {}) => {
    // the element that "floats" next to the "anchor" (whose position is calculated in relation to the anchor)
    // notice: this is the element the Ember modifier is attached to
    const _floatingElement = element;

    // the element that acts as an "anchor" for the "floating" element
    // it can be a DOM (string) selector or a DOM element
    // notice: it's expressed as "positional" argument (array of arguments) for the modifier
    const _anchorTarget = positional[0];
    const _anchorElement =
      typeof _anchorTarget === 'string'
        ? document.querySelector(_anchorTarget)
        : _anchorTarget;

    assert(
      '`hds-anchored-position` modifier - the provided "anchoring" element is not defined correctly',
      _anchorElement instanceof HTMLElement ||
        _anchorElement instanceof SVGElement
    );

    // the "arrow" element (optional) associated with the "floating" element
    // it can be a DOM selector (string) or a DOM element
    // notice: it's declared inside the "named" argument (object) for the modifier
    // but we need to extract it also here so it can be used to assign inline styles to it
    let arrowElement: HTMLElement | SVGElement | undefined;

    if (named.arrowElement) {
      assert(
        '`hds-anchored-position` modifier - the `element` provided for the "arrow" element is not a valid DOM node',
        named.arrowElement instanceof HTMLElement ||
          named.arrowElement instanceof SVGElement
      );

      arrowElement = named.arrowElement;
    } else if (named.arrowSelector) {
      assert(
        '`hds-anchored-position` modifier - the `selector` provided for the "arrow" element must be a string',
        typeof named.arrowSelector === 'string'
      );

      const selectedArrowElement = document.querySelector(named.arrowSelector);
      if (selectedArrowElement instanceof HTMLElement) {
        arrowElement = selectedArrowElement;
      } else {
        assert(
          '`hds-anchored-position` modifier - the `selector` provided for the "arrow" element is not a valid DOM selector'
        );
      }
    }

    // the Floating UI "options" to apply to the "floating" element
    // notice: we spread the `named` argument and override its `arrowElement` value instead of setting it directly because Ember complains that modifier's arguments must be immutable
    const floatingOptions = getFloatingUIOptions({ ...named, arrowElement });

    const computeFloatingPosition = async () => {
      // important to know: `computePosition()` is not stateful, it only positions the "floating" element once
      // see: https://floating-ui.com/docs/computePosition
      const state = await computePosition(
        _anchorElement,
        _floatingElement,
        floatingOptions
      );

      const { x, y, placement, strategy, middlewareData } = state;

      Object.assign(_floatingElement.style, {
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
        arrowElement.setAttribute(
          'data-hds-anchored-arrow-placement',
          placement
        );

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
      _anchorElement,
      _floatingElement,
      computeFloatingPosition
    );

    // this (teardown) function is run when the element is removed from the DOM
    return (): void => {
      cleanupFloatingUI();
    };
  }
);
