import { toJsonResourceResponse } from "../utils.js";
import { COMPONENTS_URI } from "./constants.js";
import { getOrLoadComponentStore } from "./store/index.js";
import { toSerializableComponentSummary } from "./utils.js";

import type { McpResource } from "../types.js";
import type { ComponentCatalogStore } from "./store/index.js";

export const readComponentsResource = (store: ComponentCatalogStore) => {
  const meta = store.getMeta();

  return toJsonResourceResponse(COMPONENTS_URI, {
    updatedAt: meta.updatedAt,
    totalComponentCount: meta.totalComponentCount,
    components: store.listComponents().map(toSerializableComponentSummary),
  });
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
