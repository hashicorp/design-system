/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { MAX_ARG_VALUES } from "../../../../src/tools/components/constants.js";
import {
  toSerializableArg,
  toSerializableComponentApi,
} from "../../../../src/tools/components/utils.js";

import type { ComponentArg } from "../../../../src/stores/components/schema.js";
import type { ComponentRecord } from "../../../../src/stores/components/lookup.js";

const buildArg = (overrides: Partial<ComponentArg> = {}): ComponentArg => ({
  name: "size",
  type: '"small" | "medium"',
  required: false,
  ...overrides,
});

const buildRecord = (
  overrides: Partial<ComponentRecord> = {}
): ComponentRecord => ({
  name: "Hds::Button",
  modulePath: "hds/button",
  docsPath: "components/button",
  element: "HTMLButtonElement",
  args: [],
  blocks: [],
  ...overrides,
});

describe("toSerializableArg", () => {
  it("keeps the fields that describe how an argument is called", () => {
    expect(
      toSerializableArg(
        buildArg({ name: "text", type: "string", required: true })
      )
    ).toStrictEqual({ name: "text", type: "string", required: true });
  });

  it("omits values and inheritedFrom rather than emitting empty ones", () => {
    const serialized = toSerializableArg(buildArg());

    expect(serialized).not.toHaveProperty("values");
    expect(serialized).not.toHaveProperty("inheritedFrom");
  });

  it("keeps the module an inherited argument came from", () => {
    expect(
      toSerializableArg(buildArg({ inheritedFrom: "hds/interactive" }))
    ).toMatchObject({ inheritedFrom: "hds/interactive" });
  });

  it("passes a short enum through untouched, and says so by omission", () => {
    const serialized = toSerializableArg(
      buildArg({ values: ["small", "medium", "large"] })
    );

    expect(serialized.values).toStrictEqual(["small", "medium", "large"]);
    expect(serialized).not.toHaveProperty("valuesCount");
    expect(serialized).not.toHaveProperty("valuesTruncated");
  });

  it("leaves an enum sitting exactly on the cap whole", () => {
    const values = Array.from({ length: MAX_ARG_VALUES }, (_v, i) => `v${i}`);
    const serialized = toSerializableArg(buildArg({ values }));

    expect(serialized.values).toHaveLength(MAX_ARG_VALUES);
    expect(serialized).not.toHaveProperty("valuesTruncated");
  });

  it("caps one value past the cap, and reports the real total", () => {
    const values = Array.from(
      { length: MAX_ARG_VALUES + 1 },
      (_v, i) => `v${i}`
    );
    const serialized = toSerializableArg(buildArg({ values }));

    expect(serialized.values).toHaveLength(MAX_ARG_VALUES);
    expect(serialized.valuesTruncated).toBe(true);
    expect(serialized.valuesCount).toBe(MAX_ARG_VALUES + 1);
  });

  it("keeps the head of a capped enum, so the sample is still identifying", () => {
    const values = Array.from({ length: 675 }, (_v, i) => `icon-${i}`);
    const serialized = toSerializableArg(buildArg({ values }));

    expect(serialized.values?.[0]).toBe("icon-0");
    expect(serialized.valuesCount).toBe(675);
  });

  it("treats an empty enum as present but empty, not as absent", () => {
    expect(toSerializableArg(buildArg({ values: [] })).values).toStrictEqual(
      []
    );
  });
});

describe("toSerializableComponentApi", () => {
  it("maps every field a caller needs to write the invocation", () => {
    expect(
      toSerializableComponentApi(
        buildRecord({
          args: [buildArg({ name: "text", type: "string", required: true })],
          blocks: [
            { name: "default", yields: [{ name: "Title", type: "typeof T" }] },
          ],
        })
      )
    ).toStrictEqual({
      name: "Hds::Button",
      modulePath: "hds/button",
      docsPath: "components/button",
      element: "HTMLButtonElement",
      args: [{ name: "text", type: "string", required: true }],
      blocks: [
        { name: "default", yields: [{ name: "Title", type: "typeof T" }] },
      ],
    });
  });

  it("omits docsPath and element when the catalog does not record them", () => {
    const serialized = toSerializableComponentApi(
      buildRecord({ docsPath: undefined, element: undefined })
    );

    expect(serialized).not.toHaveProperty("docsPath");
    expect(serialized).not.toHaveProperty("element");
  });

  it("caps every argument, not just the first", () => {
    const values = Array.from({ length: 100 }, (_v, i) => `v${i}`);
    const serialized = toSerializableComponentApi(
      buildRecord({
        args: [
          buildArg({ name: "a", values }),
          buildArg({ name: "b", values }),
        ],
      })
    );

    for (const arg of serialized.args) {
      expect(arg.values, `@${arg.name} should be capped`).toHaveLength(
        MAX_ARG_VALUES
      );
    }
  });

  it("keeps a component with no args or blocks representable", () => {
    const serialized = toSerializableComponentApi(buildRecord());

    expect(serialized.args).toStrictEqual([]);
    expect(serialized.blocks).toStrictEqual([]);
  });
});
