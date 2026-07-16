/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { describe, expect, it, vi } from "vitest";
import { registerResources } from "../../../src/resources/index.js";

describe("registerResources", () => {
<<<<<<< HEAD
  it("registers the static icon catalog and icon detail template", () => {
=======
  it("registers the component catalog and detail template", () => {
>>>>>>> c5424d5764 (added component resources)
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

    expect(registerResource).toHaveBeenCalledTimes(4);
    expect(registrations).toStrictEqual(
      expect.arrayContaining([
        {
<<<<<<< HEAD
          name: "get_hds_icons",
          uri: "hds://icons",
=======
          name: "get_hds_components",
          uri: "hds://components",
>>>>>>> c5424d5764 (added component resources)
          mimeType: "application/json",
          callback: expect.any(Function),
        },
        {
<<<<<<< HEAD
          name: "get_hds_icon",
          uri: "hds://icons/{iconName}",
=======
          name: "get_hds_component",
          uri: "hds://components/{componentName}",
>>>>>>> c5424d5764 (added component resources)
          mimeType: "application/json",
          callback: expect.any(Function),
        },
      ]),
    );
  });

  it("registers the static catalog and token detail template", () => {
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

    expect(registerResource).toHaveBeenCalledTimes(4);
    expect(registrations).toStrictEqual(
      expect.arrayContaining([
        {
          name: "get_hds_tokens",
          uri: "hds://tokens",
          mimeType: "application/json",
          callback: expect.any(Function),
        },
        {
          name: "get_hds_token",
          uri: "hds://tokens/{tokenKey}",
          mimeType: "application/json",
          callback: expect.any(Function),
        },
      ]),
    );
  });
});
