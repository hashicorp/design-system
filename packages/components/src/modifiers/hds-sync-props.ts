/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { modifier } from 'ember-modifier';

/**
 * Signature for the sync-props modifier
 *
 * This modifier is designed to bridge Ember's reactive arguments (@args) with
 * Web Component properties. Unlike HTML attributes (which are always strings),
 * Web Component properties can accept complex data types (objects, booleans, etc.)
 */
export interface HdsSyncPropsSignature {
  Element: Element;
  Args: {
    /**
     * Named arguments containing key-value pairs to sync.
     * Keys are the property names on the Web Component.
     * Values are the Ember argument values to assign.
     *
     * Example: {{hds-sync-props title=@title open=@isOpen disabled=@isDisabled}}
     */
    Named: Record<string, unknown>;
  };
}

/**
 * A generic modifier that syncs Ember arguments to Web Component properties.
 *
 * DATA FLOW:
 * 1. Ember Template: <cds-accordion-item {{hds-sync-props title=@title open=@isOpen}}>
 * 2. Modifier receives named args: { title: "My Title", open: true }
 * 3. Modifier iterates over each key-value pair
 * 4. Modifier assigns values directly to element properties: element.title = "My Title"
 * 5. When args change, Ember re-runs the modifier, updating properties
 *
 * WHY PROPERTIES OVER ATTRIBUTES:
 * - HTML attributes are always serialized to strings
 * - Web Components often expect complex types (boolean, object, array)
 * - Setting properties directly preserves the original data type
 * - Example: element.setAttribute('open', true) → element.open === "true" (string!)
 *            element.open = true → element.open === true (boolean!)
 *
 * USAGE:
 * ```gts
 * <cds-accordion-item
 *   {{hds-sync-props
 *     title=@title
 *     open=@isOpen
 *     disabled=@isDisabled
 *   }}
 * >
 *   {{yield}}
 * </cds-accordion-item>
 * ```
 */
export default modifier<HdsSyncPropsSignature>(
  (element, _positional, named = {}) => {
    // Store original values for cleanup on teardown
    const originalValues: Record<string, unknown> = {};

    // Iterate over all named arguments passed to the modifier
    // and assign each value directly to the corresponding property on the DOM element.
    // This ensures complex types (booleans, objects) are passed correctly
    // to the underlying Web Component without string serialization.
    for (const [propertyName, value] of Object.entries(named)) {
      // Only set the property if the value is defined (not undefined)
      // This prevents accidentally overwriting Web Component defaults
      if (value !== undefined) {
        // Store original value for potential cleanup
        originalValues[propertyName] = (
          element as unknown as Record<string, unknown>
        )[propertyName];

        // Direct property assignment - bypasses attribute serialization
        // We use Record<string, unknown> to allow dynamic property access
        (element as unknown as Record<string, unknown>)[propertyName] = value;
      }
    }

    // Cleanup function: restore original values when modifier is torn down
    // This ensures Web Components return to their default state if the
    // Ember component is destroyed before the Web Component
    return () => {
      for (const [propertyName, originalValue] of Object.entries(
        originalValues
      )) {
        (element as unknown as Record<string, unknown>)[propertyName] =
          originalValue;
      }
    };
  }
);
