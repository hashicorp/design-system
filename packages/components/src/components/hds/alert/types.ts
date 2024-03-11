import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type HdsAlertDescriptionComponent from './description';
import type HdsAlertTitleComponent from './title';
import type HdsButtonIndexComponent from '../button';
import type HdsYieldComponent from '../yield';
import type HdsLinkStandaloneComponent from '../link/standalone';

export enum HdsAlertTypeValues {
  Page = 'page',
  Inlne = 'inline',
  Compact = 'compact',
}
export type HdsAlertTypes = `${HdsAlertTypeValues}`;

export enum HdsAlertColorValues {
  Neutral = 'neutral',
  Highlight = 'highlight',
  Success = 'success',
  Warning = 'warning',
  Critical = 'critical',
}
export type HdsAlertColors = `${HdsAlertColorValues}`;

export interface HdsAlertSignature {
  Args: {
    type: HdsAlertTypes;
    color?: HdsAlertColors;
    icon?: string | false;
    onDismiss?: () => void;
  };
  Blocks: {
    default: [
      {
        Title?: ComponentLike<typeof HdsAlertTitleComponent>;
        Description?: ComponentLike<typeof HdsAlertDescriptionComponent>;
        Generic?: ComponentLike<typeof HdsYieldComponent>;
        LinkStandalone?: WithBoundArgs<
          typeof HdsLinkStandaloneComponent,
          'size'
        >;
        Button?: WithBoundArgs<typeof HdsButtonIndexComponent, 'size'>;
      }
    ];
  };
  Element: HTMLDivElement;
}

export interface HdsAlertDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export interface HdsAlertTitleSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}
