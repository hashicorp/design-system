import Service from '@ember/service';
import type { HdsThemes } from './types.ts';
export declare const THEMES: string[];
export default class HdsThemingService extends Service {
    _currentTheme: HdsThemes;
    getTheme(): HdsThemes;
    setTheme(theme: HdsThemes): void;
}
//# sourceMappingURL=index.d.ts.map