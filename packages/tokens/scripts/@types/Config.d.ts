/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { Config } from 'style-dictionary';

export type ConfigTarget = {
    source: Config['source'],
    // TODO- CR: why this can't be Config['transformGroup'] ??
    transformGroup: string,
    platforms: string[],
};

export type ConfigTargets = {
    [key: string]: ConfigTarget
};

