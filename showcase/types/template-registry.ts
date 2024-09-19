/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import ShwAutoscrollable from '../app/components/shw/autoscrollable';
import ShwDivider from '../app/components/shw/divider';
import ShwFlex from '../app/components/shw/flex';
import ShwFlexItem from '../app/components/shw/flex/item';
import ShwFrame from '../app/components/shw/frame';
import ShwGrid from '../app/components/shw/grid';
import ShwGridItem from '../app/components/shw/grid/item';
import ShwLabel from '../app/components/shw/label';
import ShwLogoDesignSystem from '../app/components/shw/logo/design-system';
import ShwOutliner from '../app/components/shw/outliner';
import ShwPlaceholder from '../app/components/shw/placeholder/index';
import ShwText from '../app/components/shw/text/index';
import ShwTextBody from '../app/components/shw/text/body';
import ShwTextH1 from '../app/components/shw/text/h1';
import ShwTextH2 from '../app/components/shw/text/h2';
import ShwTextH3 from '../app/components/shw/text/h3';
import ShwTextH4 from '../app/components/shw/text/h4';

export default interface ShowcaseTemplateRegistry {
  'Shw::Autoscrollable': typeof ShwAutoscrollable;
  'shw/autoscrollable': typeof ShwAutoscrollable;
  'Shw::Divider': typeof ShwDivider;
  'shw/divider': typeof ShwDivider;
  'Shw::Flex': typeof ShwFlex;
  'shw/flex': typeof ShwFlex;
  'Shw::Flex::Item': typeof ShwFlexItem;
  'shw/flex/item': typeof ShwFlexItem;
  'Shw::Frame': typeof ShwFrame;
  'shw/frame': typeof ShwFrame;
  'Shw::Grid': typeof ShwGrid;
  'shw/grid': typeof ShwGrid;
  'Shw::Grid::Item': typeof ShwGridItem;
  'shw/grid/item': typeof ShwGridItem;
  'Shw::Label': typeof ShwLabel;
  'shw/label': typeof ShwLabel;
  'Shw::Logo::DesignSystem': typeof ShwLogoDesignSystem;
  'shw/logo/design-system': typeof ShwLogoDesignSystem;
  'Shw::Outliner': typeof ShwOutliner;
  'shw/outliner': typeof ShwOutliner;
  'Shw::Placeholder': typeof ShwPlaceholder;
  'shw/placeholder': typeof ShwPlaceholder;
  'Shw::Text': typeof ShwText;
  'shw/text': typeof ShwText;
  'Shw::Text::H1': typeof ShwTextH1;
  'shw/text/h1': typeof ShwTextH1;
  'Shw::Text::H2': typeof ShwTextH2;
  'shw/text/h2': typeof ShwTextH2;
  'Shw::Text::H3': typeof ShwTextH3;
  'shw/text/h3': typeof ShwTextH3;
  'Shw::Text::H4': typeof ShwTextH4;
  'shw/text/h4': typeof ShwTextH4;
  'Shw::Text::Body': typeof ShwTextBody;
  'shw/text/body': typeof ShwTextBody;
}
