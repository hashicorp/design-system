/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { z } from "zod";
import { CATALOG_TOOL_ANNOTATIONS, defineTool } from "../shared/define-tool.js";
import catalogSourceOutputSchema from "../shared/output-schema.js";
import {
  toJsonToolResponse,
  withSafeToolHandler,
} from "../shared/responses.js";
import { MAX_FILTER_LENGTH, clampFilterValue } from "../shared/search.js";
import {
  GET_COMPONENT_TOOL_NAME,
  MAX_ARG_VALUES,
  NOT_FOUND_SUGGESTION_LIMIT,
  SEARCH_COMPONENTS_TOOL_NAME,
} from "./constants.js";
import { SEARCH_ICONS_TOOL_NAME } from "../hds-icons/constants.js";
import { getOrLoadComponentStore } from "../../stores/components/index.js";
import { toSerializableComponentApi } from "./utils.js";

import type { ToolRegistration } from "../shared/define-tool.js";
import type { ComponentCatalogStore } from "../../stores/components/index.js";
import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

export const getComponentInputShape = {
  name: z
    .string()
    .min(1)
    .max(MAX_FILTER_LENGTH)
    .describe(
      "Component name. Accepts the template invocation ('Hds::Button'), the imported class name ('HdsButton'), the bare name ('button') or the module path ('hds/button'). Case-insensitive, and the Hds:: namespace is optional."
    ),
};

const componentArgOutputSchema = z.object({
  // the argument name without its `@` sigil, as it appears in the signature
  name: z.string(),
  type: z.string(),
  required: z.boolean(),
  values: z.array(z.string()).optional(),
  // the real length when `values` was capped, so a caller knows what it is not seeing
  valuesCount: z.number().int().optional(),
  valuesTruncated: z.boolean().optional(),
  // the module an inherited argument actually comes from, e.g. `hds/interactive`
  inheritedFrom: z.string().optional(),
});

const componentApiOutputSchema = z.object({
  name: z.string(),
  modulePath: z.string(),
  docsPath: z.string().optional(),
  element: z.string().optional(),
  args: z.array(componentArgOutputSchema),
  blocks: z.array(
    z.object({
      name: z.string(),
      yields: z.array(z.object({ name: z.string(), type: z.string() })),
    })
  ),
});

export const getComponentOutputShape = {
  found: z.boolean(),
  requestedName: z.string(),
  component: componentApiOutputSchema.optional(),
  message: z.string().optional(),
  suggestions: z.array(z.string()).optional(),
  source: catalogSourceOutputSchema,
};

export const getComponentOutputSchema = z.object(getComponentOutputShape);

export interface GetComponentInput {
  name: string;
}

export type GetComponentPayload = z.infer<typeof getComponentOutputSchema>;

const DESCRIPTION = [
  "Read the full API of one Helios Design System component: every argument with its type, whether it is required and which values it accepts, plus the blocks it takes and the contextual components it yields.",
  "The data is generated from the TypeScript declarations of the installed @hashicorp/design-system-components package, so it is the authoritative answer to 'what arguments does this take' — prefer it over prose documentation, which can lag the code.",
  `Pass the template invocation, the class name, the bare name or the module path. When the name does not resolve, ${SEARCH_COMPONENTS_TOOL_NAME} results come back as suggestions rather than an error.`,
  `An argument's \`values\` list is capped at ${MAX_ARG_VALUES}; when \`valuesTruncated\` is true, \`valuesCount\` holds the real total. In practice only icon-name and HTML-tag arguments hit the cap — use ${SEARCH_ICONS_TOOL_NAME} to pick an icon name.`,
  "Yielded contextual components are listed by the name they take inside the block. Their own arguments are separate catalog entries, so look up 'Hds::Alert::Title' to see what [A].Title accepts.",
  "The catalog is read from disk and never fetched.",
].join(" ");

export const getComponent = (
  store: ComponentCatalogStore,
  input: GetComponentInput
): GetComponentPayload => {
  const meta = store.getMeta();
  // bounded before it is echoed back, rather than only at the declared schema
  const requestedName = clampFilterValue(input.name);
  const component = store.getComponentByName(requestedName);

  if (component === null) {
    const suggestions = store.suggestComponentNames(
      requestedName,
      NOT_FOUND_SUGGESTION_LIMIT
    );

    return {
      found: false,
      requestedName,
      message: `No Helios component resolves to "${requestedName}". Use ${SEARCH_COMPONENTS_TOOL_NAME} to find the exact invocation name.`,
      ...(suggestions.length === 0 ? {} : { suggestions }),
      source: meta.source,
    };
  }

  return {
    found: true,
    requestedName,
    component: toSerializableComponentApi(component),
    source: meta.source,
  };
};

export const createGetComponentTool = (
  getStore: () => ComponentCatalogStore
): ToolRegistration => {
  const executeCallback: ToolCallback<typeof getComponentInputShape> =
    withSafeToolHandler(GET_COMPONENT_TOOL_NAME, (input) =>
      toJsonToolResponse(getComponent(getStore(), input))
    );

  return defineTool<
    typeof getComponentInputShape,
    typeof getComponentOutputShape
  >({
    name: GET_COMPONENT_TOOL_NAME,
    config: {
      title: "Get an HDS component API",
      description: DESCRIPTION,
      inputSchema: getComponentInputShape,
      outputSchema: getComponentOutputShape,
      annotations: CATALOG_TOOL_ANNOTATIONS,
    },
    executeCallback,
  });
};

const getComponentTool = createGetComponentTool(getOrLoadComponentStore);

export default getComponentTool;
