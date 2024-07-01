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
    _defineProperty(this, "interval", null);
    _defineProperty(this, "needsTabIndex", false);
    _defineProperty(this, "tooltip", null);
    _defineProperty(this, "hideOnEsc", {
      name: 'hideOnEsc',
      defaultValue: true,
      fn({
        hide
      }) {
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
  this.tooltip.setProps(tooltipProps);
}
function _getTooltipProps(element, positional, named) {
  const {
    options = {}
  } = named;
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
      options.onShown = tooltip => {
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
      expanded: null
    },
    content: () => content,
    plugins: [typeof options.followCursor !== 'undefined' ? followCursor : undefined, this.hideOnEsc].filter(item => Boolean(item)),
    ...options
  };
}

export { HdsTooltipModifier as default };
//# sourceMappingURL=hds-tooltip.js.map
