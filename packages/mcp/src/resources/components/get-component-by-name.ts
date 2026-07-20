import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { toJsonResourceResponse } from "../utils.js";
import {
  COMPONENT_BY_NAME_URI_TEMPLATE,
  COMPONENTS_URI,
} from "./constants.js";
import { getOrLoadComponentStore } from "./store/index.js";

import type { McpResource } from "../types.js";
import type { ComponentSummary } from "./store/lookup.js";
import type { ComponentCatalogStore } from "./store/index.js";

const getComponentByNameUri = (componentName: string): string => {
  return `${COMPONENTS_URI}/${encodeURIComponent(componentName)}`;
};

const decodeComponentName = (componentName: string): string => {
  try {
    return decodeURIComponent(componentName);
  } catch {
    return componentName;
  }
};

export const completeComponentNames = (
  components: ComponentSummary[],
  value: string,
  limit = 100,
): string[] => {
  const query = value.trim().toLowerCase().replace(/^hds[-:\s]*/u, "hds");

  return components
    .filter((component) => component.name.toLowerCase().includes(query))
    .slice(0, limit)
    .map((component) => component.name);
};

export const readComponentByNameResource = (
  store: ComponentCatalogStore,
  componentName: string,
) => {
  const component = store.getComponentByName(componentName);

  if (component === null) {
    return toJsonResourceResponse(getComponentByNameUri(componentName), {
      found: false,
      requestedComponentName: componentName,
      message: "Component not found for provided componentName.",
    });
  }

  return toJsonResourceResponse(getComponentByNameUri(componentName), {
    found: true,
    requestedComponentName: componentName,
    component,
  });
};

export const createGetComponentByNameResource = (
  getStore: () => ComponentCatalogStore,
): McpResource => {
  return {
    name: "get_hds_component",
    template: new ResourceTemplate(COMPONENT_BY_NAME_URI_TEMPLATE, {
      list: undefined,
      complete: {
        componentName: (value) =>
          completeComponentNames(getStore().listComponents(), value),
      },
    }),
    config: {
      title: "HDS component detail",
      description: "Detailed component record for a specific component name",
      mimeType: "application/json",
    },
    readCallback: async (
      uri: URL,
      variables: Record<string, string | string[]>,
    ) => {
      const componentName = variables.componentName;

      if (
        typeof componentName !== "string" ||
        componentName.trim().length === 0
      ) {
        return toJsonResourceResponse(uri.toString(), {
          found: false,
          message: "Missing componentName variable.",
        });
      }

      return readComponentByNameResource(
        getStore(),
        decodeComponentName(componentName),
      );
    },
  };
};

const getComponentByNameResource = createGetComponentByNameResource(
  getOrLoadComponentStore,
);

export default getComponentByNameResource;
