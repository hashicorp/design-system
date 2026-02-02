import type Owner from '@ember/owner';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

const STYLESHEETS = [
  'standard',
  'css-selectors',
  'css-selectors--migration',
  'css-selectors--advanced',
] as const;

export type ShwStylesheets = (typeof STYLESHEETS)[number];

const ALL_STYLESHEETS_IDS: string[] = [
  'hds-components-stylesheet-default',
  'hds-tokens-with-css-selectors',
  'hds-tokens-with-css-selectors--migration',
  'hds-tokens-with-css-selectors--advanced',
  'hds-components-stylesheet-common',
] as const;

const STYLESHEETS_MAPPING: Record<ShwStylesheets, string[]> = {
  standard: ['hds-components-stylesheet-default'],
  'css-selectors': [
    'hds-tokens-with-css-selectors',
    'hds-components-stylesheet-common',
  ],
  'css-selectors--migration': [
    'hds-tokens-with-css-selectors--migration',
    'hds-components-stylesheet-common',
  ],
  'css-selectors--advanced': [
    'hds-tokens-with-css-selectors--advanced',
    'hds-components-stylesheet-common',
  ],
};

const LOCALSTORAGE_CURRENT_STYLESHEET = 'shw-theming-current-stylesheet';

function isSafeStylesheetData(data: string): data is ShwStylesheets {
  return STYLESHEETS.includes(data as ShwStylesheets);
}

export default class ShwThemingService extends HdsThemingService {
  @service declare readonly hdsTheming: HdsThemingService;

  @tracked _currentStylesheet: ShwStylesheets = 'standard';

  constructor(owner: Owner) {
    super(owner);

    const storedStylesheet = localStorage.getItem(
      LOCALSTORAGE_CURRENT_STYLESHEET,
    ) as ShwStylesheets;
    if (storedStylesheet && isSafeStylesheetData(storedStylesheet)) {
      this.setStylesheet(storedStylesheet);
    } else {
      // if data is not safe or malformed, reset stylesheet to its default
      this.setStylesheet('standard');
    }
  }

  _updatePageStylesheets = (currentStylesheet: ShwStylesheets) => {
    // we need a fallback in case the `currentStylesheet` is not found in the `STYLESHEETS_MAPPING` list
    // note: this may happen if the underlying code/names has changed but the `currentStylesheet` is read from local storage
    const styleSheetToActivate: ShwStylesheets = STYLESHEETS_MAPPING[
      currentStylesheet
    ]
      ? currentStylesheet
      : 'standard';

    // toggle the stylesheets `disabled` attribute depending on the current choice
    ALL_STYLESHEETS_IDS.forEach((id) => {
      const stylesheetElement = document.getElementById(id);
      const activate = STYLESHEETS_MAPPING[styleSheetToActivate].includes(id);
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

  setStylesheet = (stylesheet: ShwStylesheets) => {
    if (stylesheet !== this._currentStylesheet) {
      this._currentStylesheet = stylesheet;
      this._updatePageStylesheets(this._currentStylesheet);
    }

    // store the current stylesheet in local storage
    localStorage.setItem(
      LOCALSTORAGE_CURRENT_STYLESHEET,
      this._currentStylesheet,
    );
  };

  get currentStylesheet(): ShwStylesheets {
    return this._currentStylesheet;
  }
}
