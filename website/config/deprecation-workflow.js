/* eslint-disable */

self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "remove-owner-inject" },
    { handler: "silence", matchId: "ember-modifier.function-based-options" }
  ]
};
