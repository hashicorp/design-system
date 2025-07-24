/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import { LinkTo } from '@ember/routing';
/**
 * Resolves the correct component to use for the `LinkTo`.
 *
 * @param isRouteExternal - If true, will return the `LinkToExternal` component. If `ember-engines` is not installed, an assertion will be thrown.
 * @returns The correct component to use for the `LinkTo`.
 */
export declare function hdsResolveLinkToComponent(isRouteExternal?: boolean): typeof LinkTo;
