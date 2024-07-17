/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// Note: the majority of this code is a porting of the existing tooltip implementation in Cloud UI
// (which was initially implemented in Structure)

import Modifier from 'ember-modifier';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';

import tippy, { followCursor } from 'tippy.js';
// used by custom SVG arrow:
import 'tippy.js/dist/svg-arrow.css';

function cleanup(instance) {
  const { interval, needsTabIndex, tooltip } = instance;
  if (needsTabIndex) {
    tooltip?.reference?.removeAttribute('tabindex');
  }
  clearInterval(interval);
  tooltip?.destroy();
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
export default class HdsTooltipModifier extends Modifier {
  didSetup = false;

  interval = null;
  needsTabIndex = false;
  tooltip = null;

  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  hideOnEsc = {
    name: 'hideOnEsc',
    defaultValue: true,
    fn({ hide }) {
      function onKeyDown(event) {
        if (event.keyCode === 27) {
          hide();
        }
      }

      return {
        onShow() {
          document.addEventListener('keydown', onKeyDown);
        },
        onHide() {
          document.removeEventListener('keydown', onKeyDown);
        },
      };
    },
  };

  modify(element, positional, named) {
    assert('Tooltip must have an element', element);

    if (!this.didSetup) {
      this.#setup(element, positional, named);
      this.didSetup = true;
    }

    this.#update(element, positional, named);
  }

  #setup(element, positional, named) {
    const tooltipProps = this.#getTooltipProps(element, positional, named);
    this.tooltip = tippy(element, tooltipProps);
  }

  #update(element, positional, named) {
    const tooltipProps = this.#getTooltipProps(element, positional, named);
    this.tooltip.setProps(tooltipProps);
  }

  #getTooltipProps(element, positional, named) {
    const { options = {} } = named;
    let [content] = positional;

    let $anchor = element;

    // Make it easy to specify the modified element as the actual tooltip.
    if (typeof options.triggerTarget === 'string') {
      const $el = $anchor;
      switch (options.triggerTarget) {
        case 'parentNode':
          $anchor = $anchor.parentNode;
          break;
        default:
          $anchor = $anchor.querySelectorAll(options.triggerTarget);
      }
      content = $anchor.cloneNode(true);
      $el.remove();
      options.triggerTarget = undefined;
    }

    // The {{hds-tooltip}} will just use the HTML content.
    if (typeof content === 'undefined') {
      content = $anchor.innerHTML;
      $anchor.innerHTML = '';
    }

    if (options.trigger === 'manual') {
      // If we are manually triggering, a out delay means only show for the
      // amount of time specified by the delay.
      const delay = options.delay || [];

      if (typeof delay[1] !== 'undefined') {
        options.onShown = (tooltip) => {
          clearInterval(this.interval);
          this.interval = setTimeout(() => {
            tooltip.hide();
          }, delay[1]);
        };
      }
    }

    const $trigger = $anchor;

    if (!$trigger.hasAttribute('tabindex')) {
      this.needsTabIndex = true;
      $trigger.setAttribute('tabindex', '0');
    }

    return {
      theme: 'hds',
      triggerTarget: $trigger,
      arrow: `
        <svg class="hds-tooltip-pointer" width="16" height="7" viewBox="0 0 16 7" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 7H16L9.11989 0.444571C8.49776 -0.148191 7.50224 -0.148191 6.88011 0.444572L0 7Z" />
        </svg>`,
      // keeps tooltip itself open on hover:
      interactive: true,
      // fix accessibility features that get messed up with setting interactive: true
      aria: {
        content: 'describedby',
        expanded: null,
      },
      content: () => content,
      plugins: [
        typeof options.followCursor !== 'undefined' ? followCursor : undefined,
        this.hideOnEsc,
      ].filter((item) => Boolean(item)),
      ...options,
    };
  }
}
