/* eslint-disable */

self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember-modifier.use-destroyables" },
    { handler: "silence", matchId: "ember-modifier.use-modify" },
    { handler: "silence", matchId: "ember-modifier.no-args-property" },
    { handler: "silence", matchId: "ember-modifier.no-element-property" }
  ]
};
