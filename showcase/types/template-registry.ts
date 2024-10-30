/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import ShwAutoscrollable from '../app/components/shw/autoscrollable/index';
import ShwDivider from '../app/components/shw/divider/index';
import ShwFlex from '../app/components/shw/flex/index';
import ShwFlexItem from '../app/components/shw/flex/item';
import ShwFrame from '../app/components/shw/frame/index';
import ShwGrid from '../app/components/shw/grid/index';
import ShwGridItem from '../app/components/shw/grid/item';
import ShwLabel from '../app/components/shw/label/index';
import ShwLogoDesignSystem from '../app/components/shw/logo/design-system';
import ShwOutliner from '../app/components/shw/outliner/index';
import ShwPlaceholder from '../app/components/shw/placeholder/index';
import ShwText from '../app/components/shw/text/index';
import ShwTextBody from '../app/components/shw/text/body';
import ShwTextH1 from '../app/components/shw/text/h1';
import ShwTextH2 from '../app/components/shw/text/h2';
import ShwTextH3 from '../app/components/shw/text/h3';
import ShwTextH4 from '../app/components/shw/text/h4';

import MockApp from '../app/components/mock/app/index';
import MockAppHeaderAppHeader from '../app/components/mock/app/header/app-header';
import MockAppSidebarSideNav from '../app/components/mock/app/sidebar/side-nav';
import MockAppMainPageHeader from '../app/components/mock/app/main/page-header';
import MockAppMainShortTextContent from '../app/components/mock/app/main/short-text-content';
import MockAppMainLongTextContent from '../app/components/mock/app/main/long-text-content';
import MockAppFooterAppFooter from '../app/components/mock/app/footer/app-footer';

export default interface ShowcaseTemplateRegistry {
  // SHW COMPONENTS
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
  // MOCK APP
  'Mock::App': typeof MockApp;
  'mock/app': typeof MockApp;
  'Mock::App::Header::AppHeader': typeof MockAppHeaderAppHeader;
  'mock/app/header/app-header': typeof MockAppHeaderAppHeader;
  'Mock::App::Sidebar::AppSideNav': typeof MockAppSidebarSideNav;
  'mock/app/sidebar/app-side-nav': typeof MockAppSidebarSideNav;
  'Mock::App::Main::PageHeader': typeof MockAppMainPageHeader;
  'mock/app/main/page-header': typeof MockAppMainPageHeader;
  'Mock::App::Main::ShortTextContent': typeof MockAppMainShortTextContent;
  'mock/app/main/short-text-content': typeof MockAppMainShortTextContent;
  'Mock::App::Main::LongTextContent': typeof MockAppMainLongTextContent;
  'mock/app/main/long-text-content': typeof MockAppMainLongTextContent;
  'Mock::App::Footer::AppFooter': typeof MockAppFooterAppFooter;
  'mock/app/footer/app-footer': typeof MockAppFooterAppFooter;
}
