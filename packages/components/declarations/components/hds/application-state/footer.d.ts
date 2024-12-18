/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { ComponentLike } from '@glint/template';
import type { HdsLinkStandaloneSignature } from '../link/standalone';
import type { HdsButtonSignature } from '../button';
import type { HdsDropdownSignature } from '../dropdown';
export interface HdsApplicationStateFooterSignature {
    Args: {
        hasDivider?: boolean;
    };
    Blocks: {
        default?: [
            {
                Button?: ComponentLike<HdsButtonSignature>;
                Dropdown?: ComponentLike<HdsDropdownSignature>;
                LinkStandalone?: ComponentLike<HdsLinkStandaloneSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
declare const HdsApplicationStateFooter: import("@ember/component/template-only").TemplateOnlyComponent<HdsApplicationStateFooterSignature>;
export default HdsApplicationStateFooter;
//# sourceMappingURL=footer.d.ts.map