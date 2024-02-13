// stripped down version of the `ember-velcro` modifier:
// code: https://github.com/CrowdStrike/ember-velcro/blob/main/ember-velcro/src/modifiers/velcro.ts
// repo: https://github.com/CrowdStrike/ember-velcro

import Modifier from 'ember-modifier';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';

import {
  autoUpdate,
  computePosition,
  flip,
  hide,
  offset,
  shift,
} from '@floating-ui/dom';

export default class HdsFloatElementModifier extends Modifier {
  didSetup = false;
  // isDialogOpen = false;
  // isDialogForcedOpen = false;

  modify(
    // the element that "floats" next to the anchor (whose position is calculated in relation to the anchor)
    // notice: this is the element the Ember modifier is attached to
    floatingElement,
    // the element that acts as an "anchor" for the "floating" element
    // notice: it's expressed as argument for modifier and it can be a DOM node direclty, or a string (CSS selector, will be converted below to an actual DOM node)
    // (positional arguments of the modifier)
    [_anchorTarget],
    // (named arguments of the modifier)
    {
      floatingElementPlacement = 'bottom',
      floatingElementPositionStrategy = 'absolute', // if we use `fixed` then the overscroll of the body makes the dialog look weird when the page is overscrolled
      floatingElementZIndex = 0,
      floatingElementOffsetOptions = 4,
      floatingLogicFlipOptions,
      floatingLogicShiftOptions,
      floatingLogicMiddlewareExtra = [],
    }
  ) {
    const anchorElement =
      typeof _anchorTarget === 'string'
        ? document.querySelector(_anchorTarget)
        : _anchorTarget;

    assert(
      '`hds-float-element` modifier - no anchoring element defined',
      anchorElement instanceof HTMLElement ||
        anchorElement instanceof SVGElement
    );

    assert(
      '`hds-float-element` modifier -  no floating element defined',
      floatingElement instanceof HTMLElement ||
        floatingElement instanceof SVGElement
    );

    assert(
      '`hds-float-element` modifier - anchoring and floating elements cannot be the same element',
      floatingElement !== anchorElement
    );

    assert(
      '@floatingLogicMiddlewareExtra must be an array of one or more objects',
      Array.isArray(floatingLogicMiddlewareExtra)
    );

    this.anchor = anchorElement;
    this.floating = floatingElement;

    Object.assign(this.floating.style, {
      position: floatingElementPositionStrategy,
      zIndex: floatingElementZIndex,
      top: '0',
      left: '0',
    });

    if (!this.didSetup) {
      // this.#addEventsToAnchorElement();
      this.didSetup = true;
    }

    let update = async () => {
      let { middlewareData, x, y } = await computePosition(
        this.anchor,
        this.floating,
        {
          middleware: [
            offset(floatingElementOffsetOptions),
            flip(floatingLogicFlipOptions),
            shift(floatingLogicShiftOptions),
            ...floatingLogicMiddlewareExtra,
            // TODO! don't remember what this was for, probably needed
            hide({ strategy: 'referenceHidden' }),
            // TODO! don't remember what this was for, maybe not needed?
            hide({ strategy: 'escaped' }),
          ],
          placement: floatingElementPlacement,
          strategy: floatingElementPositionStrategy,
        }
      );

      const { referenceHidden } = middlewareData.hide;

      Object.assign(this.floating.style, {
        top: `${y}px`,
        left: `${x}px`,
        margin: 0,
        visibility: referenceHidden ? 'hidden' : 'visible',
      });
    };

    update();

    let cleanup = autoUpdate(this.anchor, this.floating, update);

    registerDestructor(this, cleanup);
  }

  // #addEventsToAnchorElement() {
  //   this.anchor.addEventListener(
  //     'click',
  //     this.#toggleForcedShowDialog.bind(this)
  //   );
  //   this.anchor.addEventListener('focus', this.#showDialog.bind(this));
  //   this.anchor.addEventListener('mouseenter', this.#showDialog.bind(this));
  //   this.anchor.addEventListener('blur', this.#hideDialog.bind(this));
  //   this.anchor.addEventListener('mouseleave', this.#hideDialog.bind(this));
  // }

  // because of how the modifier is implemented (and there's no alternative) the element may be already destroyed
  // when this function is invoked if we use a `registerDestructor`
  // so unfortunately we have to comment this out
  //
  // #removeEventsToTriggerElement() {
  //   debugger;
  //   this.anchor.removeEventListener(
  //     'click',
  //     this.#toggleForcedShowDialog.bind(this)
  //   );
  //   this.anchor.removeEventListener('focus', this.#showDialog.bind(this));
  //   this.anchor.removeEventListener('mouseenter', this.#showDialog.bind(this));
  //   this.anchor.removeEventListener('blur', this.#hideDialog.bind(this));
  //   this.anchor.removeEventListener('mouseleave', this.#hideDialog.bind(this));
  // }

  // #setOpenStatus() {
  //   if (this.isDialogForcedOpen || this.isDialogOpen) {
  //     this.floating.setAttribute('open', true);
  //   } else {
  //     this.floating.removeAttribute('open');
  //   }
  // }

  // #showDialog() {
  //   this.isDialogOpen = true;
  //   this.#setOpenStatus();
  // }

  // #hideDialog() {
  //   this.isDialogOpen = false;
  //   this.#setOpenStatus();
  // }

  // #toggleForcedShowDialog(event) {
  //   event.preventDefault();
  //   if (this.isDialogForcedOpen) {
  //     this.isDialogForcedOpen = false;
  //     this.isDialogOpen = false;
  //   } else {
  //     this.isDialogForcedOpen = true;
  //   }
  //   this.#setOpenStatus();
  // }

  // In case we want to change the behaviour and have only the "click" even to open the dialog we may want to add a handler for click outside.
  // see https://github.com/hashicorp/cloud-ui/blob/main/addons/core/addon/components/menu/index.js#L60-L66
  // @action
  // setupClickOutside(el) {
  //   document.addEventListener(
  //     'click',
  //     (evt) => this.clickOutside(evt, el),
  //     true
  //   );
  // }
}
