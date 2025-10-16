import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import type {
  HdsThemes,
  OnSetThemeCallback,
  OnSetThemeCallbackOptions,
} from '@hashicorp/design-system-components/services/hds-theming';

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

export default class ShwThemingService extends HdsThemingService {
  @service declare readonly hdsTheming: HdsThemingService;

  @tracked _currentStylesheet: ShwStylesheets = 'standard';

  globalOnSetTheme: OnSetThemeCallback = ({
    currentTheme,
    currentMode,
  }: OnSetThemeCallbackOptions) => {
    console.log(
      '➡️ ShwTheming Service -- globalOnSetTheme invoked',
      currentTheme,
      currentMode,
    );
  };

  setShwHdsThemes(
    stylesheet: ShwStylesheets,
    theme: HdsThemes,
    onSetTheme?: OnSetThemeCallback,
  ) {
    console.log(
      '➡️ ShwTheming Service -- setShwHdsThemes() invoked',
      stylesheet,
      theme,
    );

    if (stylesheet !== this.currentStylesheet) {
      this.currentStylesheet = stylesheet;
      updatePageStylesheet(this.currentStylesheet);
    }

    // we set the theme for the showcase itself
    const rootElement = document.querySelector('html');
    if (rootElement) {
      if (this.hdsTheming.currentTheme) {
        rootElement.setAttribute(
          'data-shw-theme',
          this.hdsTheming.currentTheme,
        );
      } else {
        rootElement.removeAttribute('data-shw-theme');
      }
    }

    this.hdsTheming.setTheme(theme, onSetTheme);
  }

  set currentStylesheet(currentStylesheet: ShwStylesheets) {
    this._currentStylesheet = currentStylesheet;
  }

  get currentStylesheet(): ShwStylesheets {
    return this._currentStylesheet;
  }
}
