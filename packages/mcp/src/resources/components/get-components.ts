/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { toJsonResourceResponse } from "../shared/responses.js";
import { COMPONENTS_URI } from "./constants.js";
import { getOrLoadComponentStore } from "../../stores/components/index.js";
import { toSerializableComponentSummary } from "./utils.js";

import type { McpResource } from "../types.js";
import type { ComponentCatalogStore } from "../../stores/components/index.js";

export const readComponentsResource = (store: ComponentCatalogStore) => {
  const meta = store.getMeta();
  const payload = {
    totalComponentCount: meta.totalComponentCount,
    source: meta.source,
    components: store
      .listComponents()
      .map((component) => toSerializableComponentSummary(component)),
  };

  return toJsonResourceResponse(COMPONENTS_URI, payload);
};

export const createGetComponentsResource = (
  getStore: () => ComponentCatalogStore,
): McpResource => {
  return {
    name: "get_hds_components",
    uri: COMPONENTS_URI,
    config: {
      title: "HDS component catalog index",
      description: "Canonical list of components with summary metadata",
      mimeType: "application/json",
    },
    readCallback: async () => readComponentsResource(getStore()),
  };
};

export const getComponentsResource = createGetComponentsResource(
  getOrLoadComponentStore,
);

export default getComponentsResource;
