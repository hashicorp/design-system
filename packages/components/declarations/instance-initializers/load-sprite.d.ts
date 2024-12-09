/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type ApplicationInstance from '@ember/application/instance';
export declare function initialize(appInstance: ApplicationInstance & {
    __flightIconsSpriteLoaded?: boolean;
}): Promise<void>;
declare const _default: {
    initialize: typeof initialize;
};
export default _default;
//# sourceMappingURL=load-sprite.d.ts.map