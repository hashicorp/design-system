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
import MockAppSidebarSideNav from '../app/components/mock/app/sidebar/app-side-nav';
import MockAppMainPageHeader from '../app/components/mock/app/main/page-header';
import MockAppMainGenericFormPartialsAccountSignup from '../app/components/mock/app/main/generic-form/partials/account-signup';
import MockAppMainGenericFormPartialsAddUser from '../app/components/mock/app/main/generic-form/partials/add-user';
import MockAppMainGenericFormPartialsAddPolicy from '../app/components/mock/app/main/generic-form/partials/add-policy';
import MockAppMainGenericFormPartialsActions from '../app/components/mock/app/main/generic-form/partials/actions';
import MockAppMainGenericTextContent from '../app/components/mock/app/main/generic-text-content';
import MockAppFooterAppFooter from '../app/components/mock/app/footer/app-footer';
import MockDemoBreakpointsRuler from '../app/components/mock/demo/breakpoints-ruler';
import MockDemoBreakpointsVisualization from '../app/components/mock/demo/breakpoints-visualization';

import MockComponentsFormKeyValueInputsWithValidationAndLimit from '../app/components/mock/components/form/key-value-inputs/with-validation-and-limit';
import MockComponentsFormKeyValueInputsWithDynamicInputs from '../app/components/mock/components/form/key-value-inputs/with-dynamic-inputs';
import MockFormSuperSelectGenericContent from '../app/components/mock/components/form/super-select/generic-content';
import MockFormSuperSelectSelectedComponentSingle from '../app/components/mock/components/form/super-select/selected-component-single';
import MockFormSuperSelectSelectedComponentMultiple from '../app/components/mock/components/form/super-select/selected-component-multiple';

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
  'Mock::App::Main::GenericForm::Partials::AccountSignup': typeof MockAppMainGenericFormPartialsAccountSignup;
  'mock/app/main/generic-form/partials/account-signup': typeof MockAppMainGenericFormPartialsAccountSignup;
  'Mock::App::Main::GenericForm::Partials::AddUser': typeof MockAppMainGenericFormPartialsAddUser;
  'mock/app/main/generic-form/partials/add-user': typeof MockAppMainGenericFormPartialsAddUser;
  'Mock::App::Main::GenericForm::Partials::AddPolicy': typeof MockAppMainGenericFormPartialsAddPolicy;
  'mock/app/main/generic-form/partials/add-policy': typeof MockAppMainGenericFormPartialsAddPolicy;
  'Mock::App::Main::GenericForm::Partials::Actions': typeof MockAppMainGenericFormPartialsActions;
  'mock/app/main/generic-form/partials/actions': typeof MockAppMainGenericFormPartialsActions;
  'Mock::App::Main::GenericTextContent': typeof MockAppMainGenericTextContent;
  'mock/app/main/generic-text-content': typeof MockAppMainGenericTextContent;
  'Mock::App::Footer::AppFooter': typeof MockAppFooterAppFooter;
  'mock/app/footer/app-footer': typeof MockAppFooterAppFooter;
  'Mock::Demo::BreakpointsVisualization': typeof MockDemoBreakpointsVisualization;
  'mock/demo/breakpoints-visualizaton': typeof MockDemoBreakpointsVisualization;
  'Mock::Demo::BreakpointsRuler': typeof MockDemoBreakpointsRuler;
  'mock/demo/breakpoints-ruler': typeof MockDemoBreakpointsRuler;

  // MOCK COMPONENTS
  'Mock::Components::Form::KeyValueInputs::WithValidationAndLimit': typeof MockComponentsFormKeyValueInputsWithValidationAndLimit;
  'mock/components/form/key-value-inputs/with-validation-and-limit': typeof MockComponentsFormKeyValueInputsWithValidationAndLimit;
  'Mock::Components::Form::KeyValueInputs::WithDynamicInputs': typeof MockComponentsFormKeyValueInputsWithDynamicInputs;
  'mock/components/form/key-value-inputs/with-dynamic-inputs': typeof MockComponentsFormKeyValueInputsWithDynamicInputs;
  'Mock::Form::SuperSelect::GenericContent': typeof MockFormSuperSelectGenericContent;
  'mock/components/form/super-select/generic-content': typeof MockFormSuperSelectGenericContent;
  'Mock::Form::SuperSelect::SelectedComponentSingle': typeof MockFormSuperSelectSelectedComponentSingle;
  'mock/components/form/super-select/selected-component-single': typeof MockFormSuperSelectSelectedComponentSingle;
  'Mock::Form::SuperSelect::SelectedComponentMultiple': typeof MockFormSuperSelectSelectedComponentMultiple;
  'mock/components/form/super-select/selected-component-multiple': typeof MockFormSuperSelectSelectedComponentMultiple;
}
