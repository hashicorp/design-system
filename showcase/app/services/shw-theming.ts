import type Owner from '@ember/owner';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

// import type {
//   OnSetThemeCallback,
//   OnSetThemeCallbackOptions,
// } from '@hashicorp/design-system-components/services/hds-theming';

import config from 'showcase/config/environment';

export type ShwStylesheets =
  | 'standard'
  | 'prefers-color-scheme'
  | 'css-selectors'
  | 'combined-strategies';

const updatePageStylesheet = (currentStylesheet: string) => {
  let newStylesheet;
  switch (currentStylesheet) {
    case 'prefers-color-scheme':
      // themed CSS where theming is applied via `@media(prefers-color-scheme)`
      newStylesheet =
        'assets/styles/@hashicorp/design-system-components-theming-with-prefers-color-scheme.css';
      break;
    case 'css-selectors':
      // themed CSS where theming is applied via CSS selectors
      newStylesheet =
        'assets/styles/@hashicorp/design-system-components-theming-with-css-selectors.css';
      break;
    case 'combined-strategies':
      // this is used for local testing purposes
      newStylesheet =
        'assets/styles/@hashicorp/design-system-components-theming-with-combined-strategies.css';
      break;
    default:
      // this is the standard CSS for HDS components, without any theming
      newStylesheet = 'assets/styles/@hashicorp/design-system-components.css';
      break;
  }

  // re-assign the stylesheet `href` attribute
  const hdsComponentsStylesheet = document.getElementById(
    'hds-components-stylesheet',
  );
  if (hdsComponentsStylesheet) {
    hdsComponentsStylesheet.setAttribute(
      'href',
      `${config.rootURL}${newStylesheet}`,
    );
  }
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
  // }: OnSetThemeCallbackOptions) => {
  //   console.log(
  //     'ShwTheming Service -- globalOnSetTheme invoked',
  //     currentTheme,
  //     currentMode,
  //   );
  // };

  setStylesheet(stylesheet: ShwStylesheets) {
    if (stylesheet !== this._currentStylesheet) {
      this._currentStylesheet = stylesheet;
      updatePageStylesheet(this._currentStylesheet);
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
