import HdsDropdownFooter from './footer.gts';
import HdsDropdownHeader from './header.gts';
import HdsDropdownListItemCheckbox from './list-item/checkbox.gts';
import HdsDropdownListItemCheckmark from './list-item/checkmark.gts';
import HdsDropdownListItemCopyItem from './list-item/copy-item.gts';
import HdsDropdownListItemDescription from './list-item/description.gts';
import HdsDropdownListItemGeneric from './list-item/generic.gts';
import HdsDropdownListItemInteractive from './list-item/interactive.gts';
import HdsDropdownListItemRadio from './list-item/radio.gts';
import HdsDropdownListItemSeparator from './list-item/separator.gts';
import HdsDropdownListItemTitle from './list-item/title.gts';
import HdsDropdownToggleButton from './toggle/button.gts';
import HdsDropdownToggleIcon from './toggle/icon.gts';

import type { WithBoundArgs } from '@glint/template';
import type { HdsDropdownPositions } from './types.ts';
import type { HdsPopoverPrimitiveSignature } from '../popover-primitive/index.gts';
import type { HdsAnchoredPositionOptions } from '../../../modifiers/hds-anchored-position.ts';

export interface HdsDropdownSignature {
  Args: {
    /**
     * Provides an option to specify a parent or ancestor container element to
     * act as the boundary for collision detection vs. the browser window
     * boundaries which is the default. The value provided must be either a
     * `Boundary` type as specified in the [Floating UI library
     * documentation](https://floating-ui.com/docs/detectoverflow#options) or an
     * id string for the boundary container element.
     *
     * @remarks
     *   Must be used in conjunction with setting `enableCollisionDetection` to
     *   `true`.
     * @dependsOn enableCollisionDetection
     */
    boundary?: HdsAnchoredPositionOptions['boundary'];

    /**
     * If a `@height` parameter is provided then the list will have a
     * max-height.
     */
    height?: string;

    /**
     * If an `@isInline` parameter is provided, then the element will be
     * displayed as `inline-block` (useful to achieve specific layouts like in a
     * container with right alignment). Otherwise, it will have a `block`
     * layout.
     *
     * @defaultValue false
     */
    isInline?: boolean;

    /**
     * Controls if the list should be rendered initially opened.
     *
     * @defaultValue false
     */
    isOpen?: HdsPopoverPrimitiveSignature['Args']['isOpen'];

    /**
     * Controls where the dropdown list is positioned relative to the toggle
     * button.
     *
     * @remarks
     *   _Note: If `@enableCollisionDetection` is set, the list will automatically
     *   flip position to remain visible when near the edges of the screen
     *   regardless of the starting placement._
     * @defaultValue 'bottom-right'
     */
    listPosition?: HdsDropdownPositions;

    /**
     * By default, the Dropdown List has a `min-width` of `200px` and a
     * `max-width` of `400px`, so it adapts to the content size. If a `@width`
     * parameter is provided then the list will have a fixed width.
     *
     * @remarks
     *   We discourage the use of percentage values for this argument. The
     *   Dropdown list is [a `popover`
     *   element](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover),
     *   so relative units use `document` as a reference (not the parent
     *   element), meaning percentage values act similar to `vw`. If
     *   `@matchToggleWidth` is set, `@width` is overridden.
     * @valueNote any valid CSS width (px, rem, etc)
     */
    width?: string;

    /**
     * Setting it to `true` will automatically flip the list position to remain
     * visible when near the edges of the viewport.
     *
     * @defaultValue false
     */
    enableCollisionDetection?: HdsAnchoredPositionOptions['enableCollisionDetection'];

    /**
     * Controls if the content is always rendered in the DOM, even when the
     * dropdown is closed.
     *
     * @defaultValue false
     */
    preserveContentInDom?: boolean;

    /**
     * Sets the Dropdown List’s width to match the width of the Toggle. It
     * overrides the `@width` value if set.
     *
     * @defaultValue false
     */
    matchToggleWidth?: boolean;

    /** Callback function invoked when the dropdown is closed (if provided). */
    onClose?: HdsPopoverPrimitiveSignature['Args']['onClose'];

    /**
     * A callback function invoked when the dropdown menu loses focus, and focus
     * does not move to another element (if provided).
     *
     * @remarks
     *   _Notice: Focus can be lost if content inside the dropdown is removed
     *   dynamically. This callback should be used to set focus to another
     *   element if this occurs. Without this callback the dropdown will close
     *   automatically when focus is lost._
     */
    onFocusOut?: HdsPopoverPrimitiveSignature['Args']['onFocusOut'];
  };
  Blocks: {
    default: [
      {
        Footer?: typeof HdsDropdownFooter;
        Header?: typeof HdsDropdownHeader;
        Checkbox?: typeof HdsDropdownListItemCheckbox;
        Checkmark?: typeof HdsDropdownListItemCheckmark;
        CopyItem?: typeof HdsDropdownListItemCopyItem;
        Description?: typeof HdsDropdownListItemDescription;
        Generic?: typeof HdsDropdownListItemGeneric;
        Interactive?: typeof HdsDropdownListItemInteractive;
        Radio?: typeof HdsDropdownListItemRadio;
        Separator?: typeof HdsDropdownListItemSeparator;
        Title?: typeof HdsDropdownListItemTitle;
        ToggleButton?: WithBoundArgs<
          typeof HdsDropdownToggleButton,
          'isOpen' | 'setupPrimitiveToggle'
        >;
        ToggleIcon?: WithBoundArgs<
          typeof HdsDropdownToggleIcon,
          'isOpen' | 'setupPrimitiveToggle'
        >;

        /**
         * Function to programmatically close the Dropdown yielded to the
         * content.
         *
         * @remarks
         *   If this function is invoked using an `{{on "click"}}` modifier
         *   applied to the `ListItem::Interactive` element, there is a quirky
         *   behavior of the Ember `<LinkTo>` component which requires a
         *   workaround to have the events executed in the right order (this
         *   happens only if it has a `@route` argument). Read more about the
         *   issue and a possible solution [in this GitHub
         *   comment](https://github.com/hashicorp/design-system/pull/399#issuecomment-1171186772).
         */
        close: (event?: Event) => void;
      },
    ];
  };

  /** @splattributes */
  Element: HTMLDivElement;
}
