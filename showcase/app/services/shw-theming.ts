import HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';
import type {
  OnSetThemeCallback,
  HdsThemes,
  HdsModes,
} from '@hashicorp/design-system-components/services/hds-theming';

export default class ShwThemingService extends HdsThemingService {
  globalOnSetTheme: OnSetThemeCallback = ({
    currentTheme,
    currentMode,
  }: {
    currentTheme: HdsThemes;
    currentMode: HdsModes;
  }) => {
    console.log('EXTENDED SERVICE', currentTheme, currentMode);
  };
}
