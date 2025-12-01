import { HdsIconSizeValues } from '../components/hds/icon/types.ts';

import type { IconName } from '@hashicorp/flight-icons/svg';
import type { HdsIconSizes } from '../components/hds/icon/types.ts';

export interface CarbonIconAttrs {
  viewBox: string;
  width: number | string;
  height: number | string;
}

export type CarbonIconNodeAttrs = {
  width: number;
  height: number;
  d?: string;
  cx?: number | string;
  cy?: number | string;
  r?: number | string;
  x?: number | string;
  y?: number | string;
  points?: string;
  opacity?: number | string;
  transform?: string;
  fill?: string;
  stroke?: string;
  'stroke-width'?: number | string;
  'stroke-linecap'?: string;
  'stroke-linejoin'?: string;
  'stroke-miterlimit'?: string;
  // allow anything else but still narrow to AttrValue-like types
  [key: string]: string | number | undefined;
};

export interface CarbonIconContent {
  elem: string;
  attrs: CarbonIconNodeAttrs;
}

export interface CarbonIcon {
  attrs: CarbonIconAttrs;
  content: CarbonIconContent[];
  name: string;
  size: string | number;
}

export interface IconMapItem {
  hdsIconName: IconName;
  carbonIconName: string;
  importCarbonIcon: (size?: HdsIconSizes) => Promise<unknown>;
}

export function getByHdsIconName(
  hdsIconName: IconName
): IconMapItem | undefined {
  return hdsCarbonIconList.find((item) => item.hdsIconName === hdsIconName);
}

export const hdsCarbonIconList: IconMapItem[] = [
  {
    hdsIconName: 'accessibility',
    carbonIconName: 'accessibility--alt',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/accessibility--alt/16')
        : await import('@carbon/icons/es/accessibility--alt/24');
    },
  },
  {
    hdsIconName: 'activity',
    carbonIconName: 'activity',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/activity/16')
        : await import('@carbon/icons/es/activity/24');
    },
  },
  {
    hdsIconName: 'alert-circle',
    carbonIconName: 'warning',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/warning/16')
        : await import('@carbon/icons/es/warning/24');
    },
  },
  {
    hdsIconName: 'alert-circle-fill',
    carbonIconName: 'warning--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/warning--filled/16')
        : await import('@carbon/icons/es/warning--filled/24');
    },
  },
  {
    hdsIconName: 'alert-diamond',
    carbonIconName: 'warning--diamond',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/warning--diamond/16')
        : await import('@carbon/icons/es/warning--diamond/24');
    },
  },
  {
    hdsIconName: 'alert-octagon',
    carbonIconName: 'warning--hex',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/warning--hex/16')
        : await import('@carbon/icons/es/warning--hex/24');
    },
  },
  {
    hdsIconName: 'alert-octagon-fill',
    carbonIconName: 'warning--hex--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/warning--hex--filled/16')
        : await import('@carbon/icons/es/warning--hex--filled/24');
    },
  },
  {
    hdsIconName: 'alert-triangle',
    carbonIconName: 'warning--alt',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/warning--alt/16')
        : await import('@carbon/icons/es/warning--alt/24');
    },
  },
  {
    hdsIconName: 'alert-triangle-fill',
    carbonIconName: 'warning--alt--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/warning--alt--filled/16')
        : await import('@carbon/icons/es/warning--alt--filled/24');
    },
  },
  {
    hdsIconName: 'align-center',
    carbonIconName: 'text--align--center',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/text--align--center/16')
        : await import('@carbon/icons/es/text--align--center/24');
    },
  },
  {
    hdsIconName: 'align-justify',
    carbonIconName: 'text--align--justify',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/text--align--justify/16')
        : await import('@carbon/icons/es/text--align--justify/24');
    },
  },
  {
    hdsIconName: 'align-left',
    carbonIconName: 'text--align--left',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/text--align--left/16')
        : await import('@carbon/icons/es/text--align--left/24');
    },
  },
  {
    hdsIconName: 'align-right',
    carbonIconName: 'text--align--right',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/text--align--right/16')
        : await import('@carbon/icons/es/text--align--right/24');
    },
  },
  {
    hdsIconName: 'api',
    carbonIconName: 'api',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/api/16')
        : await import('@carbon/icons/es/api/24');
    },
  },
  {
    hdsIconName: 'archive',
    carbonIconName: 'box',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/box/16')
        : await import('@carbon/icons/es/box/24');
    },
  },
  {
    hdsIconName: 'arrow-down',
    carbonIconName: 'arrow--down',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/arrow--down/16')
        : await import('@carbon/icons/es/arrow--down/24');
    },
  },
  {
    hdsIconName: 'arrow-down-circle',
    carbonIconName: 'previous--outline',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/previous--outline/16')
        : await import('@carbon/icons/es/previous--outline/24');
    },
  },
  {
    hdsIconName: 'arrow-down-left',
    carbonIconName: 'arrow--down-left',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/arrow--down-left/16')
        : await import('@carbon/icons/es/arrow--down-left/24');
    },
  },
  {
    hdsIconName: 'arrow-down-right',
    carbonIconName: 'arrow--down-right',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/arrow--down-right/16')
        : await import('@carbon/icons/es/arrow--down-right/24');
    },
  },
  {
    hdsIconName: 'arrow-left',
    carbonIconName: 'arrow--left',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/arrow--left/16')
        : await import('@carbon/icons/es/arrow--left/24');
    },
  },
  {
    hdsIconName: 'arrow-left-circle',
    carbonIconName: 'next--outline',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/next--outline/16')
        : await import('@carbon/icons/es/next--outline/24');
    },
  },
  {
    hdsIconName: 'arrow-right',
    carbonIconName: 'arrow--right',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/arrow--right/16')
        : await import('@carbon/icons/es/arrow--right/24');
    },
  },
  {
    hdsIconName: 'arrow-up',
    carbonIconName: 'arrow--up',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/arrow--up/16')
        : await import('@carbon/icons/es/arrow--up/24');
    },
  },
  {
    hdsIconName: 'arrow-up-left',
    carbonIconName: 'arrow--up-left',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/arrow--up-left/16')
        : await import('@carbon/icons/es/arrow--up-left/24');
    },
  },
  {
    hdsIconName: 'arrow-up-right',
    carbonIconName: 'arrow--up-right',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/arrow--up-right/16')
        : await import('@carbon/icons/es/arrow--up-right/24');
    },
  },
  {
    hdsIconName: 'at-sign',
    carbonIconName: 'at',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/at/16')
        : await import('@carbon/icons/es/at/24');
    },
  },
  {
    hdsIconName: 'award',
    carbonIconName: 'recommend',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/recommend/16')
        : await import('@carbon/icons/es/recommend/24');
    },
  },
  {
    hdsIconName: 'bar-chart',
    carbonIconName: 'chart--column',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chart--column/16')
        : await import('@carbon/icons/es/chart--column/24');
    },
  },
  {
    hdsIconName: 'bar-chart-alt',
    carbonIconName: 'chart--column',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chart--column/16')
        : await import('@carbon/icons/es/chart--column/24');
    },
  },
  {
    hdsIconName: 'battery',
    carbonIconName: 'battery--empty',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/battery--empty/16')
        : await import('@carbon/icons/es/battery--empty/24');
    },
  },
  {
    hdsIconName: 'battery-charging',
    carbonIconName: 'battery--charging',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/battery--charging/16')
        : await import('@carbon/icons/es/battery--charging/24');
    },
  },
  {
    hdsIconName: 'beaker',
    carbonIconName: 'chemistry',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chemistry/16')
        : await import('@carbon/icons/es/chemistry/24');
    },
  },
  {
    hdsIconName: 'bell',
    carbonIconName: 'notification',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/notification/16')
        : await import('@carbon/icons/es/notification/24');
    },
  },
  {
    hdsIconName: 'bell-active',
    carbonIconName: 'notification--new',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/notification--new/16')
        : await import('@carbon/icons/es/notification--new/24');
    },
  },
  {
    hdsIconName: 'bell-off',
    carbonIconName: 'notification--off',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/notification--off/16')
        : await import('@carbon/icons/es/notification--off/24');
    },
  },
  {
    hdsIconName: 'bookmark',
    carbonIconName: 'bookmark',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/bookmark/16')
        : await import('@carbon/icons/es/bookmark/24');
    },
  },
  {
    hdsIconName: 'bookmark-add',
    carbonIconName: 'bookmark--add',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/bookmark--add/16')
        : await import('@carbon/icons/es/bookmark--add/24');
    },
  },
  {
    hdsIconName: 'bookmark-fill',
    carbonIconName: 'bookmark--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/bookmark--filled/16')
        : await import('@carbon/icons/es/bookmark--filled/24');
    },
  },
  {
    hdsIconName: 'bottom',
    carbonIconName: 'down-to-bottom',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/down-to-bottom/16')
        : await import('@carbon/icons/es/down-to-bottom/24');
    },
  },
  {
    hdsIconName: 'box',
    carbonIconName: 'cube',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/cube/16')
        : await import('@carbon/icons/es/cube/24');
    },
  },
  {
    hdsIconName: 'briefcase',
    carbonIconName: 'portfolio',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/portfolio/16')
        : await import('@carbon/icons/es/portfolio/24');
    },
  },
  {
    hdsIconName: 'bucket',
    carbonIconName: 'container--image',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/container--image/16')
        : await import('@carbon/icons/es/container--image/24');
    },
  },
  {
    hdsIconName: 'bug',
    carbonIconName: 'debug',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/debug/16')
        : await import('@carbon/icons/es/debug/24');
    },
  },
  {
    hdsIconName: 'build',
    carbonIconName: 'tools',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/tools/16')
        : await import('@carbon/icons/es/tools/24');
    },
  },
  {
    hdsIconName: 'bulb',
    carbonIconName: 'idea',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/idea/16')
        : await import('@carbon/icons/es/idea/24');
    },
  },
  {
    hdsIconName: 'calendar',
    carbonIconName: 'calendar',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/calendar/16')
        : await import('@carbon/icons/es/calendar/24');
    },
  },
  {
    hdsIconName: 'camera',
    carbonIconName: 'camera',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/camera/16')
        : await import('@carbon/icons/es/camera/24');
    },
  },
  {
    hdsIconName: 'caret',
    carbonIconName: 'chevron--sort',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chevron--sort/16')
        : await import('@carbon/icons/es/chevron--sort/24');
    },
  },
  {
    hdsIconName: 'cast',
    carbonIconName: 'media-cast',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/media-cast/16')
        : await import('@carbon/icons/es/media-cast/24');
    },
  },
  {
    hdsIconName: 'certificate',
    carbonIconName: 'policy',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/policy/16')
        : await import('@carbon/icons/es/policy/24');
    },
  },
  {
    hdsIconName: 'channel',
    carbonIconName: 'network--2',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/network--2/16')
        : await import('@carbon/icons/es/network--2/24');
    },
  },
  {
    hdsIconName: 'check',
    carbonIconName: 'checkmark',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/checkmark/16')
        : await import('@carbon/icons/es/checkmark/24');
    },
  },
  {
    hdsIconName: 'check-circle',
    carbonIconName: 'checkmark--outline',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/checkmark--outline/16')
        : await import('@carbon/icons/es/checkmark--outline/24');
    },
  },
  {
    hdsIconName: 'check-circle-fill',
    carbonIconName: 'checkmark--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/checkmark--filled/16')
        : await import('@carbon/icons/es/checkmark--filled/24');
    },
  },
  {
    hdsIconName: 'check-square',
    carbonIconName: 'checkbox--checked',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/checkbox--checked/16')
        : await import('@carbon/icons/es/checkbox--checked/24');
    },
  },
  {
    hdsIconName: 'check-square-fill',
    carbonIconName: 'checkbox--checked--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/checkbox--checked--filled/16')
        : await import('@carbon/icons/es/checkbox--checked--filled/24');
    },
  },
  {
    hdsIconName: 'chevron-down',
    carbonIconName: 'chevron--down',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chevron--down/16')
        : await import('@carbon/icons/es/chevron--down/24');
    },
  },
  {
    hdsIconName: 'chevron-left',
    carbonIconName: 'chevron--left',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chevron--left/16')
        : await import('@carbon/icons/es/chevron--left/24');
    },
  },
  {
    hdsIconName: 'chevron-right',
    carbonIconName: 'chevron--right',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chevron--right/16')
        : await import('@carbon/icons/es/chevron--right/24');
    },
  },
  {
    hdsIconName: 'chevron-up',
    carbonIconName: 'chevron--up',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chevron--up/16')
        : await import('@carbon/icons/es/chevron--up/24');
    },
  },
  {
    hdsIconName: 'circle',
    carbonIconName: 'circle--outline',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/circle--outline/16')
        : await import('@carbon/icons/es/circle--outline/24');
    },
  },
  {
    hdsIconName: 'circle-dot',
    carbonIconName: 'circle--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/circle--filled/16')
        : await import('@carbon/icons/es/circle--filled/24');
    },
  },
  {
    hdsIconName: 'circle-fill',
    carbonIconName: 'circle--solid',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/circle--solid/16')
        : await import('@carbon/icons/es/circle--solid/24');
    },
  },
  {
    hdsIconName: 'circle-half',
    carbonIconName: 'contrast',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/contrast/16')
        : await import('@carbon/icons/es/contrast/24');
    },
  },
  {
    hdsIconName: 'clipboard',
    carbonIconName: 'report',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/report/16')
        : await import('@carbon/icons/es/report/24');
    },
  },
  {
    hdsIconName: 'clipboard-checked',
    carbonIconName: 'task--complete',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/task--complete/16')
        : await import('@carbon/icons/es/task--complete/24');
    },
  },
  {
    hdsIconName: 'clipboard-x',
    carbonIconName: 'task--remove',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/task--remove/16')
        : await import('@carbon/icons/es/task--remove/24');
    },
  },
  {
    hdsIconName: 'clock',
    carbonIconName: 'time',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/time/16')
        : await import('@carbon/icons/es/time/24');
    },
  },
  {
    hdsIconName: 'clock-filled',
    carbonIconName: 'time--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/time--filled/16')
        : await import('@carbon/icons/es/time--filled/24');
    },
  },
  {
    hdsIconName: 'closed-caption',
    carbonIconName: 'closed-caption',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/closed-caption/16')
        : await import('@carbon/icons/es/closed-caption/24');
    },
  },
  {
    hdsIconName: 'cloud',
    carbonIconName: 'cloud',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/cloud/16')
        : await import('@carbon/icons/es/cloud/24');
    },
  },
  {
    hdsIconName: 'cloud-download',
    carbonIconName: 'cloud--download',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/cloud--download/16')
        : await import('@carbon/icons/es/cloud--download/24');
    },
  },
  {
    hdsIconName: 'cloud-lock',
    carbonIconName: 'virtual-private-cloud',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/virtual-private-cloud/16')
        : await import('@carbon/icons/es/virtual-private-cloud/24');
    },
  },
  {
    hdsIconName: 'cloud-off',
    carbonIconName: 'cloud--offline',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/cloud--offline/16')
        : await import('@carbon/icons/es/cloud--offline/24');
    },
  },
  {
    hdsIconName: 'cloud-upload',
    carbonIconName: 'cloud--upload',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/cloud--upload/16')
        : await import('@carbon/icons/es/cloud--upload/24');
    },
  },
  {
    hdsIconName: 'code',
    carbonIconName: 'code',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/code/16')
        : await import('@carbon/icons/es/code/24');
    },
  },
  {
    hdsIconName: 'collections',
    carbonIconName: 'document--multiple-02',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/document--multiple-02/16')
        : await import('@carbon/icons/es/document--multiple-02/24');
    },
  },
  {
    hdsIconName: 'command',
    carbonIconName: 'mac--command',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/mac--command/16')
        : await import('@carbon/icons/es/mac--command/24');
    },
  },
  {
    hdsIconName: 'compass',
    carbonIconName: 'explore',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/explore/16')
        : await import('@carbon/icons/es/explore/24');
    },
  },
  {
    hdsIconName: 'connection-gateway',
    carbonIconName: 'network--4',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/network--4/16')
        : await import('@carbon/icons/es/network--4/24');
    },
  },
  {
    hdsIconName: 'cpu',
    carbonIconName: 'chip',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chip/16')
        : await import('@carbon/icons/es/chip/24');
    },
  },
  {
    hdsIconName: 'credit-card',
    carbonIconName: 'purchase',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/purchase/16')
        : await import('@carbon/icons/es/purchase/24');
    },
  },
  {
    hdsIconName: 'crop',
    carbonIconName: 'crop',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/crop/16')
        : await import('@carbon/icons/es/crop/24');
    },
  },
  {
    hdsIconName: 'crosshair',
    carbonIconName: 'center--circle',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/center--circle/16')
        : await import('@carbon/icons/es/center--circle/24');
    },
  },
  {
    hdsIconName: 'dashboard',
    carbonIconName: 'dashboard',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/dashboard/16')
        : await import('@carbon/icons/es/dashboard/24');
    },
  },
  {
    hdsIconName: 'database',
    carbonIconName: 'data--base',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/data--base/16')
        : await import('@carbon/icons/es/data--base/24');
    },
  },
  {
    hdsIconName: 'delete',
    carbonIconName: 'delete',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/delete/16')
        : await import('@carbon/icons/es/delete/24');
    },
  },
  {
    hdsIconName: 'diamond',
    carbonIconName: 'diamond--outline',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/diamond--outline/16')
        : await import('@carbon/icons/es/diamond--outline/24');
    },
  },
  {
    hdsIconName: 'disc',
    carbonIconName: 'recording',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/recording/16')
        : await import('@carbon/icons/es/recording/24');
    },
  },
  {
    hdsIconName: 'discussion-circle',
    carbonIconName: 'forum',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/forum/16')
        : await import('@carbon/icons/es/forum/24');
    },
  },
  {
    hdsIconName: 'discussion-square',
    carbonIconName: 'forum',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/forum/16')
        : await import('@carbon/icons/es/forum/24');
    },
  },
  {
    hdsIconName: 'docs',
    carbonIconName: 'document',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/document/16')
        : await import('@carbon/icons/es/document/24');
    },
  },
  {
    hdsIconName: 'docs-download',
    carbonIconName: 'document--download',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/document--download/16')
        : await import('@carbon/icons/es/document--download/24');
    },
  },
  {
    hdsIconName: 'dollar-sign',
    carbonIconName: 'currency--dollar',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/currency--dollar/16')
        : await import('@carbon/icons/es/currency--dollar/24');
    },
  },
  {
    hdsIconName: 'dot',
    carbonIconName: 'dot-mark',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/dot-mark/16')
        : await import('@carbon/icons/es/dot-mark/24');
    },
  },
  {
    hdsIconName: 'download',
    carbonIconName: 'download',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/download/16')
        : await import('@carbon/icons/es/download/24');
    },
  },
  {
    hdsIconName: 'droplet',
    carbonIconName: 'rain-drop',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/rain-drop/16')
        : await import('@carbon/icons/es/rain-drop/24');
    },
  },
  {
    hdsIconName: 'duplicate',
    carbonIconName: 'copy',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/copy/16')
        : await import('@carbon/icons/es/copy/24');
    },
  },
  {
    hdsIconName: 'edit',
    carbonIconName: 'edit',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/edit/16')
        : await import('@carbon/icons/es/edit/24');
    },
  },
  {
    hdsIconName: 'end',
    carbonIconName: 'page--last',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/page--last/16')
        : await import('@carbon/icons/es/page--last/24');
    },
  },
  {
    hdsIconName: 'enterprise',
    carbonIconName: 'enterprise',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/enterprise/16')
        : await import('@carbon/icons/es/enterprise/24');
    },
  },
  {
    hdsIconName: 'entry-point',
    carbonIconName: 'port--input',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/port--input/16')
        : await import('@carbon/icons/es/port--input/24');
    },
  },
  {
    hdsIconName: 'event',
    carbonIconName: 'event',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/event/16')
        : await import('@carbon/icons/es/event/24');
    },
  },
  {
    hdsIconName: 'exit-point',
    carbonIconName: 'port--output',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/port--output/16')
        : await import('@carbon/icons/es/port--output/24');
    },
  },
  {
    hdsIconName: 'external-link',
    carbonIconName: 'launch',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/launch/16')
        : await import('@carbon/icons/es/launch/24');
    },
  },
  {
    hdsIconName: 'eye',
    carbonIconName: 'view',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/view/16')
        : await import('@carbon/icons/es/view/24');
    },
  },
  {
    hdsIconName: 'eye-off',
    carbonIconName: 'view--off',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/view--off/16')
        : await import('@carbon/icons/es/view--off/24');
    },
  },
  {
    hdsIconName: 'file',
    carbonIconName: 'document--blank',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/document--blank/16')
        : await import('@carbon/icons/es/document--blank/24');
    },
  },
  {
    hdsIconName: 'file-check',
    carbonIconName: 'document--tasks',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/document--tasks/16')
        : await import('@carbon/icons/es/document--tasks/24');
    },
  },
  {
    hdsIconName: 'file-minus',
    carbonIconName: 'document--subtract',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/document--subtract/16')
        : await import('@carbon/icons/es/document--subtract/24');
    },
  },
  {
    hdsIconName: 'file-plus',
    carbonIconName: 'document--add',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/document--add/16')
        : await import('@carbon/icons/es/document--add/24');
    },
  },
  {
    hdsIconName: 'file-source',
    carbonIconName: 'script',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/script/16')
        : await import('@carbon/icons/es/script/24');
    },
  },
  {
    hdsIconName: 'file-text',
    carbonIconName: 'document',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/document/16')
        : await import('@carbon/icons/es/document/24');
    },
  },
  {
    hdsIconName: 'files',
    carbonIconName: 'document--multiple-02',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/document--multiple-02/16')
        : await import('@carbon/icons/es/document--multiple-02/24');
    },
  },
  {
    hdsIconName: 'filter',
    carbonIconName: 'filter',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/filter/16')
        : await import('@carbon/icons/es/filter/24');
    },
  },
  {
    hdsIconName: 'filter-circle',
    carbonIconName: 'filter',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/filter/16')
        : await import('@carbon/icons/es/filter/24');
    },
  },
  {
    hdsIconName: 'filter-fill',
    carbonIconName: 'filter',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/filter/16')
        : await import('@carbon/icons/es/filter/24');
    },
  },
  {
    hdsIconName: 'fingerprint',
    carbonIconName: 'fingerprint-recognition',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/fingerprint-recognition/16')
        : await import('@carbon/icons/es/fingerprint-recognition/24');
    },
  },
  {
    hdsIconName: 'flag',
    carbonIconName: 'flag',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/flag/16')
        : await import('@carbon/icons/es/flag/24');
    },
  },
  {
    hdsIconName: 'folder',
    carbonIconName: 'folder',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/folder/16')
        : await import('@carbon/icons/es/folder/24');
    },
  },
  {
    hdsIconName: 'folder-plus',
    carbonIconName: 'folder--add',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/folder--add/16')
        : await import('@carbon/icons/es/folder--add/24');
    },
  },
  {
    hdsIconName: 'folder-users',
    carbonIconName: 'folder--shared',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/folder--shared/16')
        : await import('@carbon/icons/es/folder--shared/24');
    },
  },
  {
    hdsIconName: 'gateway',
    carbonIconName: 'gateway',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/gateway/16')
        : await import('@carbon/icons/es/gateway/24');
    },
  },
  {
    hdsIconName: 'gift',
    carbonIconName: 'gift',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/gift/16')
        : await import('@carbon/icons/es/gift/24');
    },
  },
  {
    hdsIconName: 'git-branch',
    carbonIconName: 'branch',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/branch/16')
        : await import('@carbon/icons/es/branch/24');
    },
  },
  {
    hdsIconName: 'git-commit',
    carbonIconName: 'commit',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/commit/16')
        : await import('@carbon/icons/es/commit/24');
    },
  },
  {
    hdsIconName: 'git-merge',
    carbonIconName: 'merge',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/merge/16')
        : await import('@carbon/icons/es/merge/24');
    },
  },
  {
    hdsIconName: 'git-pull-request',
    carbonIconName: 'pull-request',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/pull-request/16')
        : await import('@carbon/icons/es/pull-request/24');
    },
  },
  {
    hdsIconName: 'globe',
    carbonIconName: 'wikis',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/wikis/16')
        : await import('@carbon/icons/es/wikis/24');
    },
  },
  {
    hdsIconName: 'government',
    carbonIconName: 'finance',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/finance/16')
        : await import('@carbon/icons/es/finance/24');
    },
  },
  {
    hdsIconName: 'grid',
    carbonIconName: 'grid',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/grid/16')
        : await import('@carbon/icons/es/grid/24');
    },
  },
  {
    hdsIconName: 'grid-alt',
    carbonIconName: 'thumbnail--2',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/thumbnail--2/16')
        : await import('@carbon/icons/es/thumbnail--2/24');
    },
  },
  {
    hdsIconName: 'guide',
    carbonIconName: 'book',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/book/16')
        : await import('@carbon/icons/es/book/24');
    },
  },
  {
    hdsIconName: 'handshake',
    carbonIconName: 'partnership',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/partnership/16')
        : await import('@carbon/icons/es/partnership/24');
    },
  },
  {
    hdsIconName: 'hard-drive',
    carbonIconName: 'vmdk-disk',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/vmdk-disk/16')
        : await import('@carbon/icons/es/vmdk-disk/24');
    },
  },
  {
    hdsIconName: 'hash',
    carbonIconName: 'hashtag',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/hashtag/16')
        : await import('@carbon/icons/es/hashtag/24');
    },
  },
  {
    hdsIconName: 'headphones',
    carbonIconName: 'headphones',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/headphones/16')
        : await import('@carbon/icons/es/headphones/24');
    },
  },
  {
    hdsIconName: 'heart',
    carbonIconName: 'favorite',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/favorite/16')
        : await import('@carbon/icons/es/favorite/24');
    },
  },
  {
    hdsIconName: 'heart-fill',
    carbonIconName: 'favorite--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/favorite--filled/16')
        : await import('@carbon/icons/es/favorite--filled/24');
    },
  },
  {
    hdsIconName: 'help',
    carbonIconName: 'help',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/help/16')
        : await import('@carbon/icons/es/help/24');
    },
  },
  {
    hdsIconName: 'hexagon',
    carbonIconName: 'hexagon--outline',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/hexagon--outline/16')
        : await import('@carbon/icons/es/hexagon--outline/24');
    },
  },
  {
    hdsIconName: 'hexagon-fill',
    carbonIconName: 'hexagon--solid',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/hexagon--solid/16')
        : await import('@carbon/icons/es/hexagon--solid/24');
    },
  },
  {
    hdsIconName: 'history',
    carbonIconName: 'recently-viewed',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/recently-viewed/16')
        : await import('@carbon/icons/es/recently-viewed/24');
    },
  },
  {
    hdsIconName: 'home',
    carbonIconName: 'tools',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/tools/16')
        : await import('@carbon/icons/es/tools/24');
    },
  },
  {
    hdsIconName: 'hourglass',
    carbonIconName: 'hourglass',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/hourglass/16')
        : await import('@carbon/icons/es/hourglass/24');
    },
  },
  {
    hdsIconName: 'identity-service',
    carbonIconName: 'service-id',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/service-id/16')
        : await import('@carbon/icons/es/service-id/24');
    },
  },
  {
    hdsIconName: 'identity-user',
    carbonIconName: 'identification',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/identification/16')
        : await import('@carbon/icons/es/identification/24');
    },
  },
  {
    hdsIconName: 'image',
    carbonIconName: 'image',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/image/16')
        : await import('@carbon/icons/es/image/24');
    },
  },
  {
    hdsIconName: 'info',
    carbonIconName: 'information',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/information/16')
        : await import('@carbon/icons/es/information/24');
    },
  },
  {
    hdsIconName: 'info-fill',
    carbonIconName: 'information--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/information--filled/16')
        : await import('@carbon/icons/es/information--filled/24');
    },
  },
  {
    hdsIconName: 'jump-link',
    carbonIconName: 'jump-link',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/jump-link/16')
        : await import('@carbon/icons/es/jump-link/24');
    },
  },
  {
    hdsIconName: 'key',
    carbonIconName: 'password',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/password/16')
        : await import('@carbon/icons/es/password/24');
    },
  },
  {
    hdsIconName: 'layers',
    carbonIconName: 'layers',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/layers/16')
        : await import('@carbon/icons/es/layers/24');
    },
  },
  {
    hdsIconName: 'layout',
    carbonIconName: 'template',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/template/16')
        : await import('@carbon/icons/es/template/24');
    },
  },
  {
    hdsIconName: 'learn',
    carbonIconName: 'education',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/education/16')
        : await import('@carbon/icons/es/education/24');
    },
  },
  {
    hdsIconName: 'line-chart',
    carbonIconName: 'chart--line',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chart--line/16')
        : await import('@carbon/icons/es/chart--line/24');
    },
  },
  {
    hdsIconName: 'line-chart-up',
    carbonIconName: 'chart--line',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chart--line/16')
        : await import('@carbon/icons/es/chart--line/24');
    },
  },
  {
    hdsIconName: 'link',
    carbonIconName: 'link',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/link/16')
        : await import('@carbon/icons/es/link/24');
    },
  },
  {
    hdsIconName: 'list',
    carbonIconName: 'list',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/list/16')
        : await import('@carbon/icons/es/list/24');
    },
  },
  {
    hdsIconName: 'load-balancer',
    carbonIconName: 'load-balancer--classic',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/load-balancer--classic/16')
        : await import('@carbon/icons/es/load-balancer--classic/24');
    },
  },
  {
    hdsIconName: 'lock',
    carbonIconName: 'locked',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/locked/16')
        : await import('@carbon/icons/es/locked/24');
    },
  },
  {
    hdsIconName: 'logs',
    carbonIconName: 'cloud--logging',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/cloud--logging/16')
        : await import('@carbon/icons/es/cloud--logging/24');
    },
  },
  {
    hdsIconName: 'mail',
    carbonIconName: 'email',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/email/16')
        : await import('@carbon/icons/es/email/24');
    },
  },
  {
    hdsIconName: 'map',
    carbonIconName: 'map',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/map/16')
        : await import('@carbon/icons/es/map/24');
    },
  },
  {
    hdsIconName: 'map-pin',
    carbonIconName: 'location',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/location/16')
        : await import('@carbon/icons/es/location/24');
    },
  },
  {
    hdsIconName: 'maximize',
    carbonIconName: 'maximize',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/maximize/16')
        : await import('@carbon/icons/es/maximize/24');
    },
  },
  {
    hdsIconName: 'maximize-alt',
    carbonIconName: 'maximize',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/maximize/16')
        : await import('@carbon/icons/es/maximize/24');
    },
  },
  {
    hdsIconName: 'meh',
    carbonIconName: 'face--neutral',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/face--neutral/16')
        : await import('@carbon/icons/es/face--neutral/24');
    },
  },
  {
    hdsIconName: 'menu',
    carbonIconName: 'menu',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/menu/16')
        : await import('@carbon/icons/es/menu/24');
    },
  },
  {
    hdsIconName: 'mesh',
    carbonIconName: 'model',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/model/16')
        : await import('@carbon/icons/es/model/24');
    },
  },
  {
    hdsIconName: 'message-circle',
    carbonIconName: 'chat',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chat/16')
        : await import('@carbon/icons/es/chat/24');
    },
  },
  {
    hdsIconName: 'message-circle-fill',
    carbonIconName: 'chat',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chat/16')
        : await import('@carbon/icons/es/chat/24');
    },
  },
  {
    hdsIconName: 'message-square',
    carbonIconName: 'chat',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chat/16')
        : await import('@carbon/icons/es/chat/24');
    },
  },
  {
    hdsIconName: 'message-square-fill',
    carbonIconName: 'chat',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chat/16')
        : await import('@carbon/icons/es/chat/24');
    },
  },
  {
    hdsIconName: 'mic',
    carbonIconName: 'microphone',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/microphone/16')
        : await import('@carbon/icons/es/microphone/24');
    },
  },
  {
    hdsIconName: 'mic-off',
    carbonIconName: 'microphone--off',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/microphone--off/16')
        : await import('@carbon/icons/es/microphone--off/24');
    },
  },
  {
    hdsIconName: 'migrate',
    carbonIconName: 'migrate--alt',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/migrate--alt/16')
        : await import('@carbon/icons/es/migrate--alt/24');
    },
  },
  {
    hdsIconName: 'minimize',
    carbonIconName: 'minimize',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/minimize/16')
        : await import('@carbon/icons/es/minimize/24');
    },
  },
  {
    hdsIconName: 'minimize-alt',
    carbonIconName: 'minimize',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/minimize/16')
        : await import('@carbon/icons/es/minimize/24');
    },
  },
  {
    hdsIconName: 'minus',
    carbonIconName: 'subtract',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/subtract/16')
        : await import('@carbon/icons/es/subtract/24');
    },
  },
  {
    hdsIconName: 'minus-circle',
    carbonIconName: 'subtract--alt',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/subtract--alt/16')
        : await import('@carbon/icons/es/subtract--alt/24');
    },
  },
  {
    hdsIconName: 'minus-circle-fill',
    carbonIconName: 'subtract--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/subtract--filled/16')
        : await import('@carbon/icons/es/subtract--filled/24');
    },
  },
  {
    hdsIconName: 'monitor',
    carbonIconName: 'screen',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/screen/16')
        : await import('@carbon/icons/es/screen/24');
    },
  },
  {
    hdsIconName: 'moon',
    carbonIconName: 'moon',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/moon/16')
        : await import('@carbon/icons/es/moon/24');
    },
  },
  {
    hdsIconName: 'more-horizontal',
    carbonIconName: 'overflow-menu--horizontal',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/overflow-menu--horizontal/16')
        : await import('@carbon/icons/es/overflow-menu--horizontal/24');
    },
  },
  {
    hdsIconName: 'more-vertical',
    carbonIconName: 'overflow-menu--vertical',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/overflow-menu--vertical/16')
        : await import('@carbon/icons/es/overflow-menu--vertical/24');
    },
  },
  {
    hdsIconName: 'mouse-pointer',
    carbonIconName: 'cursor--1',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/cursor--1/16')
        : await import('@carbon/icons/es/cursor--1/24');
    },
  },
  {
    hdsIconName: 'move',
    carbonIconName: 'move',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/move/16')
        : await import('@carbon/icons/es/move/24');
    },
  },
  {
    hdsIconName: 'music',
    carbonIconName: 'music',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/music/16')
        : await import('@carbon/icons/es/music/24');
    },
  },
  {
    hdsIconName: 'navigation',
    carbonIconName: 'location--current',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/location--current/16')
        : await import('@carbon/icons/es/location--current/24');
    },
  },
  {
    hdsIconName: 'navigation-alt',
    carbonIconName: 'location--current',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/location--current/16')
        : await import('@carbon/icons/es/location--current/24');
    },
  },
  {
    hdsIconName: 'network',
    carbonIconName: 'vlan',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/vlan/16')
        : await import('@carbon/icons/es/vlan/24');
    },
  },
  {
    hdsIconName: 'network-alt',
    carbonIconName: 'network--3',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/network--3/16')
        : await import('@carbon/icons/es/network--3/24');
    },
  },
  {
    hdsIconName: 'newspaper',
    carbonIconName: 'blog',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/blog/16')
        : await import('@carbon/icons/es/blog/24');
    },
  },
  {
    hdsIconName: 'octagon',
    carbonIconName: 'stop-sign',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/stop-sign/16')
        : await import('@carbon/icons/es/stop-sign/24');
    },
  },
  {
    hdsIconName: 'org',
    carbonIconName: 'building',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/building/16')
        : await import('@carbon/icons/es/building/24');
    },
  },
  {
    hdsIconName: 'outline',
    carbonIconName: 'assignment-action--usage',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/assignment-action--usage/16')
        : await import('@carbon/icons/es/assignment-action--usage/24');
    },
  },
  {
    hdsIconName: 'paperclip',
    carbonIconName: 'attachment',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/attachment/16')
        : await import('@carbon/icons/es/attachment/24');
    },
  },
  {
    hdsIconName: 'pause',
    carbonIconName: 'pause',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/pause/16')
        : await import('@carbon/icons/es/pause/24');
    },
  },
  {
    hdsIconName: 'pen-tool',
    carbonIconName: 'pen--fountain',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/pen--fountain/16')
        : await import('@carbon/icons/es/pen--fountain/24');
    },
  },
  {
    hdsIconName: 'pencil-tool',
    carbonIconName: 'edit',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/edit/16')
        : await import('@carbon/icons/es/edit/24');
    },
  },
  {
    hdsIconName: 'phone',
    carbonIconName: 'phone',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/phone/16')
        : await import('@carbon/icons/es/phone/24');
    },
  },
  {
    hdsIconName: 'phone-call',
    carbonIconName: 'phone--voice',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/phone--voice/16')
        : await import('@carbon/icons/es/phone--voice/24');
    },
  },
  {
    hdsIconName: 'phone-off',
    carbonIconName: 'phone--off',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/phone--off/16')
        : await import('@carbon/icons/es/phone--off/24');
    },
  },
  {
    hdsIconName: 'pie-chart',
    carbonIconName: 'chart--pie',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/chart--pie/16')
        : await import('@carbon/icons/es/chart--pie/24');
    },
  },
  {
    hdsIconName: 'pin',
    carbonIconName: 'pin',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/pin/16')
        : await import('@carbon/icons/es/pin/24');
    },
  },
  {
    hdsIconName: 'pipeline',
    carbonIconName: 'pipelines',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/pipelines/16')
        : await import('@carbon/icons/es/pipelines/24');
    },
  },
  {
    hdsIconName: 'play',
    carbonIconName: 'play',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/play/16')
        : await import('@carbon/icons/es/play/24');
    },
  },
  {
    hdsIconName: 'play-circle',
    carbonIconName: 'play--outline',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/play--outline/16')
        : await import('@carbon/icons/es/play--outline/24');
    },
  },
  {
    hdsIconName: 'plug',
    carbonIconName: 'plug',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/plug/16')
        : await import('@carbon/icons/es/plug/24');
    },
  },
  {
    hdsIconName: 'plus',
    carbonIconName: 'add',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/add/16')
        : await import('@carbon/icons/es/add/24');
    },
  },
  {
    hdsIconName: 'plus-circle',
    carbonIconName: 'add--alt',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/add--alt/16')
        : await import('@carbon/icons/es/add--alt/24');
    },
  },
  {
    hdsIconName: 'plus-circle-fill',
    carbonIconName: 'add--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/add--filled/16')
        : await import('@carbon/icons/es/add--filled/24');
    },
  },
  {
    hdsIconName: 'power',
    carbonIconName: 'power',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/power/16')
        : await import('@carbon/icons/es/power/24');
    },
  },
  {
    hdsIconName: 'printer',
    carbonIconName: 'printer',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/printer/16')
        : await import('@carbon/icons/es/printer/24');
    },
  },
  {
    hdsIconName: 'radio',
    carbonIconName: 'connection-signal',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/connection-signal/16')
        : await import('@carbon/icons/es/connection-signal/24');
    },
  },
  {
    hdsIconName: 'reload',
    carbonIconName: 'restart',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/restart/16')
        : await import('@carbon/icons/es/restart/24');
    },
  },
  {
    hdsIconName: 'repeat',
    carbonIconName: 'repeat',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/repeat/16')
        : await import('@carbon/icons/es/repeat/24');
    },
  },
  {
    hdsIconName: 'replication-direct',
    carbonIconName: 'replicate',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/replicate/16')
        : await import('@carbon/icons/es/replicate/24');
    },
  },
  {
    hdsIconName: 'robot',
    carbonIconName: 'bot',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/bot/16')
        : await import('@carbon/icons/es/bot/24');
    },
  },
  {
    hdsIconName: 'rocket',
    carbonIconName: 'rocket',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/rocket/16')
        : await import('@carbon/icons/es/rocket/24');
    },
  },
  {
    hdsIconName: 'rotate-ccw',
    carbonIconName: 'rotate',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/rotate/16')
        : await import('@carbon/icons/es/rotate/24');
    },
  },
  {
    hdsIconName: 'rotate-cw',
    carbonIconName: 'rotate',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/rotate/16')
        : await import('@carbon/icons/es/rotate/24');
    },
  },
  {
    hdsIconName: 'rss',
    carbonIconName: 'rss',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/rss/16')
        : await import('@carbon/icons/es/rss/24');
    },
  },
  {
    hdsIconName: 'save',
    carbonIconName: 'save',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/save/16')
        : await import('@carbon/icons/es/save/24');
    },
  },
  {
    hdsIconName: 'scissors',
    carbonIconName: 'cut',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/cut/16')
        : await import('@carbon/icons/es/cut/24');
    },
  },
  {
    hdsIconName: 'search',
    carbonIconName: 'search',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/search/16')
        : await import('@carbon/icons/es/search/24');
    },
  },
  {
    hdsIconName: 'send',
    carbonIconName: 'send--alt',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/send--alt/16')
        : await import('@carbon/icons/es/send--alt/24');
    },
  },
  {
    hdsIconName: 'server',
    carbonIconName: 'bare-metal-server',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/bare-metal-server/16')
        : await import('@carbon/icons/es/bare-metal-server/24');
    },
  },
  {
    hdsIconName: 'settings',
    carbonIconName: 'settings',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/settings/16')
        : await import('@carbon/icons/es/settings/24');
    },
  },
  {
    hdsIconName: 'share',
    carbonIconName: 'share',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/share/16')
        : await import('@carbon/icons/es/share/24');
    },
  },
  {
    hdsIconName: 'shield',
    carbonIconName: 'rule',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/rule/16')
        : await import('@carbon/icons/es/rule/24');
    },
  },
  {
    hdsIconName: 'shield-check',
    carbonIconName: 'security',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/security/16')
        : await import('@carbon/icons/es/security/24');
    },
  },
  {
    hdsIconName: 'shield-off',
    carbonIconName: 'rule--cancelled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/rule--cancelled/16')
        : await import('@carbon/icons/es/rule--cancelled/24');
    },
  },
  {
    hdsIconName: 'shopping-bag',
    carbonIconName: 'shopping--bag',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/shopping--bag/16')
        : await import('@carbon/icons/es/shopping--bag/24');
    },
  },
  {
    hdsIconName: 'shopping-cart',
    carbonIconName: 'shopping--cart',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/shopping--cart/16')
        : await import('@carbon/icons/es/shopping--cart/24');
    },
  },
  {
    hdsIconName: 'shuffle',
    carbonIconName: 'shuffle',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/shuffle/16')
        : await import('@carbon/icons/es/shuffle/24');
    },
  },
  {
    hdsIconName: 'sidebar',
    carbonIconName: 'open-panel--left',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/open-panel--left/16')
        : await import('@carbon/icons/es/open-panel--left/24');
    },
  },
  {
    hdsIconName: 'sidebar-hide',
    carbonIconName: 'side-panel--close',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/side-panel--close/16')
        : await import('@carbon/icons/es/side-panel--close/24');
    },
  },
  {
    hdsIconName: 'sidebar-show',
    carbonIconName: 'side-panel--open',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/side-panel--open/16')
        : await import('@carbon/icons/es/side-panel--open/24');
    },
  },
  {
    hdsIconName: 'sign-in',
    carbonIconName: 'login',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/login/16')
        : await import('@carbon/icons/es/login/24');
    },
  },
  {
    hdsIconName: 'sign-out',
    carbonIconName: 'logout',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/logout/16')
        : await import('@carbon/icons/es/logout/24');
    },
  },
  {
    hdsIconName: 'skip',
    carbonIconName: 'error',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/error/16')
        : await import('@carbon/icons/es/error/24');
    },
  },
  {
    hdsIconName: 'skip-back',
    carbonIconName: 'skip--back',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/skip--back/16')
        : await import('@carbon/icons/es/skip--back/24');
    },
  },
  {
    hdsIconName: 'skip-forward',
    carbonIconName: 'skip--forward',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/skip--forward/16')
        : await import('@carbon/icons/es/skip--forward/24');
    },
  },
  {
    hdsIconName: 'slash',
    carbonIconName: 'marginal',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/marginal/16')
        : await import('@carbon/icons/es/marginal/24');
    },
  },
  {
    hdsIconName: 'sliders',
    carbonIconName: 'audio-console',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/audio-console/16')
        : await import('@carbon/icons/es/audio-console/24');
    },
  },
  {
    hdsIconName: 'smartphone',
    carbonIconName: 'mobile',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/mobile/16')
        : await import('@carbon/icons/es/mobile/24');
    },
  },
  {
    hdsIconName: 'smile',
    carbonIconName: 'face--satisfied',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/face--satisfied/16')
        : await import('@carbon/icons/es/face--satisfied/24');
    },
  },
  {
    hdsIconName: 'sort-asc',
    carbonIconName: 'sort--ascending',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/sort--ascending/16')
        : await import('@carbon/icons/es/sort--ascending/24');
    },
  },
  {
    hdsIconName: 'sort-desc',
    carbonIconName: 'sort--descending',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/sort--descending/16')
        : await import('@carbon/icons/es/sort--descending/24');
    },
  },
  {
    hdsIconName: 'sparkle',
    carbonIconName: 'ai-label',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/ai-label/16')
        : await import('@carbon/icons/es/ai-label/24');
    },
  },
  {
    hdsIconName: 'square',
    carbonIconName: 'square--outline',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/square--outline/16')
        : await import('@carbon/icons/es/square--outline/24');
    },
  },
  {
    hdsIconName: 'square-fill',
    carbonIconName: 'square--solid',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/square--solid/16')
        : await import('@carbon/icons/es/square--solid/24');
    },
  },
  {
    hdsIconName: 'star',
    carbonIconName: 'star',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/star/16')
        : await import('@carbon/icons/es/star/24');
    },
  },
  {
    hdsIconName: 'star-fill',
    carbonIconName: 'star--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/star--filled/16')
        : await import('@carbon/icons/es/star--filled/24');
    },
  },
  {
    hdsIconName: 'start',
    carbonIconName: 'page--first',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/page--first/16')
        : await import('@carbon/icons/es/page--first/24');
    },
  },
  {
    hdsIconName: 'stop-circle',
    carbonIconName: 'stop--outline',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/stop--outline/16')
        : await import('@carbon/icons/es/stop--outline/24');
    },
  },
  {
    hdsIconName: 'sun',
    carbonIconName: 'sun',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/sun/16')
        : await import('@carbon/icons/es/sun/24');
    },
  },
  {
    hdsIconName: 'support',
    carbonIconName: 'lifesaver',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/lifesaver/16')
        : await import('@carbon/icons/es/lifesaver/24');
    },
  },
  {
    hdsIconName: 'swap-horizontal',
    carbonIconName: 'arrows--horizontal',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/arrows--horizontal/16')
        : await import('@carbon/icons/es/arrows--horizontal/24');
    },
  },
  {
    hdsIconName: 'swap-vertical',
    carbonIconName: 'arrows--vertical',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/arrows--vertical/16')
        : await import('@carbon/icons/es/arrows--vertical/24');
    },
  },
  {
    hdsIconName: 'switcher',
    carbonIconName: 'switcher',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/switcher/16')
        : await import('@carbon/icons/es/switcher/24');
    },
  },
  {
    hdsIconName: 'sync-alert',
    carbonIconName: 'async',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/async/16')
        : await import('@carbon/icons/es/async/24');
    },
  },
  {
    hdsIconName: 'sync-reverse',
    carbonIconName: 'renew',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/renew/16')
        : await import('@carbon/icons/es/renew/24');
    },
  },
  {
    hdsIconName: 'tablet',
    carbonIconName: 'tablet--landscape',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/tablet--landscape/16')
        : await import('@carbon/icons/es/tablet--landscape/24');
    },
  },
  {
    hdsIconName: 'tag',
    carbonIconName: 'tag',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/tag/16')
        : await import('@carbon/icons/es/tag/24');
    },
  },
  {
    hdsIconName: 'target',
    carbonIconName: 'navaid--military',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/navaid--military/16')
        : await import('@carbon/icons/es/navaid--military/24');
    },
  },
  {
    hdsIconName: 'terminal',
    carbonIconName: 'terminal',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/terminal/16')
        : await import('@carbon/icons/es/terminal/24');
    },
  },
  {
    hdsIconName: 'terminal-screen',
    carbonIconName: 'terminal',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/terminal/16')
        : await import('@carbon/icons/es/terminal/24');
    },
  },
  {
    hdsIconName: 'thumbs-down',
    carbonIconName: 'thumbs-down',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/thumbs-down/16')
        : await import('@carbon/icons/es/thumbs-down/24');
    },
  },
  {
    hdsIconName: 'thumbs-up',
    carbonIconName: 'thumbs-up',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/thumbs-up/16')
        : await import('@carbon/icons/es/thumbs-up/24');
    },
  },
  {
    hdsIconName: 'tools',
    carbonIconName: 'tool-box',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/tool-box/16')
        : await import('@carbon/icons/es/tool-box/24');
    },
  },
  {
    hdsIconName: 'top',
    carbonIconName: 'up-to-top',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/up-to-top/16')
        : await import('@carbon/icons/es/up-to-top/24');
    },
  },
  {
    hdsIconName: 'transform-data',
    carbonIconName: 'character-patterns',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/character-patterns/16')
        : await import('@carbon/icons/es/character-patterns/24');
    },
  },
  {
    hdsIconName: 'trash',
    carbonIconName: 'trash-can',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/trash-can/16')
        : await import('@carbon/icons/es/trash-can/24');
    },
  },
  {
    hdsIconName: 'trend-up',
    carbonIconName: 'growth',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/growth/16')
        : await import('@carbon/icons/es/growth/24');
    },
  },
  {
    hdsIconName: 'triangle',
    carbonIconName: 'triangle--outline',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/triangle--outline/16')
        : await import('@carbon/icons/es/triangle--outline/24');
    },
  },
  {
    hdsIconName: 'triangle-fill',
    carbonIconName: 'triangle--solid',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/triangle--solid/16')
        : await import('@carbon/icons/es/triangle--solid/24');
    },
  },
  {
    hdsIconName: 'truck',
    carbonIconName: 'delivery-truck',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/delivery-truck/16')
        : await import('@carbon/icons/es/delivery-truck/24');
    },
  },
  {
    hdsIconName: 'tv',
    carbonIconName: 'screen',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/screen/16')
        : await import('@carbon/icons/es/screen/24');
    },
  },
  {
    hdsIconName: 'type',
    carbonIconName: 'text--scale',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/text--scale/16')
        : await import('@carbon/icons/es/text--scale/24');
    },
  },
  {
    hdsIconName: 'unlock',
    carbonIconName: 'unlocked',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/unlocked/16')
        : await import('@carbon/icons/es/unlocked/24');
    },
  },
  {
    hdsIconName: 'upload',
    carbonIconName: 'upload',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/upload/16')
        : await import('@carbon/icons/es/upload/24');
    },
  },
  {
    hdsIconName: 'user',
    carbonIconName: 'user',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/user/16')
        : await import('@carbon/icons/es/user/24');
    },
  },
  {
    hdsIconName: 'user-check',
    carbonIconName: 'user--admin',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/user--admin/16')
        : await import('@carbon/icons/es/user--admin/24');
    },
  },
  {
    hdsIconName: 'user-circle',
    carbonIconName: 'user--avatar',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/user--avatar/16')
        : await import('@carbon/icons/es/user--avatar/24');
    },
  },
  {
    hdsIconName: 'user-circle-fill',
    carbonIconName: 'user--avatar--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/user--avatar--filled/16')
        : await import('@carbon/icons/es/user--avatar--filled/24');
    },
  },
  {
    hdsIconName: 'user-plus',
    carbonIconName: 'user--follow',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/user--follow/16')
        : await import('@carbon/icons/es/user--follow/24');
    },
  },
  {
    hdsIconName: 'users',
    carbonIconName: 'user--multiple',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/user--multiple/16')
        : await import('@carbon/icons/es/user--multiple/24');
    },
  },
  {
    hdsIconName: 'video',
    carbonIconName: 'video',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/video/16')
        : await import('@carbon/icons/es/video/24');
    },
  },
  {
    hdsIconName: 'video-off',
    carbonIconName: 'video--off',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/video--off/16')
        : await import('@carbon/icons/es/video--off/24');
    },
  },
  {
    hdsIconName: 'volume-up',
    carbonIconName: 'volume--up',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/volume--up/16')
        : await import('@carbon/icons/es/volume--up/24');
    },
  },
  {
    hdsIconName: 'volume-down',
    carbonIconName: 'volume--down',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/volume--down/16')
        : await import('@carbon/icons/es/volume--down/24');
    },
  },
  {
    hdsIconName: 'volume-x',
    carbonIconName: 'volume--mute',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/volume--mute/16')
        : await import('@carbon/icons/es/volume--mute/24');
    },
  },
  {
    hdsIconName: 'wand',
    carbonIconName: 'magic-wand',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/magic-wand/16')
        : await import('@carbon/icons/es/magic-wand/24');
    },
  },
  {
    hdsIconName: 'watch',
    carbonIconName: 'watch',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/watch/16')
        : await import('@carbon/icons/es/watch/24');
    },
  },
  {
    hdsIconName: 'webhook',
    carbonIconName: 'webhook',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/webhook/16')
        : await import('@carbon/icons/es/webhook/24');
    },
  },
  {
    hdsIconName: 'wifi',
    carbonIconName: 'wifi',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/wifi/16')
        : await import('@carbon/icons/es/wifi/24');
    },
  },
  {
    hdsIconName: 'wifi-off',
    carbonIconName: 'wifi--off',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/wifi--off/16')
        : await import('@carbon/icons/es/wifi--off/24');
    },
  },
  {
    hdsIconName: 'wrench',
    carbonIconName: 'tools',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/tools/16')
        : await import('@carbon/icons/es/tools/24');
    },
  },
  {
    hdsIconName: 'x',
    carbonIconName: 'close',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/close/16')
        : await import('@carbon/icons/es/close/24');
    },
  },
  {
    hdsIconName: 'x-circle',
    carbonIconName: 'close--outline',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/close--outline/16')
        : await import('@carbon/icons/es/close--outline/24');
    },
  },
  {
    hdsIconName: 'x-circle-fill',
    carbonIconName: 'close--filled',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/close--filled/16')
        : await import('@carbon/icons/es/close--filled/24');
    },
  },
  {
    hdsIconName: 'zap',
    carbonIconName: 'flash',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/flash/16')
        : await import('@carbon/icons/es/flash/24');
    },
  },
  {
    hdsIconName: 'zap-off',
    carbonIconName: 'flash--off',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/flash--off/16')
        : await import('@carbon/icons/es/flash--off/24');
    },
  },
  {
    hdsIconName: 'zoom-in',
    carbonIconName: 'zoom--in',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/zoom--in/16')
        : await import('@carbon/icons/es/zoom--in/24');
    },
  },
  {
    hdsIconName: 'zoom-out',
    carbonIconName: 'zoom--out',
    importCarbonIcon: async (
      size: HdsIconSizes = HdsIconSizeValues.Sixteen
    ) => {
      return size === HdsIconSizeValues.Sixteen
        ? await import('@carbon/icons/es/zoom--out/16')
        : await import('@carbon/icons/es/zoom--out/24');
    },
  },
];

export default hdsCarbonIconList;
