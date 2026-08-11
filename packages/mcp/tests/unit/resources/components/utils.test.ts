/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  toSerializableComponent,
  toSerializableComponentSummary,
} from "../../../../src/resources/components/utils.js";

import type {
  ComponentRecord,
  ComponentSummary,
} from "../../../../src/resources/components/store/lookup.js";

describe("toSerializableComponentSummary", () => {
  it("maps field values correctly", () => {
    const summary: ComponentSummary = {
      name: "Hds::Button",
      modulePath: "hds/button",
      docsPath: "components/button",
      argCount: 1,
      blockCount: 1,
    };

    expect(toSerializableComponentSummary(summary)).toStrictEqual({
      name: "Hds::Button",
      modulePath: "hds/button",
      docsPath: "components/button",
      argCount: 1,
      blockCount: 1,
    });
  });

  it("omits docsPath when absent", () => {
    const summary: ComponentSummary = {
      name: "Hds::Button",
      modulePath: "hds/button",
      argCount: 0,
      blockCount: 0,
    };

    expect(toSerializableComponentSummary(summary)).toStrictEqual({
      name: "Hds::Button",
      modulePath: "hds/button",
      argCount: 0,
      blockCount: 0,
    });
  });
});

describe("toSerializableComponent", () => {
  it("maps args and blocks including their optional keys", () => {
    const component: ComponentRecord = {
      name: "Hds::Button",
      modulePath: "hds/button",
      docsPath: "components/button",
      element: "HTMLAnchorElement | HTMLButtonElement",
      args: [
        {
          name: "size",
          type: '"small" | "medium" | "large"',
          required: false,
          values: ["small", "medium", "large"],
          inheritedFrom: "hds/interactive",
        },
        {
          name: "text",
          type: "string",
          required: true,
        },
      ],
      blocks: [
        {
          name: "default",
          yields: [{ name: "T", type: "unknown" }],
        },
      ],
    };

    expect(toSerializableComponent(component)).toStrictEqual({
      name: "Hds::Button",
      modulePath: "hds/button",
      docsPath: "components/button",
      element: "HTMLAnchorElement | HTMLButtonElement",
      args: [
        {
          name: "size",
          type: '"small" | "medium" | "large"',
          required: false,
          values: ["small", "medium", "large"],
          inheritedFrom: "hds/interactive",
        },
        {
          name: "text",
          type: "string",
          required: true,
        },
      ],
      blocks: [
        {
          name: "default",
          yields: [{ name: "T", type: "unknown" }],
        },
      ],
    });
  });

  it("omits docsPath and element when absent", () => {
    const component: ComponentRecord = {
      name: "Hds::Button",
      modulePath: "hds/button",
      args: [],
      blocks: [],
    };

    expect(toSerializableComponent(component)).toStrictEqual({
      name: "Hds::Button",
      modulePath: "hds/button",
      args: [],
      blocks: [],
    });
  });
});
