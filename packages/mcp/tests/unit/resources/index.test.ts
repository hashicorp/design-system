/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { describe, expect, it, vi } from "vitest";
import { registerResources } from "../../../src/resources/index.js";

describe("registerResources", () => {
  it("registers the static icon catalog and icon detail template", () => {
    const server = new McpServer({ name: "test-server", version: "0.0.0" });
    const registerResource = vi.spyOn(server, "registerResource");

    registerResources(server);

    const registrations = registerResource.mock.calls.map(
      ([name, uriOrTemplate, config, callback]) => ({
        name,
        uri:
          typeof uriOrTemplate === "string"
            ? uriOrTemplate
            : uriOrTemplate.uriTemplate.toString(),
        mimeType: config.mimeType,
        callback,
      }),
    );

    expect(registerResource).toHaveBeenCalledTimes(2);
    expect(registrations).toStrictEqual(
      expect.arrayContaining([
        {
          name: "get_hds_icons",
          uri: "hds://icons",
          mimeType: "application/json",
          callback: expect.any(Function),
        },
        {
          name: "get_hds_icon",
          uri: "hds://icons/{iconName}",
          mimeType: "application/json",
          callback: expect.any(Function),
        },
      ]),
    );
  });
});
