import { tracked } from '@glimmer/tracking';

import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import type {
  OnSetThemeCallback,
  HdsThemes,
  HdsModes,
} from '@hashicorp/design-system-components/services/hds-theming';

import config from 'showcase/config/environment';

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
  @tracked currentStylesheet: string = 'standard';

  globalOnSetTheme: OnSetThemeCallback = ({
    currentTheme,
    currentMode,
  }: {
    currentTheme: HdsThemes;
    currentMode: HdsModes;
  }) => {
    console.log('EXTENDED SERVICE', currentTheme, currentMode);
    // update the page's stylesheet
    updatePageStylesheet(this.currentStylesheet);
  };

  setCurrentStylesheet(
    currentStylesheet:
      | 'standard'
      | 'prefers-color-scheme'
      | 'css-selectors'
      | 'combined-strategies',
  ): void {
    this.currentStylesheet = currentStylesheet;
  }
}
