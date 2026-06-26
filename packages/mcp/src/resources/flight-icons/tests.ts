/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import assert from "node:assert/strict";
import test from "node:test";
import resources, { ICONS_URI } from "./index.js";

import type { DynamicMcpResource, StaticMcpResource } from "../types.js";

type JsonResponse = {
  contents: {
    uri: string;
    mimeType: string;
    text: string;
  }[];
};

const requestContext = {} as never;

const getJsonPayload = (response: JsonResponse): unknown => {
  const [content] = response.contents;

  assert.ok(content);

  return JSON.parse(content.text) as unknown;
};

const getStaticResource = (): StaticMcpResource => {
  const resource = resources.find((entry) => entry.name === "get_hds_icons");

  if (resource === undefined || !("uri" in resource)) {
    throw new Error("Expected static get_hds_icons resource");
  }

  return resource;
};

const getDynamicResource = (): DynamicMcpResource => {
  const resource = resources.find((entry) => entry.name === "get_hds_icon");

  if (resource === undefined || !("template" in resource)) {
    throw new Error("Expected dynamic get_hds_icon resource");
  }

  return resource;
};

test("get_hds_icons returns catalog summary and icons", async () => {
  const resource = resources.find((entry) => entry.name === "get_hds_icons");

  const response = (await (resource as StaticMcpResource).readCallback(
    new URL(ICONS_URI),
    requestContext,
  )) as JsonResponse;
  const [content] = response.contents;
  const payload = getJsonPayload(response) as {
    totalIconCount: number;
    totalAssetCount: number;
    categories: string[];
    icons: {
      iconName: string;
      description: string;
      category: string;
      sizes: string[];
      hasMapping: boolean;
    }[];
  };

  assert.ok(content);
  assert.equal(content.uri, ICONS_URI);
  assert.equal(content.mimeType, "application/json");
  assert.ok(payload.totalIconCount > 0);
  assert.ok(payload.totalAssetCount >= payload.totalIconCount);
  assert.ok(payload.categories.length > 0);
  assert.equal(payload.icons.length, payload.totalIconCount);
  assert.ok(payload.icons[0]);
  assert.equal(typeof payload.icons[0]?.iconName, "string");
});

test("get_hds_icon returns found=true for a known icon", async () => {
  const staticResource = getStaticResource();
  const dynamicResource = getDynamicResource();

  const staticResponse = (await staticResource.readCallback(
    new URL(ICONS_URI),
    requestContext,
  )) as JsonResponse;
  const staticPayload = getJsonPayload(staticResponse) as {
    icons: { iconName: string }[];
  };
  const knownIconName = staticPayload.icons[0]?.iconName;

  assert.ok(knownIconName);

  const response = (await dynamicResource.readCallback(
    new URL(ICONS_URI),
    {
      iconName: knownIconName,
    },
    requestContext,
  )) as JsonResponse;
  const [content] = response.contents;
  const payload = getJsonPayload(response) as {
    found: boolean;
    requestedIconName: string;
    icon?: { iconName: string };
  };

  assert.ok(content);
  assert.equal(
    content.uri,
    `${ICONS_URI}/${encodeURIComponent(knownIconName)}`,
  );
  assert.equal(payload.found, true);
  assert.equal(payload.requestedIconName, knownIconName);
  assert.equal(payload.icon?.iconName, knownIconName);
});

test("get_hds_icon returns found=false for unknown icon", async () => {
  const dynamicResource = getDynamicResource();

  const response = (await dynamicResource.readCallback(
    new URL(ICONS_URI),
    {
      iconName: "__definitely-not-a-real-icon__",
    },
    requestContext,
  )) as JsonResponse;
  const payload = getJsonPayload(response) as {
    found: boolean;
    requestedIconName: string;
    message: string;
  };

  assert.equal(payload.found, false);
  assert.equal(payload.requestedIconName, "__definitely-not-a-real-icon__");
  assert.equal(payload.message, "Icon not found for provided iconName.");
});

test("get_hds_icon returns safe error payload for missing iconName", async () => {
  const dynamicResource = getDynamicResource();

  const response = (await dynamicResource.readCallback(
    new URL(ICONS_URI),
    {
      iconName: "",
    },
    requestContext,
  )) as JsonResponse;
  const payload = getJsonPayload(response) as {
    ok: boolean;
  };

  assert.equal(payload.ok, false);
});

test("dynamic icon completion returns case-insensitive suggestions", async () => {
  const dynamicResource = getDynamicResource();

  const iconNameComplete =
    dynamicResource.template.completeCallback("iconName");

  assert.ok(iconNameComplete);

  const emptySuggestions = await Promise.resolve(iconNameComplete("   "));
  const caseInsensitiveSuggestions = await Promise.resolve(
    iconNameComplete("AL"),
  );

  assert.ok(Array.isArray(emptySuggestions));
  assert.ok(emptySuggestions.length > 0);
  assert.ok(emptySuggestions.length <= 25);
  assert.ok(Array.isArray(caseInsensitiveSuggestions));
  assert.ok(caseInsensitiveSuggestions.length > 0);
  assert.ok(
    caseInsensitiveSuggestions.every((iconName) =>
      iconName.toLowerCase().includes("al"),
    ),
  );
});
