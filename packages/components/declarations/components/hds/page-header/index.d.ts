/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { ComponentLike } from '@glint/template';
import type { HdsIconTileSignature } from '../icon-tile';
import type { HdsYieldSignature } from '../yield';
import type { HdsPageHeaderActionsSignature } from './actions';
import type { HdsPageHeaderBadgesSignature } from './badges';
import type { HdsPageHeaderDescriptionSignature } from './description';
import type { HdsPageHeaderTitleSignature } from './title';
import type { HdsPageHeaderSubtitleSignature } from './subtitle';
interface HdsPageHeaderSignature {
    Blocks: {
        default: [
            {
                Actions?: ComponentLike<HdsPageHeaderActionsSignature>;
                Badges?: ComponentLike<HdsPageHeaderBadgesSignature>;
                Breadcrumb?: ComponentLike<HdsYieldSignature>;
                Description?: ComponentLike<HdsPageHeaderDescriptionSignature>;
                Generic?: ComponentLike<HdsYieldSignature>;
                IconTile?: ComponentLike<HdsIconTileSignature>;
                Subtitle?: ComponentLike<HdsPageHeaderSubtitleSignature>;
                Title?: ComponentLike<HdsPageHeaderTitleSignature>;
            }
        ];
    };
    Element: HTMLElement;
}
declare const HdsPageHeaderComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsPageHeaderSignature>;
export default HdsPageHeaderComponent;
//# sourceMappingURL=index.d.ts.map