/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  completeFromAliases,
  withSafeCompletion,
} from "../shared/completions.js";
import { defineDetailResource } from "../shared/define-resource.js";
import { toJsonResourceResponse } from "../shared/responses.js";
import { buildDetailUri } from "../shared/uri.js";
import { COMPONENTS_URI, COMPONENT_BY_NAME_URI_TEMPLATE } from "./constants.js";
import { getOrLoadComponentStore } from "./store/index.js";
import { toSerializableComponent } from "./utils.js";

import type { McpResource } from "../types.js";
import type { ComponentCatalogStore } from "./store/index.js";
import type { ComponentSummary } from "./store/lookup.js";

export const completeComponentNames = (
  components: ComponentSummary[],
  value: string,
): string[] => {
  return completeFromAliases({
    items: components,
    // the gts class name a consumer imports, `HdsAdvancedTableTh`, alongside the hbs invocation
    // name and the module path, so a partial of any of the three completes
    getAliases: (component) => [
      component.name,
      component.name.replaceAll("::", ""),
      component.modulePath,
    ],
    getValue: (component) => component.name,
    value,
  });
};

export const readComponentByNameResource = (
  store: ComponentCatalogStore,
  componentName: string,
) => {
  const component = store.getComponentByName(componentName);
  const uri = buildDetailUri(COMPONENTS_URI, componentName);

  if (component === null) {
    return toJsonResourceResponse(uri, {
      found: false,
      requestedComponentName: componentName,
      message: "Component not found for provided componentName.",
    });
  }

  return toJsonResourceResponse(uri, {
    found: true,
    requestedComponentName: componentName,
    component: toSerializableComponent(component),
  });
};

export const createGetComponentByNameResource = (
  getStore: () => ComponentCatalogStore,
): McpResource => {
  return defineDetailResource({
    name: "get_hds_component",
    uriTemplate: COMPONENT_BY_NAME_URI_TEMPLATE,
    title: "HDS component detail",
    description: "Detailed component record for a specific component name",
    variableName: "componentName",
    complete: withSafeCompletion("get_hds_component", (value) =>
      completeComponentNames(getStore().listComponents(), value),
    ),
    read: (componentName) =>
      readComponentByNameResource(getStore(), componentName),
  });
};

const getComponentByNameResource = createGetComponentByNameResource(
  getOrLoadComponentStore,
);

export default getComponentByNameResource;
