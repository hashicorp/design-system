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

export const hdsCarbonIcons = {
  accessibility: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/accessibility--alt/16')
      : await import('@carbon/icons/es/accessibility--alt/24');
  },
  activity: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/activity/16')
      : await import('@carbon/icons/es/activity/24');
  },
  'alert-circle': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/warning/16')
      : await import('@carbon/icons/es/warning/24');
  },
  'alert-circle-fill': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/warning--filled/16')
      : await import('@carbon/icons/es/warning--filled/24');
  },
  'alert-diamond': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/warning--diamond/16')
      : await import('@carbon/icons/es/warning--diamond/24');
  },
  'alert-octagon': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/warning--hex/16')
      : await import('@carbon/icons/es/warning--hex/24');
  },
  'alert-octagon-fill': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/warning--hex--filled/16')
      : await import('@carbon/icons/es/warning--hex--filled/24');
  },
  'alert-triangle': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/warning--alt/16')
      : await import('@carbon/icons/es/warning--alt/24');
  },
  'alert-triangle-fill': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/warning--alt--filled/16')
      : await import('@carbon/icons/es/warning--alt--filled/24');
  },
  'align-center': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/text--align--center/16')
      : await import('@carbon/icons/es/text--align--center/24');
  },
  'align-justify': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/text--align--justify/16')
      : await import('@carbon/icons/es/text--align--justify/24');
  },
  'align-left': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/text--align--left/16')
      : await import('@carbon/icons/es/text--align--left/24');
  },
  'align-right': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/text--align--right/16')
      : await import('@carbon/icons/es/text--align--right/24');
  },
  api: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/api/16')
      : await import('@carbon/icons/es/api/24');
  },
  archive: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/box/16')
      : await import('@carbon/icons/es/box/24');
  },
  'arrow-down': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/arrow--down/16')
      : await import('@carbon/icons/es/arrow--down/24');
  },
  'arrow-down-circle': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/previous--outline/16')
      : await import('@carbon/icons/es/previous--outline/24');
  },
  'arrow-down-left': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/arrow--down-left/16')
      : await import('@carbon/icons/es/arrow--down-left/24');
  },
  'arrow-down-right': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/arrow--down-right/16')
      : await import('@carbon/icons/es/arrow--down-right/24');
  },
  'arrow-left': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/arrow--left/16')
      : await import('@carbon/icons/es/arrow--left/24');
  },
  'arrow-left-circle': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/next--outline/16')
      : await import('@carbon/icons/es/next--outline/24');
  },
  'arrow-right': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/arrow--right/16')
      : await import('@carbon/icons/es/arrow--right/24');
  },
  'arrow-up': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/arrow--up/16')
      : await import('@carbon/icons/es/arrow--up/24');
  },
  'arrow-up-left': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/arrow--up-left/16')
      : await import('@carbon/icons/es/arrow--up-left/24');
  },
  'arrow-up-right': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/arrow--up-right/16')
      : await import('@carbon/icons/es/arrow--up-right/24');
  },
  'at-sign': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/at/16')
      : await import('@carbon/icons/es/at/24');
  },
  award: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/recommend/16')
      : await import('@carbon/icons/es/recommend/24');
  },
  'bar-chart': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chart--column/16')
      : await import('@carbon/icons/es/chart--column/24');
  },
  'bar-chart-alt': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chart--column/16')
      : await import('@carbon/icons/es/chart--column/24');
  },
  battery: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/battery--empty/16')
      : await import('@carbon/icons/es/battery--empty/24');
  },
  'battery-charging': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/battery--charging/16')
      : await import('@carbon/icons/es/battery--charging/24');
  },
  beaker: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chemistry/16')
      : await import('@carbon/icons/es/chemistry/24');
  },
  bell: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/notification/16')
      : await import('@carbon/icons/es/notification/24');
  },
  'bell-active': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/notification--new/16')
      : await import('@carbon/icons/es/notification--new/24');
  },
  'bell-off': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/notification--off/16')
      : await import('@carbon/icons/es/notification--off/24');
  },
  bookmark: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/bookmark/16')
      : await import('@carbon/icons/es/bookmark/24');
  },
  'bookmark-add': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/bookmark--add/16')
      : await import('@carbon/icons/es/bookmark--add/24');
  },
  'bookmark-fill': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/bookmark--filled/16')
      : await import('@carbon/icons/es/bookmark--filled/24');
  },
  bottom: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/down-to-bottom/16')
      : await import('@carbon/icons/es/down-to-bottom/24');
  },
  box: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/cube/16')
      : await import('@carbon/icons/es/cube/24');
  },
  briefcase: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/portfolio/16')
      : await import('@carbon/icons/es/portfolio/24');
  },
  bucket: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/container--image/16')
      : await import('@carbon/icons/es/container--image/24');
  },
  bug: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/debug/16')
      : await import('@carbon/icons/es/debug/24');
  },
  build: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/tools/16')
      : await import('@carbon/icons/es/tools/24');
  },
  bulb: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/idea/16')
      : await import('@carbon/icons/es/idea/24');
  },
  calendar: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/calendar/16')
      : await import('@carbon/icons/es/calendar/24');
  },
  camera: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/camera/16')
      : await import('@carbon/icons/es/camera/24');
  },
  caret: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chevron--sort/16')
      : await import('@carbon/icons/es/chevron--sort/24');
  },
  cast: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/media-cast/16')
      : await import('@carbon/icons/es/media-cast/24');
  },
  certificate: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/policy/16')
      : await import('@carbon/icons/es/policy/24');
  },
  channel: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/network--2/16')
      : await import('@carbon/icons/es/network--2/24');
  },
  check: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/checkmark/16')
      : await import('@carbon/icons/es/checkmark/24');
  },
  'check-circle': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/checkmark--outline/16')
      : await import('@carbon/icons/es/checkmark--outline/24');
  },
  'check-circle-fill': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/checkmark--filled/16')
      : await import('@carbon/icons/es/checkmark--filled/24');
  },
  'check-square': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/checkbox--checked/16')
      : await import('@carbon/icons/es/checkbox--checked/24');
  },
  'check-square-fill': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/checkbox--checked--filled/16')
      : await import('@carbon/icons/es/checkbox--checked--filled/24');
  },
  'chevron-down': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chevron--down/16')
      : await import('@carbon/icons/es/chevron--down/24');
  },
  'chevron-left': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chevron--left/16')
      : await import('@carbon/icons/es/chevron--left/24');
  },
  'chevron-right': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chevron--right/16')
      : await import('@carbon/icons/es/chevron--right/24');
  },
  'chevron-up': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chevron--up/16')
      : await import('@carbon/icons/es/chevron--up/24');
  },
  circle: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/circle--outline/16')
      : await import('@carbon/icons/es/circle--outline/24');
  },
  'circle-dot': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/circle--filled/16')
      : await import('@carbon/icons/es/circle--filled/24');
  },
  'circle-fill': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/circle--solid/16')
      : await import('@carbon/icons/es/circle--solid/24');
  },
  'circle-half': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/contrast/16')
      : await import('@carbon/icons/es/contrast/24');
  },
  clipboard: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/report/16')
      : await import('@carbon/icons/es/report/24');
  },
  'clipboard-checked': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/task--complete/16')
      : await import('@carbon/icons/es/task--complete/24');
  },
  'clipboard-x': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/task--remove/16')
      : await import('@carbon/icons/es/task--remove/24');
  },
  clock: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/time/16')
      : await import('@carbon/icons/es/time/24');
  },
  'clock-filled': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/time--filled/16')
      : await import('@carbon/icons/es/time--filled/24');
  },
  'closed-caption': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/closed-caption/16')
      : await import('@carbon/icons/es/closed-caption/24');
  },
  cloud: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/cloud/16')
      : await import('@carbon/icons/es/cloud/24');
  },
  'cloud-download': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/cloud--download/16')
      : await import('@carbon/icons/es/cloud--download/24');
  },
  'cloud-lock': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/virtual-private-cloud/16')
      : await import('@carbon/icons/es/virtual-private-cloud/24');
  },
  'cloud-off': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/cloud--offline/16')
      : await import('@carbon/icons/es/cloud--offline/24');
  },
  'cloud-upload': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/cloud--upload/16')
      : await import('@carbon/icons/es/cloud--upload/24');
  },
  code: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/code/16')
      : await import('@carbon/icons/es/code/24');
  },
  collections: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/document--multiple-02/16')
      : await import('@carbon/icons/es/document--multiple-02/24');
  },
  command: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/mac--command/16')
      : await import('@carbon/icons/es/mac--command/24');
  },
  compass: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/explore/16')
      : await import('@carbon/icons/es/explore/24');
  },
  'connection-gateway': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/network--4/16')
      : await import('@carbon/icons/es/network--4/24');
  },
  cpu: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chip/16')
      : await import('@carbon/icons/es/chip/24');
  },
  'credit-card': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/purchase/16')
      : await import('@carbon/icons/es/purchase/24');
  },
  crop: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/crop/16')
      : await import('@carbon/icons/es/crop/24');
  },
  crosshair: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/center--circle/16')
      : await import('@carbon/icons/es/center--circle/24');
  },
  dashboard: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/dashboard/16')
      : await import('@carbon/icons/es/dashboard/24');
  },
  database: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/data--base/16')
      : await import('@carbon/icons/es/data--base/24');
  },
  delete: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/delete/16')
      : await import('@carbon/icons/es/delete/24');
  },
  diamond: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/diamond--outline/16')
      : await import('@carbon/icons/es/diamond--outline/24');
  },
  disc: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/recording/16')
      : await import('@carbon/icons/es/recording/24');
  },
  'discussion-circle': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/forum/16')
      : await import('@carbon/icons/es/forum/24');
  },
  'discussion-square': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/forum/16')
      : await import('@carbon/icons/es/forum/24');
  },
  docs: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/document/16')
      : await import('@carbon/icons/es/document/24');
  },
  'docs-download': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/document--download/16')
      : await import('@carbon/icons/es/document--download/24');
  },
  'dollar-sign': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/currency--dollar/16')
      : await import('@carbon/icons/es/currency--dollar/24');
  },
  dot: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/dot-mark/16')
      : await import('@carbon/icons/es/dot-mark/24');
  },
  download: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/download/16')
      : await import('@carbon/icons/es/download/24');
  },
  droplet: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/rain-drop/16')
      : await import('@carbon/icons/es/rain-drop/24');
  },
  duplicate: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/copy/16')
      : await import('@carbon/icons/es/copy/24');
  },
  edit: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/edit/16')
      : await import('@carbon/icons/es/edit/24');
  },
  end: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/page--last/16')
      : await import('@carbon/icons/es/page--last/24');
  },
  enterprise: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/enterprise/16')
      : await import('@carbon/icons/es/enterprise/24');
  },
  'entry-point': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/port--input/16')
      : await import('@carbon/icons/es/port--input/24');
  },
  event: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/event/16')
      : await import('@carbon/icons/es/event/24');
  },
  'exit-point': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/port--output/16')
      : await import('@carbon/icons/es/port--output/24');
  },
  'external-link': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/launch/16')
      : await import('@carbon/icons/es/launch/24');
  },
  eye: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/view/16')
      : await import('@carbon/icons/es/view/24');
  },
  'eye-off': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/view--off/16')
      : await import('@carbon/icons/es/view--off/24');
  },
  file: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/document--blank/16')
      : await import('@carbon/icons/es/document--blank/24');
  },
  'file-check': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/document--tasks/16')
      : await import('@carbon/icons/es/document--tasks/24');
  },
  'file-minus': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/document--subtract/16')
      : await import('@carbon/icons/es/document--subtract/24');
  },
  'file-plus': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/document--add/16')
      : await import('@carbon/icons/es/document--add/24');
  },
  'file-source': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/script/16')
      : await import('@carbon/icons/es/script/24');
  },
  'file-text': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/document/16')
      : await import('@carbon/icons/es/document/24');
  },
  files: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/document--multiple-02/16')
      : await import('@carbon/icons/es/document--multiple-02/24');
  },
  filter: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/filter/16')
      : await import('@carbon/icons/es/filter/24');
  },
  'filter-circle': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/filter/16')
      : await import('@carbon/icons/es/filter/24');
  },
  'filter-fill': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/filter/16')
      : await import('@carbon/icons/es/filter/24');
  },
  fingerprint: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/fingerprint-recognition/16')
      : await import('@carbon/icons/es/fingerprint-recognition/24');
  },
  flag: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/flag/16')
      : await import('@carbon/icons/es/flag/24');
  },
  folder: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/folder/16')
      : await import('@carbon/icons/es/folder/24');
  },
  'folder-plus': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/folder--add/16')
      : await import('@carbon/icons/es/folder--add/24');
  },
  'folder-users': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/folder--shared/16')
      : await import('@carbon/icons/es/folder--shared/24');
  },
  gateway: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/gateway/16')
      : await import('@carbon/icons/es/gateway/24');
  },
  gift: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/gift/16')
      : await import('@carbon/icons/es/gift/24');
  },
  'git-branch': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/branch/16')
      : await import('@carbon/icons/es/branch/24');
  },
  'git-commit': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/commit/16')
      : await import('@carbon/icons/es/commit/24');
  },
  'git-merge': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/merge/16')
      : await import('@carbon/icons/es/merge/24');
  },
  'git-pull-request': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/pull-request/16')
      : await import('@carbon/icons/es/pull-request/24');
  },
  globe: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/wikis/16')
      : await import('@carbon/icons/es/wikis/24');
  },
  government: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/finance/16')
      : await import('@carbon/icons/es/finance/24');
  },
  grid: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/grid/16')
      : await import('@carbon/icons/es/grid/24');
  },
  'grid-alt': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/thumbnail--2/16')
      : await import('@carbon/icons/es/thumbnail--2/24');
  },
  guide: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/book/16')
      : await import('@carbon/icons/es/book/24');
  },
  handshake: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/partnership/16')
      : await import('@carbon/icons/es/partnership/24');
  },
  'hard-drive': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/vmdk-disk/16')
      : await import('@carbon/icons/es/vmdk-disk/24');
  },
  hash: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/hashtag/16')
      : await import('@carbon/icons/es/hashtag/24');
  },
  headphones: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/headphones/16')
      : await import('@carbon/icons/es/headphones/24');
  },
  heart: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/favorite/16')
      : await import('@carbon/icons/es/favorite/24');
  },
  'heart-fill': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/favorite--filled/16')
      : await import('@carbon/icons/es/favorite--filled/24');
  },
  help: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/help/16')
      : await import('@carbon/icons/es/help/24');
  },
  hexagon: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/hexagon--outline/16')
      : await import('@carbon/icons/es/hexagon--outline/24');
  },
  'hexagon-fill': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/hexagon--solid/16')
      : await import('@carbon/icons/es/hexagon--solid/24');
  },
  history: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/recently-viewed/16')
      : await import('@carbon/icons/es/recently-viewed/24');
  },
  home: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/tools/16')
      : await import('@carbon/icons/es/tools/24');
  },
  hourglass: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/hourglass/16')
      : await import('@carbon/icons/es/hourglass/24');
  },
  'identity-service': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/service-id/16')
      : await import('@carbon/icons/es/service-id/24');
  },
  'identity-user': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/identification/16')
      : await import('@carbon/icons/es/identification/24');
  },
  image: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/image/16')
      : await import('@carbon/icons/es/image/24');
  },
  info: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/information/16')
      : await import('@carbon/icons/es/information/24');
  },
  'info-fill': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/information--filled/16')
      : await import('@carbon/icons/es/information--filled/24');
  },
  'jump-link': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/jump-link/16')
      : await import('@carbon/icons/es/jump-link/24');
  },
  key: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/password/16')
      : await import('@carbon/icons/es/password/24');
  },
  layers: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/layers/16')
      : await import('@carbon/icons/es/layers/24');
  },
  layout: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/template/16')
      : await import('@carbon/icons/es/template/24');
  },
  learn: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/education/16')
      : await import('@carbon/icons/es/education/24');
  },
  'line-chart': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chart--line/16')
      : await import('@carbon/icons/es/chart--line/24');
  },
  'line-chart-up': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chart--line/16')
      : await import('@carbon/icons/es/chart--line/24');
  },
  link: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/link/16')
      : await import('@carbon/icons/es/link/24');
  },
  list: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/list/16')
      : await import('@carbon/icons/es/list/24');
  },
  'load-balancer': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/load-balancer--classic/16')
      : await import('@carbon/icons/es/load-balancer--classic/24');
  },
  lock: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/locked/16')
      : await import('@carbon/icons/es/locked/24');
  },
  logs: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/cloud--logging/16')
      : await import('@carbon/icons/es/cloud--logging/24');
  },
  mail: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/email/16')
      : await import('@carbon/icons/es/email/24');
  },
  map: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/map/16')
      : await import('@carbon/icons/es/map/24');
  },
  'map-pin': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/location/16')
      : await import('@carbon/icons/es/location/24');
  },
  maximize: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/maximize/16')
      : await import('@carbon/icons/es/maximize/24');
  },
  'maximize-alt': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/maximize/16')
      : await import('@carbon/icons/es/maximize/24');
  },
  meh: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/face--neutral/16')
      : await import('@carbon/icons/es/face--neutral/24');
  },
  menu: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/menu/16')
      : await import('@carbon/icons/es/menu/24');
  },
  mesh: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/model/16')
      : await import('@carbon/icons/es/model/24');
  },
  'message-circle': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chat/16')
      : await import('@carbon/icons/es/chat/24');
  },
  'message-circle-fill': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chat/16')
      : await import('@carbon/icons/es/chat/24');
  },
  'message-square': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chat/16')
      : await import('@carbon/icons/es/chat/24');
  },
  'message-square-fill': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chat/16')
      : await import('@carbon/icons/es/chat/24');
  },
  mic: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/microphone/16')
      : await import('@carbon/icons/es/microphone/24');
  },
  'mic-off': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/microphone--off/16')
      : await import('@carbon/icons/es/microphone--off/24');
  },
  migrate: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/migrate--alt/16')
      : await import('@carbon/icons/es/migrate--alt/24');
  },
  minimize: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/minimize/16')
      : await import('@carbon/icons/es/minimize/24');
  },
  'minimize-alt': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/minimize/16')
      : await import('@carbon/icons/es/minimize/24');
  },
  minus: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/subtract/16')
      : await import('@carbon/icons/es/subtract/24');
  },
  'minus-circle': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/subtract--alt/16')
      : await import('@carbon/icons/es/subtract--alt/24');
  },
  'minus-circle-fill': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/subtract--filled/16')
      : await import('@carbon/icons/es/subtract--filled/24');
  },
  monitor: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/screen/16')
      : await import('@carbon/icons/es/screen/24');
  },
  moon: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/moon/16')
      : await import('@carbon/icons/es/moon/24');
  },
  'more-horizontal': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/overflow-menu--horizontal/16')
      : await import('@carbon/icons/es/overflow-menu--horizontal/24');
  },
  'more-vertical': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/overflow-menu--vertical/16')
      : await import('@carbon/icons/es/overflow-menu--vertical/24');
  },
  'mouse-pointer': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/cursor--1/16')
      : await import('@carbon/icons/es/cursor--1/24');
  },
  move: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/move/16')
      : await import('@carbon/icons/es/move/24');
  },
  music: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/music/16')
      : await import('@carbon/icons/es/music/24');
  },
  navigation: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/location--current/16')
      : await import('@carbon/icons/es/location--current/24');
  },
  'navigation-alt': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/location--current/16')
      : await import('@carbon/icons/es/location--current/24');
  },
  network: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/vlan/16')
      : await import('@carbon/icons/es/vlan/24');
  },
  'network-alt': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/network--3/16')
      : await import('@carbon/icons/es/network--3/24');
  },
  newspaper: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/blog/16')
      : await import('@carbon/icons/es/blog/24');
  },
  octagon: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/stop-sign/16')
      : await import('@carbon/icons/es/stop-sign/24');
  },
  org: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/building/16')
      : await import('@carbon/icons/es/building/24');
  },
  outline: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/assignment-action--usage/16')
      : await import('@carbon/icons/es/assignment-action--usage/24');
  },
  paperclip: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/attachment/16')
      : await import('@carbon/icons/es/attachment/24');
  },
  pause: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/pause/16')
      : await import('@carbon/icons/es/pause/24');
  },
  'pen-tool': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/pen--fountain/16')
      : await import('@carbon/icons/es/pen--fountain/24');
  },
  'pencil-tool': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/edit/16')
      : await import('@carbon/icons/es/edit/24');
  },
  phone: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/phone/16')
      : await import('@carbon/icons/es/phone/24');
  },
  'phone-call': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/phone--voice/16')
      : await import('@carbon/icons/es/phone--voice/24');
  },
  'phone-off': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/phone--off/16')
      : await import('@carbon/icons/es/phone--off/24');
  },
  'pie-chart': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/chart--pie/16')
      : await import('@carbon/icons/es/chart--pie/24');
  },
  pin: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/pin/16')
      : await import('@carbon/icons/es/pin/24');
  },
  pipeline: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/pipelines/16')
      : await import('@carbon/icons/es/pipelines/24');
  },
  play: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/play/16')
      : await import('@carbon/icons/es/play/24');
  },
  'play-circle': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/play--outline/16')
      : await import('@carbon/icons/es/play--outline/24');
  },
  plug: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/plug/16')
      : await import('@carbon/icons/es/plug/24');
  },
  plus: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/add/16')
      : await import('@carbon/icons/es/add/24');
  },
  'plus-circle': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/add--alt/16')
      : await import('@carbon/icons/es/add--alt/24');
  },
  'plus-circle-fill': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/add--filled/16')
      : await import('@carbon/icons/es/add--filled/24');
  },
  power: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/power/16')
      : await import('@carbon/icons/es/power/24');
  },
  printer: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/printer/16')
      : await import('@carbon/icons/es/printer/24');
  },
  radio: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/connection-signal/16')
      : await import('@carbon/icons/es/connection-signal/24');
  },
  reload: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/restart/16')
      : await import('@carbon/icons/es/restart/24');
  },
  repeat: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/repeat/16')
      : await import('@carbon/icons/es/repeat/24');
  },
  'replication-direct': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/replicate/16')
      : await import('@carbon/icons/es/replicate/24');
  },
  robot: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/bot/16')
      : await import('@carbon/icons/es/bot/24');
  },
  rocket: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/rocket/16')
      : await import('@carbon/icons/es/rocket/24');
  },
  'rotate-ccw': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/rotate/16')
      : await import('@carbon/icons/es/rotate/24');
  },
  'rotate-cw': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/rotate/16')
      : await import('@carbon/icons/es/rotate/24');
  },
  rss: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/rss/16')
      : await import('@carbon/icons/es/rss/24');
  },
  save: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/save/16')
      : await import('@carbon/icons/es/save/24');
  },
  scissors: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/cut/16')
      : await import('@carbon/icons/es/cut/24');
  },
  search: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/search/16')
      : await import('@carbon/icons/es/search/24');
  },
  send: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/send--alt/16')
      : await import('@carbon/icons/es/send--alt/24');
  },
  server: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/bare-metal-server/16')
      : await import('@carbon/icons/es/bare-metal-server/24');
  },
  settings: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/settings/16')
      : await import('@carbon/icons/es/settings/24');
  },
  share: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/share/16')
      : await import('@carbon/icons/es/share/24');
  },
  shield: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/rule/16')
      : await import('@carbon/icons/es/rule/24');
  },
  'shield-check': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/security/16')
      : await import('@carbon/icons/es/security/24');
  },
  'shield-off': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/rule--cancelled/16')
      : await import('@carbon/icons/es/rule--cancelled/24');
  },
  'shopping-bag': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/shopping--bag/16')
      : await import('@carbon/icons/es/shopping--bag/24');
  },
  'shopping-cart': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/shopping--cart/16')
      : await import('@carbon/icons/es/shopping--cart/24');
  },
  shuffle: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/shuffle/16')
      : await import('@carbon/icons/es/shuffle/24');
  },
  sidebar: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/open-panel--left/16')
      : await import('@carbon/icons/es/open-panel--left/24');
  },
  'sidebar-hide': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/side-panel--close/16')
      : await import('@carbon/icons/es/side-panel--close/24');
  },
  'sidebar-show': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/side-panel--open/16')
      : await import('@carbon/icons/es/side-panel--open/24');
  },
  'sign-in': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/login/16')
      : await import('@carbon/icons/es/login/24');
  },
  'sign-out': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/logout/16')
      : await import('@carbon/icons/es/logout/24');
  },
  skip: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/error/16')
      : await import('@carbon/icons/es/error/24');
  },
  'skip-back': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/skip--back/16')
      : await import('@carbon/icons/es/skip--back/24');
  },
  'skip-forward': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/skip--forward/16')
      : await import('@carbon/icons/es/skip--forward/24');
  },
  slash: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/marginal/16')
      : await import('@carbon/icons/es/marginal/24');
  },
  sliders: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/audio-console/16')
      : await import('@carbon/icons/es/audio-console/24');
  },
  smartphone: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/mobile/16')
      : await import('@carbon/icons/es/mobile/24');
  },
  smile: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/face--satisfied/16')
      : await import('@carbon/icons/es/face--satisfied/24');
  },
  'sort-asc': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/sort--ascending/16')
      : await import('@carbon/icons/es/sort--ascending/24');
  },
  'sort-desc': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/sort--descending/16')
      : await import('@carbon/icons/es/sort--descending/24');
  },
  sparkle: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/ai-label/16')
      : await import('@carbon/icons/es/ai-label/24');
  },
  square: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/square--outline/16')
      : await import('@carbon/icons/es/square--outline/24');
  },
  'square-fill': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/square--solid/16')
      : await import('@carbon/icons/es/square--solid/24');
  },
  star: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/star/16')
      : await import('@carbon/icons/es/star/24');
  },
  'star-fill': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/star--filled/16')
      : await import('@carbon/icons/es/star--filled/24');
  },
  start: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/page--first/16')
      : await import('@carbon/icons/es/page--first/24');
  },
  'stop-circle': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/stop--outline/16')
      : await import('@carbon/icons/es/stop--outline/24');
  },
  sun: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/sun/16')
      : await import('@carbon/icons/es/sun/24');
  },
  support: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/lifesaver/16')
      : await import('@carbon/icons/es/lifesaver/24');
  },
  'swap-horizontal': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/arrows--horizontal/16')
      : await import('@carbon/icons/es/arrows--horizontal/24');
  },
  'swap-vertical': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/arrows--vertical/16')
      : await import('@carbon/icons/es/arrows--vertical/24');
  },
  switcher: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/switcher/16')
      : await import('@carbon/icons/es/switcher/24');
  },
  'sync-alert': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/async/16')
      : await import('@carbon/icons/es/async/24');
  },
  'sync-reverse': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/renew/16')
      : await import('@carbon/icons/es/renew/24');
  },
  tablet: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/tablet--landscape/16')
      : await import('@carbon/icons/es/tablet--landscape/24');
  },
  tag: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/tag/16')
      : await import('@carbon/icons/es/tag/24');
  },
  target: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/navaid--military/16')
      : await import('@carbon/icons/es/navaid--military/24');
  },
  terminal: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/terminal/16')
      : await import('@carbon/icons/es/terminal/24');
  },
  'terminal-screen': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/terminal/16')
      : await import('@carbon/icons/es/terminal/24');
  },
  'thumbs-down': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/thumbs-down/16')
      : await import('@carbon/icons/es/thumbs-down/24');
  },
  'thumbs-up': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/thumbs-up/16')
      : await import('@carbon/icons/es/thumbs-up/24');
  },
  tools: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/tool-box/16')
      : await import('@carbon/icons/es/tool-box/24');
  },
  top: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/up-to-top/16')
      : await import('@carbon/icons/es/up-to-top/24');
  },
  'transform-data': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/character-patterns/16')
      : await import('@carbon/icons/es/character-patterns/24');
  },
  trash: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/trash-can/16')
      : await import('@carbon/icons/es/trash-can/24');
  },
  'trend-up': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/growth/16')
      : await import('@carbon/icons/es/growth/24');
  },
  triangle: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/triangle--outline/16')
      : await import('@carbon/icons/es/triangle--outline/24');
  },
  'triangle-fill': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/triangle--solid/16')
      : await import('@carbon/icons/es/triangle--solid/24');
  },
  truck: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/delivery-truck/16')
      : await import('@carbon/icons/es/delivery-truck/24');
  },
  tv: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/screen/16')
      : await import('@carbon/icons/es/screen/24');
  },
  type: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/text--scale/16')
      : await import('@carbon/icons/es/text--scale/24');
  },
  unlock: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/unlocked/16')
      : await import('@carbon/icons/es/unlocked/24');
  },
  upload: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/upload/16')
      : await import('@carbon/icons/es/upload/24');
  },
  user: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/user/16')
      : await import('@carbon/icons/es/user/24');
  },
  'user-check': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/user--admin/16')
      : await import('@carbon/icons/es/user--admin/24');
  },
  'user-circle': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/user--avatar/16')
      : await import('@carbon/icons/es/user--avatar/24');
  },
  'user-circle-fill': async (
    size: HdsIconSizes = HdsIconSizeValues.Sixteen
  ) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/user--avatar--filled/16')
      : await import('@carbon/icons/es/user--avatar--filled/24');
  },
  'user-plus': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/user--follow/16')
      : await import('@carbon/icons/es/user--follow/24');
  },
  users: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/user--multiple/16')
      : await import('@carbon/icons/es/user--multiple/24');
  },
  video: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/video/16')
      : await import('@carbon/icons/es/video/24');
  },
  'video-off': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/video--off/16')
      : await import('@carbon/icons/es/video--off/24');
  },
  'volume-up': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/volume--up/16')
      : await import('@carbon/icons/es/volume--up/24');
  },
  'volume-down': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/volume--down/16')
      : await import('@carbon/icons/es/volume--down/24');
  },
  'volume-x': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/volume--mute/16')
      : await import('@carbon/icons/es/volume--mute/24');
  },
  wand: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/magic-wand/16')
      : await import('@carbon/icons/es/magic-wand/24');
  },
  watch: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/watch/16')
      : await import('@carbon/icons/es/watch/24');
  },
  webhook: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/webhook/16')
      : await import('@carbon/icons/es/webhook/24');
  },
  wifi: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/wifi/16')
      : await import('@carbon/icons/es/wifi/24');
  },
  'wifi-off': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/wifi--off/16')
      : await import('@carbon/icons/es/wifi--off/24');
  },
  wrench: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/tools/16')
      : await import('@carbon/icons/es/tools/24');
  },
  x: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/close/16')
      : await import('@carbon/icons/es/close/24');
  },
  'x-circle': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/close--outline/16')
      : await import('@carbon/icons/es/close--outline/24');
  },
  'x-circle-fill': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/close--filled/16')
      : await import('@carbon/icons/es/close--filled/24');
  },
  zap: async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/flash/16')
      : await import('@carbon/icons/es/flash/24');
  },
  'zap-off': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/flash--off/16')
      : await import('@carbon/icons/es/flash--off/24');
  },
  'zoom-in': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/zoom--in/16')
      : await import('@carbon/icons/es/zoom--in/24');
  },
  'zoom-out': async (size: HdsIconSizes = HdsIconSizeValues.Sixteen) => {
    return size === HdsIconSizeValues.Sixteen
      ? await import('@carbon/icons/es/zoom--out/16')
      : await import('@carbon/icons/es/zoom--out/24');
  },
};
