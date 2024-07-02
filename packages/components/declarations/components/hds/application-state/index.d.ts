/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { ComponentLike } from '@glint/template';
import type { HdsApplicationStateHeaderSignature } from './header';
import type { HdsApplicationStateBodySignature } from './body';
import type { HdsApplicationStateFooterSignature } from './footer';
export interface HdsApplicationStateSignature {
    Blocks: {
        default: [
            {
                Header?: ComponentLike<HdsApplicationStateHeaderSignature>;
                Body?: ComponentLike<HdsApplicationStateBodySignature>;
                Footer?: ComponentLike<HdsApplicationStateFooterSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
declare const HdsApplicationStateComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsApplicationStateSignature>;
export default HdsApplicationStateComponent;
//# sourceMappingURL=index.d.ts.map