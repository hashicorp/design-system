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
    { handler: "silence", matchId: "ember-string.add-package" },
    { handler: "throw", matchId: "hds.dropdown.list-item.interactive" },
    { handler: "throw", matchId: "hds.components.flyout.body" },
    { handler: "throw", matchId: "hds.components.flyout.description" },
    { handler: "throw", matchId: "hds.components.flyout.footer" },
    { handler: "throw", matchId: "hds.components.flyout.header" },
    { handler: "throw", matchId: "hds.components.modal.body" },
    { handler: "throw", matchId: "hds.components.modal.footer" },
    { handler: "throw", matchId: "hds.components.modal.header" },
    { handler: "throw", matchId: "hds.components.sidenav.header.iconbutton" },
  ]
};
