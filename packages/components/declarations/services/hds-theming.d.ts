import Service from '@ember/service';
export declare const LOCALSTORAGE_KEY = "hds-current-theme";
export declare enum HdsThemeValues {
    Auto = "auto",
    Light = "light",
    Dark = "dark"
}
export type HdsThemes = `${HdsThemeValues}` | undefined;
export declare const THEMES: string[];
export default class HdsThemingService extends Service {
    _currentTheme: HdsThemes;
    constructor(owner: object | undefined);
    initializeTheme(): void;
    getTheme(): HdsThemes;
    setTheme(theme: HdsThemes): void;
}
//# sourceMappingURL=hds-theming.d.ts.map