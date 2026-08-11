/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { toJsonResourceResponse } from "../utils.js";
import { COMPONENTS_URI, COMPONENT_BY_NAME_URI_TEMPLATE } from "./constants.js";
import { getOrLoadComponentStore } from "./store/index.js";
import { toSerializableComponent } from "./utils.js";

import type { McpResource } from "../types.js";
import type { ComponentCatalogStore } from "./store/index.js";
import type { ComponentSummary } from "./store/lookup.js";

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
  const query = value.trim().toLowerCase();
  const matches: string[] = [];

  for (const component of components) {
    const aliases = [component.name, component.modulePath];
    const isMatch =
      query.length === 0 ||
      aliases.some((alias) => alias.toLowerCase().includes(query));

    if (isMatch) {
      matches.push(component.name);
    }

    if (matches.length >= limit) {
      break;
    }
  }

  return matches;
};

// a completion is a hint, so an unreadable catalog must not fail the request
const completeComponentNamesSafely = (
  getStore: () => ComponentCatalogStore,
  value: string,
): string[] => {
  try {
    const components = getStore().listComponents();

    // the whole catalog completes, so the client is told the real match count
    return completeComponentNames(components, value, components.length);
  } catch (error: unknown) {
    console.error("Resource completion failed (get_hds_component):", error);

    return [];
  }
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
    component: toSerializableComponent(component),
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
        componentName: (value) => completeComponentNamesSafely(getStore, value),
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
