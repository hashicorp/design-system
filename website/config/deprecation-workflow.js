/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/* eslint-disable */

self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "remove-owner-inject" },
    { handler: "silence", matchId: "ember-modifier.function-based-options" },
    { handler: "throw", matchId: "deprecate-auto-location" },
    { handler: "silence", matchId: "ember-string.add-package" }
  ]
};
