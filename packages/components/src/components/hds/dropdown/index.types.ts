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
    height?: string;
    isInline?: boolean;
    isOpen?: HdsPopoverPrimitiveSignature['Args']['isOpen'];
    listPosition?: HdsDropdownPositions;
    width?: string;
    enableCollisionDetection?: HdsAnchoredPositionOptions['enableCollisionDetection'];
    preserveContentInDom?: boolean;
    matchToggleWidth?: boolean;
    onClose?: HdsPopoverPrimitiveSignature['Args']['onClose'];
    onFocusOut?: HdsPopoverPrimitiveSignature['Args']['onFocusOut'];
    boundary?: HdsAnchoredPositionOptions['boundary'];
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
        close: (event?: Event) => void;
      },
    ];
  };
  Element: HTMLDivElement;
}
