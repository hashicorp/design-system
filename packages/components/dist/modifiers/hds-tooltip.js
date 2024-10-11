import { c as _classPrivateMethodInitSpec, a as _defineProperty, d as _assertClassBrand } from '../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Modifier from 'ember-modifier';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/svg-arrow.css';

function cleanup(instance) {
  const {
    interval,
    needsTabIndex,
    tooltip
  } = instance;
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
var _HdsTooltipModifier_brand = /*#__PURE__*/new WeakSet();
class HdsTooltipModifier extends Modifier {
  constructor(owner, args) {
    super(owner, args);
    _classPrivateMethodInitSpec(this, _HdsTooltipModifier_brand);
    _defineProperty(this, "didSetup", false);
    _defineProperty(this, "interval", undefined);
    _defineProperty(this, "needsTabIndex", false);
    _defineProperty(this, "tooltip", undefined);
    _defineProperty(this, "hideOnEsc", {
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
    });
    registerDestructor(this, cleanup);
  }
  modify(element, positional, named) {
    assert('Tooltip must have an element', element);
    if (!this.didSetup) {
      _assertClassBrand(_HdsTooltipModifier_brand, this, _setup).call(this, element, positional, named);
      this.didSetup = true;
    }
    _assertClassBrand(_HdsTooltipModifier_brand, this, _update).call(this, element, positional, named);
  }
}
function _setup(element, positional, named) {
  const tooltipProps = _assertClassBrand(_HdsTooltipModifier_brand, this, _getTooltipProps).call(this, element, positional, named);
  this.tooltip = tippy(element, tooltipProps);
}
function _update(element, positional, named) {
  const tooltipProps = _assertClassBrand(_HdsTooltipModifier_brand, this, _getTooltipProps).call(this, element, positional, named);
  this.tooltip?.setProps(tooltipProps);
}
function _getTooltipProps(element, positional, named) {
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
    // fix accessibility features that get messed up with setting interactive: true
    aria: {
      content: 'describedby',
      expanded: false
    },
    content: () => content,
    plugins,
    ...options
  };
}

export { HdsTooltipModifier as default };
//# sourceMappingURL=hds-tooltip.js.map
