/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import getIconByNameResource from "./get-icon-by-name.js";
import getIconsResource from "./get-icons.js";

import type { McpResource } from "../types.js";

const HDS_ICONS_RESOURCES: McpResource[] = [
  getIconsResource,
  getIconByNameResource,
];

export default HDS_ICONS_RESOURCES;
