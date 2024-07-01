/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { ComponentLike } from '@glint/template';
import type { HdsAccordionItemSignature } from './item/index.ts';
interface HdsAccordionSignature {
    Blocks: {
        default: [
            {
                Item?: ComponentLike<HdsAccordionItemSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
declare const HdsAccordionComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsAccordionSignature>;
export default HdsAccordionComponent;
//# sourceMappingURL=index.d.ts.map