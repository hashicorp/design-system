/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/* eslint-disable */

self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "throw", matchId: "ember-modifier.use-destroyables" },
    { handler: "throw", matchId: "ember-modifier.use-modify" },
    { handler: "throw", matchId: "ember-modifier.no-args-property" },
    { handler: "throw", matchId: "ember-modifier.no-element-property" }
  ]
};
