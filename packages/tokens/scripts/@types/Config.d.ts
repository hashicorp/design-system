/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { Config } from 'style-dictionary';

export type ConfigTarget = {
    source: Config['source'],
    transformGroup: Config['transformGroup'],
    platforms: string[],
    preprocessors?: string[],
};

export type ConfigTargets = {
    [key: string]: ConfigTarget
};

