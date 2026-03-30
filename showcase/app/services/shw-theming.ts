import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import HdsThemingService, {
  THEMES,
  MODES_LIGHT,
  MODES_DARK,
} from '@hashicorp/design-system-components/services/hds-theming';

import type {
  HdsThemes,
  HdsModesLight,
  HdsModesDark,
  HdsSetThemeArgs,
  HdsThemingOptions,
} from '@hashicorp/design-system-components/services/hds-theming';

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
const LOCALSTORAGE_CURRENT_THEMING_DATA = 'shw-theming-current-theming-data';

type StoredThemingData = {
  theme: HdsThemes | undefined;
  options: HdsThemingOptions;
};

// We use these guard functions to check if the data parsed from `localStorage` conforms to the expected types/shapes and so is safe to use.
// This prevents the application from using corrupted, malformed or malicious data, by validating the object structure, theme, and mode values.

function isSafeStylesheetData(data: string): data is ShwStylesheets {
  return STYLESHEETS.includes(data as ShwStylesheets);
}

function isSafeStoredThemingData(data: unknown): data is StoredThemingData {
  if (typeof data !== 'object' || data === null) return false;

  const d = data as Record<string, unknown>;

  const isSafeThemeData =
    // Case: there is no stored `theme` key in the object (eg. the `default` theme was selected)
    !('theme' in d) ||
    // Case: there is a `theme` value and is one of the valid `HdsThemes`
    d['theme'] === undefined ||
    THEMES.includes(d['theme'] as HdsThemes);

  const options = d['options'] as Record<string, unknown> | undefined;

  const isSafeOptionsData =
    // Case: there is no stored `options` key in the object (eg. it's the first run of the application)
    !('options' in d) ||
    // Case: there is an `options` value and has valid entries
    (typeof options === 'object' &&
      options !== null &&
      'lightTheme' in options &&
      MODES_LIGHT.includes(options['lightTheme'] as HdsModesLight) &&
      'darkTheme' in options &&
      MODES_DARK.includes(options['darkTheme'] as HdsModesDark));

  return isSafeThemeData && isSafeOptionsData;
}

export default class ShwThemingService extends HdsThemingService {
  @service declare readonly hdsTheming: HdsThemingService;

  @tracked _currentStylesheet: ShwStylesheets = 'standard';

  initialize() {
    // Initialize stylesheet from localStorage
    const storedStylesheet = localStorage.getItem(
      LOCALSTORAGE_CURRENT_STYLESHEET,
    ) as ShwStylesheets;
    if (storedStylesheet && isSafeStylesheetData(storedStylesheet)) {
      this.setStylesheet(storedStylesheet);
    } else {
      // if data is not safe or malformed, reset stylesheet to its default
      this.setStylesheet('standard');
    }

    // Initialize HDS theme from localStorage
    const rawStoredThemingData = localStorage.getItem(
      LOCALSTORAGE_CURRENT_THEMING_DATA,
    );

    if (rawStoredThemingData !== null) {
      let storedThemingData: unknown;
      try {
        storedThemingData = JSON.parse(rawStoredThemingData);
      } catch (error) {
        // malformed JSON in localStorage, ignore and proceed with defaults
        console.error(
          `Error while reading local storage '${LOCALSTORAGE_CURRENT_THEMING_DATA}' for theming`,
          error,
        );
      }

      if (isSafeStoredThemingData(storedThemingData)) {
        this.setAppTheme({
          theme: storedThemingData.theme,
          options: storedThemingData.options,
        });
      } else {
        // if data is not safe or malformed, reset theming to its defaults
        this.setAppTheme({
          theme: undefined,
          options: undefined,
        });
      }
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

  setAppTheme = ({ theme, options, onSetTheme }: HdsSetThemeArgs) => {
    localStorage.setItem(
      LOCALSTORAGE_CURRENT_THEMING_DATA,
      JSON.stringify({ theme, options }),
    );
    this.hdsTheming.setTheme({ theme, options, onSetTheme });
  };

  get currentStylesheet(): ShwStylesheets {
    return this._currentStylesheet;
  }
}
