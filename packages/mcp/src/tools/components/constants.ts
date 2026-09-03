/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export const SEARCH_COMPONENTS_TOOL_NAME = "search_hds_components";
export const GET_COMPONENT_TOOL_NAME = "get_hds_component";

/**
 * Enum sizes in the catalog are bimodal: 164 arguments carry 15 values or fewer, and the
 * remaining 43 carry either 112 (HTML tag names) or 675 (icon names), because the generator
 * hoists anything over 50 into a shared value set. A cap of 25 therefore never truncates a
 * real enum, and always truncates the two reference lists that would otherwise make a single
 * component's API 30KB.
 */
export const MAX_ARG_VALUES = 25;

export const NOT_FOUND_SUGGESTION_LIMIT = 5;
