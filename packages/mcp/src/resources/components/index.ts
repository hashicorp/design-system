/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import getComponentByNameResource from "./get-component-by-name.js";
import getComponentsResource from "./get-components.js";

import type { McpResource } from "../types.js";

const COMPONENTS_RESOURCES: McpResource[] = [
  getComponentsResource,
  getComponentByNameResource,
];

export default COMPONENTS_RESOURCES;
