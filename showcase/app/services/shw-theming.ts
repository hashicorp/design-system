import type Owner from '@ember/owner';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

// import type {
//   OnSetThemeCallback,
//   OnSetThemeCallbackArgs,
// } from '@hashicorp/design-system-components/services/hds-theming';

import config from 'showcase/config/environment';

export type ShwStylesheets =
  | 'standard'
  | 'prefers-color-scheme'
  | 'css-selectors'
  | 'combined-strategies';

const ALL_STYLESHEETS_IDS: string[] = [
  'hds-components-stylesheet-default',
  'hds-tokens-with-prefers-color-scheme',
  'hds-tokens-with-css-selectors',
  'hds-tokens-with-combined-strategies',
  'hds-components-stylesheet-common',
] as const;

const STYLESHEETS_MAPPING: Record<ShwStylesheets, string[]> = {
  standard: ['hds-components-stylesheet-default'],
  'prefers-color-scheme': [
    'hds-tokens-with-prefers-color-scheme',
    'hds-components-stylesheet-common',
  ],
  'css-selectors': [
    'hds-tokens-with-css-selectors',
    'hds-components-stylesheet-common',
  ],
  'combined-strategies': [
    'hds-tokens-with-combined-strategies',
    'hds-components-stylesheet-common',
  ],
};

const updatePageStylesheets = (currentStylesheet: ShwStylesheets) => {
  // toggle the stylesheets `disabled` attribute depending on the current choice
  ALL_STYLESHEETS_IDS.forEach((id) => {
    const stylesheetElement = document.getElementById(id);
    const activate = STYLESHEETS_MAPPING[currentStylesheet].includes(id);
    if (stylesheetElement) {
      if (activate) {
        // note: `setAttribute('disabled', 'false')` does not work
        stylesheetElement.removeAttribute('disabled');
      } else {
        stylesheetElement.setAttribute('disabled', 'true');
      }
    }
  });
};

const LOCALSTORAGE_CURRENT_STYLESHEET = 'shw-theming-current-stylesheet';
export default class ShwThemingService extends HdsThemingService {
  @service declare readonly hdsTheming: HdsThemingService;

  @tracked _currentStylesheet: ShwStylesheets = 'standard';

  constructor(owner: Owner) {
    super(owner);

    const storedStylesheet = localStorage.getItem(
      LOCALSTORAGE_CURRENT_STYLESHEET,
    ) as ShwStylesheets;
    if (storedStylesheet) {
      this.setStylesheet(storedStylesheet);
    }
  }

  // example of how a consumer could use the `globalOnSetTheme` callback by extending the `hdsTheming` service
  //
  // globalOnSetTheme: OnSetThemeCallback = ({
  //   currentTheme,
  //   currentMode,
  // }: OnSetThemeCallbackArgs) => {
  //   console.log(
  //     'ShwTheming Service -- globalOnSetTheme invoked',
  //     currentTheme,
  //     currentMode,
  //   );
  // };

  setStylesheet(stylesheet: ShwStylesheets) {
    if (stylesheet !== this._currentStylesheet) {
      this._currentStylesheet = stylesheet;
      updatePageStylesheets(this._currentStylesheet);
    }

    // store the current stylesheet in local storage
    localStorage.setItem(
      LOCALSTORAGE_CURRENT_STYLESHEET,
      this._currentStylesheet,
    );
  }

  get currentStylesheet(): ShwStylesheets {
    return this._currentStylesheet;
  }
}
