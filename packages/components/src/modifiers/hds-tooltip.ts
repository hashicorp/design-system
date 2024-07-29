/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// Note: the majority of this code is a porting of the existing tooltip implementation in Cloud UI
// (which was initially implemented in Structure)

import Modifier from 'ember-modifier';
import type { ArgsFor } from 'ember-modifier';

import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';

import tippy, { followCursor } from 'tippy.js';
import type {
  HideAll as TippyHideAll,
  Instance as TippyInstance,
  Props as TippyProps,
} from 'tippy.js';
// used by custom SVG arrow:
import 'tippy.js/dist/svg-arrow.css';

export interface HdsTooltipModifierSignature {
  Args: {
    Positional: [string];
    Named: {
      options?: TippyProps;
    };
  };
  Element: HTMLElement;
}

function cleanup(instance: HdsTooltipModifier): void {
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
export default class HdsTooltipModifier extends Modifier<HdsTooltipModifierSignature> {
  didSetup = false;
  interval: number | undefined = undefined;
  needsTabIndex = false;
  tooltip: TippyInstance | undefined = undefined;

  constructor(owner: unknown, args: ArgsFor<HdsTooltipModifierSignature>) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  hideOnEsc = {
    name: 'hideOnEsc',
    defaultValue: true,
    fn({ hide }: { hide: TippyHideAll }) {
      function onKeyDown(event: KeyboardEvent): void {
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
        },
      };
    },
  };

  modify(
    element: HdsTooltipModifierSignature['Element'],
    positional: HdsTooltipModifierSignature['Args']['Positional'],
    named: HdsTooltipModifierSignature['Args']['Named']
  ): void {
    assert('Tooltip must have an element', element);

    if (!this.didSetup) {
      this.#setup(element, positional, named);
      this.didSetup = true;
    }

    this.#update(element, positional, named);
  }

  #setup(
    element: HdsTooltipModifierSignature['Element'],
    positional: HdsTooltipModifierSignature['Args']['Positional'],
    named: HdsTooltipModifierSignature['Args']['Named']
  ): void {
    const tooltipProps = this.#getTooltipProps(element, positional, named);
    this.tooltip = tippy(element, tooltipProps);
  }

  #update(
    element: HdsTooltipModifierSignature['Element'],
    positional: HdsTooltipModifierSignature['Args']['Positional'],
    named: HdsTooltipModifierSignature['Args']['Named']
  ): void {
    const tooltipProps = this.#getTooltipProps(element, positional, named);
    this.tooltip?.setProps(tooltipProps);
  }

  #getTooltipProps(
    element: HdsTooltipModifierSignature['Element'],
    positional: HdsTooltipModifierSignature['Args']['Positional'],
    named: HdsTooltipModifierSignature['Args']['Named']
  ): Partial<TippyProps> {
    const { options } = named;
    let [content] = positional;

    let $anchor: HTMLElement | null = element; // Ensure $anchor can be null

    if (typeof options?.triggerTarget === 'string') {
      const $el = $anchor;
      if (options.triggerTarget === 'parentNode') {
        if ($anchor.parentNode instanceof HTMLElement) {
          // Type guard
          $anchor = $anchor.parentNode;
        }
      } else {
        const queryResult: HTMLElement | null = $anchor.querySelector(
          options.triggerTarget
        );
        if (queryResult) {
          $anchor = queryResult;
        }
      }
      if ($anchor instanceof HTMLElement) {
        // Ensure $anchor is an HTMLElement before cloning
        const clonedElement = $anchor.cloneNode(true) as HTMLElement; // Explicitly cast cloned node to HTMLElement
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
          options.onShown = (tooltip) => {
            clearInterval(this.interval);
            this.interval = setTimeout(() => {
              tooltip.hide();
            }, delay[1] ?? 0);
          };
        }
      }
    }

    const $trigger = $anchor;

    if (!$trigger.hasAttribute('tabindex')) {
      this.needsTabIndex = true;
      $trigger.setAttribute('tabindex', '0');
    }

    /*  Typescript does not like the previous approach of adding an undefined value
     **  to the array and then filtering it out.
     */
    const plugins =
      options?.followCursor !== undefined
        ? [this.hideOnEsc, followCursor]
        : [this.hideOnEsc];

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
        expanded: false,
      },
      content: () => content,
      plugins,
      ...options,
    };
  }
}
