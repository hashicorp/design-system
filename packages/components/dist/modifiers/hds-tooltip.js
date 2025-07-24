import Modifier from 'ember-modifier';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { guidFor } from '@ember/object/internals';
import tippy, { followCursor } from 'tippy.js';

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

function cleanup(instance) {
  const {
    _interval,
    _needsTabIndex,
    _tooltip,
    _containerElement
  } = instance;
  if (_needsTabIndex) {
    _tooltip?.reference?.removeAttribute('tabindex');
  }
  if (_containerElement) {
    _containerElement.remove();
  }
  clearInterval(_interval);
  _tooltip?.destroy();
}

/**
 *
 * `Tooltip` implements a modifier that uses Tippy.js to display a tooltip.
 *
 * Sample usage:
 * ```
 * <div {{hds-tooltip 'Text' options=(hash )}}>Hover me!</div>
 * ```
 *
 * @see https://atomiks.github.io/tippyjs
 * @class TooltipModifier
 *
 */
class HdsTooltipModifier extends Modifier {
  _didSetup = false;
  _containerId = 'container-' + guidFor(this);
  _interval = undefined;
  _needsTabIndex = false;
  _tooltip = undefined;
  _containerElement;
  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }
  hideOnEsc = {
    name: 'hideOnEsc',
    defaultValue: true,
    fn({
      hide
    }) {
      function onKeyDown(event) {
        if (event.key === 'Escape') {
          hide();
        }
      }
      return {
        onShow() {
          document.addEventListener('keydown', onKeyDown);
        },
        onHide() {
          document.removeEventListener('keydown', onKeyDown);
        }
      };
    }
  };
  modify(element, positional, named) {
    assert('Tooltip must have an element', element);
    if (!this._didSetup) {
      this.#setup(element, positional, named);
      this._didSetup = true;
    }
    this.#update(element, positional, named);
  }
  #setup(element, positional, named) {
    this.#createPopoverContainer(element);
    const tooltipProps = this.#getTooltipProps(element, positional, named);
    this._tooltip = tippy(element, tooltipProps);
  }
  #update(element, positional, named) {
    const tooltipProps = this.#getTooltipProps(element, positional, named);
    this._tooltip?.setProps(tooltipProps);
  }
  #createPopoverContainer(element) {
    const containerElement = document.createElement('div');
    containerElement.setAttribute('id', this._containerId);
    containerElement.classList.add('hds-tooltip-container');
    containerElement.style.setProperty('position', 'absolute');
    containerElement.style.setProperty('width', '100%');
    element.setAttribute('aria-controls', this._containerId);
    element.setAttribute('aria-describedby', this._containerId);
    element.after(containerElement);
    this._containerElement = containerElement;
  }
  #getTooltipProps(element, positional, named) {
    const {
      options
    } = named;
    let [content] = positional;
    let $anchor = element; // Ensure $anchor can be null

    if (typeof options?.triggerTarget === 'string') {
      const $el = $anchor;
      if (options.triggerTarget === 'parentNode') {
        if ($anchor.parentNode instanceof HTMLElement) {
          // Type guard
          $anchor = $anchor.parentNode;
        }
      } else {
        const queryResult = $anchor.querySelector(options.triggerTarget);
        if (queryResult) {
          $anchor = queryResult;
        }
      }
      if ($anchor instanceof HTMLElement) {
        // Ensure $anchor is an HTMLElement before cloning
        const clonedElement = $anchor.cloneNode(true); // Explicitly cast cloned node to HTMLElement
        content = clonedElement.outerHTML; // Now safely access outerHTML
      }
      $el?.remove(); // Use optional chaining in case $el is null
      options.triggerTarget = null;
    }

    // The {{hds-tooltip}} will just use the HTML content.
    if (typeof content === 'undefined' && $anchor instanceof HTMLElement) {
      // Ensure $anchor is an HTMLElement before accessing innerHTML
      content = $anchor.innerHTML;
      $anchor.innerHTML = '';
    }
    if (options?.trigger === 'manual') {
      // If we are manually triggering, a out delay means only show for the
      // amount of time specified by the delay.
      const delay = options.delay || [];
      if (Array.isArray(delay) && delay.length) {
        if (typeof delay[1] !== 'undefined') {
          options.onShown = tooltip => {
            clearInterval(this._interval);
            this._interval = setTimeout(() => {
              tooltip.hide();
            }, delay[1] ?? 0);
          };
        }
      }
    }
    const $trigger = $anchor;
    if (!$trigger.hasAttribute('tabindex')) {
      this._needsTabIndex = true;
      $trigger.setAttribute('tabindex', '0');
    }

    /*  Typescript does not like the previous approach of adding an undefined value
     **  to the array and then filtering it out.
     */
    const plugins = options?.followCursor !== undefined ? [this.hideOnEsc, followCursor] : [this.hideOnEsc];
    return {
      theme: 'hds',
      triggerTarget: $trigger,
      arrow: `
        <svg class="hds-tooltip-pointer" width="16" height="7" viewBox="0 0 16 7" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 7H16L9.11989 0.444571C8.49776 -0.148191 7.50224 -0.148191 6.88011 0.444572L0 7Z" />
        </svg>`,
      // keeps tooltip itself open on hover:
      interactive: true,
      appendTo: this._containerElement,
      // fix accessibility features that get messed up with setting interactive: true
      aria: {
        expanded: false
      },
      content: () => content,
      plugins,
      ...options
    };
  }
}

export { HdsTooltipModifier as default };
//# sourceMappingURL=hds-tooltip.js.map
