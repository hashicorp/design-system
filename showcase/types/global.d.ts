/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/* eslint-disable ember/require-tagless-components */
/* eslint-disable @typescript-eslint/ban-types */

import '@glint/environment-ember-loose';
import Component from '@glimmer/component';

import type PageTitle from 'ember-page-title/template-registry';

export interface ShwTxtSignature {
  Args: {
    tag?: string;
    variant?: string;
    align?: string;
    weight?: string;
  };
  Element: HTMLElement;
  Blocks: {
    default: [];
  };
}
export class ShwTxt extends Component<ShwTxtSignature> {}

export interface ShwLabelSignature {
  Args: {};
  Element: HTMLParagraphElement;
  Blocks: {
    default: [];
  };
}
export class ShwLabel extends Component<ShwLabelSignature> {}

export interface ShwFlexItemSignature {
  Args: {
    grow?: boolean;
    label?: string;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Label: typeof ShwLabel;
      }
    ];
  };
}
export class ShwFlexItem extends Component<ShwFlexItemSignature> {}

export interface ShwFlexSignature {
  Args: {
    direction?: string;
    wrap?: boolean;
    label?: string;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Label: typeof ShwLabel;
        Item: typeof ShwFlexItem;
      }
    ];
  };
}
export class ShwFlex extends Component<ShwFlexSignature> {}

export interface ShwGridItemSignature {
  Args: {
    grow?: boolean;
    forceMinWidth?: boolean;
    label?: string;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Label: typeof ShwLabel;
      }
    ];
  };
}
export class ShwGridItem extends Component<ShwGridItemSignature> {}

export interface ShwGridSignature {
  Args: {
    columns: number;
    label?: string;
  };
  Element: HTMLDivElement;
  Blocks: {
    default: [
      {
        Label: typeof ShwLabel;
        Item: typeof ShwGridItem;
      }
    ];
  };
}
export class ShwGrid extends Component<ShwGridSignature> {}

export interface ShwDividerSignature {
  Args: {
    level?: number;
  };
}
export class ShwDivider extends Component<ShwDividerSignature> {}

export interface ShwOutlinerSignature {
  Args: {};
  Element: HTMLDivElement;
  Blocks: {
    default: [];
  };
}
export class ShwOutliner extends Component<ShwOutlinerSignature> {}

import type HdsComponentsRegistry from '@hashicorp/design-system-components/template-registry';
import type EmberStyleModifier from 'ember-style-modifier';

export default interface EmberStyleModifierRegistry {
  style: typeof EmberStyleModifier;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberStyleModifierRegistry,
      HdsComponentsRegistry,
      PageTitle {
    'Shw::Text': typeof ShwTxt;
    'Shw::Text::H1': typeof ShwTxt;
    'Shw::Text::H2': typeof ShwTxt;
    'Shw::Text::H3': typeof ShwTxt;
    'Shw::Text::H4': typeof ShwTxt;
    'Shw::Text::H5': typeof ShwTxt;
    'Shw::Text::H6': typeof ShwTxt;
    'Shw::Text::Body': typeof ShwTxt;
    'Shw::Flex': typeof ShwFlex;
    'Shw::Flex::Item': typeof ShwFlexItem;
    'Shw::Grid': typeof ShwGrid;
    'Shw::Grid::Item': typeof ShwGridItem;
    'Shw::Label': typeof ShwLabel;
    'Shw::Divider': typeof ShwDivider;
    'Shw::Outliner': typeof ShwOutliner;
  }
}
