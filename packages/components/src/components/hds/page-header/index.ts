import TemplateOnlyComponent from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import type { HdsIconTileSignature } from '../icon-tile';
import type { HdsYieldSignature } from '../yield';
import type { PageHeaderActionsSignature } from './actions';
import type { PageHeaderBadgesSignature } from './badges';
import type { PageHeaderDescriptionSignature } from './description';
import type { PageHeaderTitleSignature } from './title';
import type { PageHeaderSubtitleSignature } from './subtitle';

interface PageHeaderSignature {
  Blocks: {
    default: [
      {
        Actions?: ComponentLike<PageHeaderActionsSignature>;
        Badges?: ComponentLike<PageHeaderBadgesSignature>;
        Breadcrumb?: ComponentLike<HdsYieldSignature>;
        Description?: ComponentLike<PageHeaderDescriptionSignature>;
        Generic?: ComponentLike<HdsYieldSignature>;
        IconTile?: ComponentLike<HdsIconTileSignature>;
        Subtitle?: ComponentLike<PageHeaderSubtitleSignature>;
        Title?: ComponentLike<PageHeaderTitleSignature>;
      }
    ];
  };
  Element: HTMLElement;
}

const PageHeaderComponent = TemplateOnlyComponent<PageHeaderSignature>();

export default PageHeaderComponent;
