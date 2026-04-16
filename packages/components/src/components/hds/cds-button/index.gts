/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import '@carbon/web-components/es/components/button/index.js';

import {
  BUTTON_KIND,
  BUTTON_SIZE,
  BUTTON_TOOLTIP_ALIGNMENT,
  BUTTON_TOOLTIP_POSITION,
  BUTTON_TYPE,
} from '@carbon/web-components/es/components/button/defs.js';

type ButtonKind = `${BUTTON_KIND}`;
type ButtonSize = `${BUTTON_SIZE}`;
type ButtonTooltipAlignment = `${BUTTON_TOOLTIP_ALIGNMENT}`;
type ButtonTooltipPosition = `${BUTTON_TOOLTIP_POSITION}`;
type ButtonType = `${BUTTON_TYPE}`;

export const CDS_BUTTON_KIND_OPTIONS = Object.values(BUTTON_KIND);
export const CDS_BUTTON_SIZE_OPTIONS = Object.values(BUTTON_SIZE);
export const CDS_BUTTON_TOOLTIP_ALIGNMENT_OPTIONS = Object.values(
  BUTTON_TOOLTIP_ALIGNMENT
);
export const CDS_BUTTON_TOOLTIP_POSITION_OPTIONS = Object.values(
  BUTTON_TOOLTIP_POSITION
);
export const CDS_BUTTON_TYPE_OPTIONS = Object.values(BUTTON_TYPE);

export interface HdsCdsButtonSignature {
  Args: {
    autofocus?: boolean;
    batchAction?: boolean;
    buttonClassName?: string;
    dangerDescription?: string;
    disabled?: boolean;
    download?: string;
    href?: string;
    hreflang?: string;
    isExpressive?: boolean;
    isSelected?: boolean;
    kind?: ButtonKind;
    linkRole?: string;
    openTooltip?: boolean;
    ping?: string;
    rel?: string;
    size?: ButtonSize;
    tabIndex?: number;
    target?: string;
    tooltipAlignment?: ButtonTooltipAlignment;
    tooltipPosition?: ButtonTooltipPosition;
    tooltipText?: string;
    type?: ButtonType;
  };
  Blocks: {
    default: [];
  };
  Element: Element;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class HdsCdsButton extends Component<HdsCdsButtonSignature> {
  <template>
    <cds-button
      autofocus={{@autofocus}}
      batchAction={{@batchAction}}
      button-class-name={{@buttonClassName}}
      danger-description={{@dangerDescription}}
      disabled={{@disabled}}
      download={{@download}}
      href={{@href}}
      hreflang={{@hreflang}}
      is-expressive={{@isExpressive}}
      is-selected={{@isSelected}}
      kind={{@kind}}
      link-role={{@linkRole}}
      open-tooltip={{@openTooltip}}
      ping={{@ping}}
      rel={{@rel}}
      size={{@size}}
      tabindex={{@tabIndex}}
      target={{@target}}
      tooltip-alignment={{@tooltipAlignment}}
      tooltip-position={{@tooltipPosition}}
      tooltip-text={{@tooltipText}}
      type={{@type}}
      ...attributes
    >
      {{yield}}
    </cds-button>
  </template>
}
