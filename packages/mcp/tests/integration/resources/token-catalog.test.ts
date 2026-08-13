/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { loadTokenCatalog } from "../../../src/resources/tokens/store/index.js";

describe("generated token catalog", () => {
  it("loads the package artifact and resolves its public aliases", () => {
    const store = loadTokenCatalog();
    const meta = store.getMeta();

    expect(meta.totalTokenCount).toBeGreaterThan(0);
    expect(store.listTokens()).toHaveLength(meta.totalTokenCount);
    expect(store.getTokenByKey("{border.radius.x-small}")?.key).toBe(
      "{border.radius.x-small}",
    );
    expect(store.getTokenByKey("border.radius.x-small")?.key).toBe(
      "{border.radius.x-small}",
    );
    expect(store.getTokenByKey("token-border-radius-x-small")?.key).toBe(
      "{border.radius.x-small}",
    );
  });
});
