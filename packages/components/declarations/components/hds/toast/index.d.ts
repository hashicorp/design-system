/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { HdsAlertSignature } from '../alert/';
export interface HdsToastSignature extends Omit<HdsAlertSignature, 'Args'> {
    Args: Omit<HdsAlertSignature['Args'], 'type'>;
}
declare const HdsToast: import("@ember/component/template-only").TemplateOnlyComponent<HdsToastSignature>;
export default HdsToast;
//# sourceMappingURL=index.d.ts.map