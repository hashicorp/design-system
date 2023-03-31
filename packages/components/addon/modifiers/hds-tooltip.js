/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Modifier from 'ember-modifier';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';

import tippy, { followCursor } from 'tippy.js';

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
      theme: 'hcp',
      triggerTarget: $trigger,
      arrow: true,
      content: () => content,
      plugins: [
        typeof options.followCursor !== 'undefined' ? followCursor : undefined,
      ].filter((item) => Boolean(item)),
      ...options,
    };
  }
}
