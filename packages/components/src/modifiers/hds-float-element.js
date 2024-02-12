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
  isDialogOpen = false;
  isDialogForcedOpen = false;

  modify(
    // the element that acts as an "anchor" for the "floating" element (whose position is calculated in relation to the anchor)
    // notice: this is the element the Ember modifier is attached to
    anchorElement,
    // the element that "floats" next to the anchor
    // notice: it's expressed as argument for modifier and it can be a DOM node direclty, or a string (CSS selector, will be converted below to an actual DOM node)
    // positional arguments of the modifier
    [_floatingTarget],
    // named arguments of the modifier
    {
      strategy = 'absolute', // if we use `fixed` then the overscroll of the body makes the dialog look weird when the page is overscrolled
      offsetOptions = 4,
      placement = 'bottom',
      flipOptions,
      shiftOptions,
      middleware = [],
    }
  ) {
    const floatingElement =
      typeof _floatingTarget === 'string'
        ? document.querySelector(_floatingTarget)
        : _floatingTarget;

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
      '@middleware must be an array of one or more objects',
      Array.isArray(middleware)
    );

    this.anchor = anchorElement;
    this.floating = floatingElement;

    Object.assign(this.floating.style, {
      position: strategy,
      top: '0',
      left: '0',
    });

    if (!this.didSetup) {
      this.#addEventsToAnchorElement();
      this.didSetup = true;
    }

    let update = async () => {
      let { middlewareData, x, y } = await computePosition(
        this.anchor,
        this.floating,
        {
          middleware: [
            offset(offsetOptions),
            flip(flipOptions),
            shift(shiftOptions),
            ...middleware,
            hide({ strategy: 'referenceHidden' }),
            hide({ strategy: 'escaped' }),
          ],
          placement,
          strategy,
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

  #addEventsToAnchorElement() {
    this.anchor.addEventListener(
      'click',
      this.#toggleForcedShowDialog.bind(this)
    );
    this.anchor.addEventListener('focus', this.#showDialog.bind(this));
    this.anchor.addEventListener('mouseenter', this.#showDialog.bind(this));
    this.anchor.addEventListener('blur', this.#hideDialog.bind(this));
    this.anchor.addEventListener('mouseleave', this.#hideDialog.bind(this));
  }

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

  #setOpenStatus() {
    if (this.isDialogForcedOpen || this.isDialogOpen) {
      this.floating.setAttribute('open', true);
    } else {
      this.floating.removeAttribute('open');
    }
  }

  #showDialog() {
    this.isDialogOpen = true;
    this.#setOpenStatus();
  }

  #hideDialog() {
    this.isDialogOpen = false;
    this.#setOpenStatus();
  }

  #toggleForcedShowDialog(event) {
    event.preventDefault();
    if (this.isDialogForcedOpen) {
      this.isDialogForcedOpen = false;
      this.isDialogOpen = false;
    } else {
      this.isDialogForcedOpen = true;
    }
    this.#setOpenStatus();
  }

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
