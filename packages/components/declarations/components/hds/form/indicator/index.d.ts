/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTextBodySignature } from '../../text/body';
import type { HdsBadgeSignature } from '../../badge';
export interface HdsFormIndicatorSignature {
    Args: {
        isOptional?: boolean;
        isRequired?: boolean;
    };
    Element: HdsTextBodySignature['Element'] | HdsBadgeSignature['Element'];
}
export default class HdsFormIndicatorComponent extends Component<HdsFormIndicatorSignature> {
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map