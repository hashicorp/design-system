/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

// Note: the majority of this code is a porting of the existing tooltip implementation in Cloud UI
// (which was initially implemented in Structure)

import Modifier from 'ember-modifier';
import type { ArgsFor } from 'ember-modifier';

import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { guidFor } from '@ember/object/internals';

import tippy, { followCursor } from 'tippy.js';
import type {
  HideAll as TippyHideAll,
  Instance as TippyInstance,
  Props as TippyProps,
} from 'tippy.js';

import type Owner from '@ember/owner';

export interface HdsTooltipModifierSignature {
  Args: {
    Positional: [string];
    Named: {
      options?: Partial<TippyProps>;
    };
  };
  Element: HTMLElement;
}

function cleanup(instance: HdsTooltipModifier): void {
  const { _interval, _needsTabIndex, _tooltip, _containerElement } = instance;
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
export default class HdsTooltipModifier extends Modifier<HdsTooltipModifierSignature> {
  private _didSetup = false;
  private _containerId: string = 'container-' + guidFor(this);
  _interval: number | undefined = undefined;
  _needsTabIndex = false;
  _tooltip: TippyInstance | undefined = undefined;
  _containerElement?: HTMLElement;

  constructor(owner: Owner, args: ArgsFor<HdsTooltipModifierSignature>) {
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

    if (!this._didSetup) {
      this.#setup(element, positional, named);
      this._didSetup = true;
    }

    this.#update(element, positional, named);
  }

  #setup(
    element: HdsTooltipModifierSignature['Element'],
    positional: HdsTooltipModifierSignature['Args']['Positional'],
    named: HdsTooltipModifierSignature['Args']['Named']
  ): void {
    this.#createPopoverContainer(element);
    const tooltipProps = this.#getTooltipProps(element, positional, named);
    this._tooltip = tippy(element, tooltipProps);
  }

  #update(
    element: HdsTooltipModifierSignature['Element'],
    positional: HdsTooltipModifierSignature['Args']['Positional'],
    named: HdsTooltipModifierSignature['Args']['Named']
  ): void {
    const tooltipProps = this.#getTooltipProps(element, positional, named);
    this._tooltip?.setProps(tooltipProps);
  }

  #createPopoverContainer(
    element: HdsTooltipModifierSignature['Element']
  ): void {
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
    const plugins =
      options?.followCursor !== undefined
        ? [this.hideOnEsc, followCursor]
        : [this.hideOnEsc];

    return {
      theme: 'hds',
      triggerTarget: $trigger,
      arrow: true,
      // keeps tooltip itself open on hover:
      interactive: true,
      appendTo: this._containerElement,
      // fix accessibility features that get messed up with setting interactive: true
      aria: {
        expanded: false,
      },
      content: () => content,
      plugins,
      ...options,
    };
  }
}
