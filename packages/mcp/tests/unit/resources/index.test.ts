/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { describe, expect, it, vi } from "vitest";
import { registerResources } from "../../../src/resources/index.js";
import { createRecordingTelemetry } from "../../support/recording-telemetry.js";
import { buildRequestHandlerExtra } from "../../support/request-handler.js";

import type { ReadResourceTemplateCallback } from "@modelcontextprotocol/sdk/server/mcp.js";

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

    expect(registerResource).toHaveBeenCalledTimes(6);
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

    expect(registerResource).toHaveBeenCalledTimes(6);
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

  it("reports reads to the telemetry it is registered with", async () => {
    const server = new McpServer({ name: "test-server", version: "0.0.0" });
    const registerResource = vi.spyOn(server, "registerResource");
    const { telemetry, events } = createRecordingTelemetry();

    registerResources(server, telemetry);

    const registration = registerResource.mock.calls.find(
      ([name]) => name === "get_hds_icon",
    );
    // the detail template's callback takes the uri variables as its second argument
    const callback = registration?.[3] as ReadResourceTemplateCallback;

    // a missing variable resolves without loading a catalog from disk
    await callback(
      new URL("hds://icons/"),
      {},
      buildRequestHandlerExtra(),
    );

    expect(events).toStrictEqual([
      {
        event: "hds_mcp_resource_read",
        properties: expect.objectContaining({
          resource: "get_hds_icon",
          outcome: "ok",
        }),
      },
    ]);
  });
});
