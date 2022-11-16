---
category: utilities
component: interactive
section: component-api
---

# Interactive - Component API

Here is the API for the component:

<dl class="dummy-component-props" aria-labelledby="component-api-interactive"><dt>href</dt><dd><p>This is the URL parameter that is passed down to the <code>&lt;a&gt;</code> element.</p></dd><dt>isHrefExternal <code>boolean</code></dt><dd><p>Default: <span class="default">true</span></p><p>This controls if the <code>&lt;a&gt;</code> link is external and so for security reasons we need to add the <code>target="_blank"</code> and <code>rel="noopener noreferrer"</code> attributes to it.</p></dd><dt>route/models/model/query/current-when/replace</dt><dd><p>These are the parameters that are passed down as arguments to the <code>&lt;LinkTo&gt;</code> / <code>&lt;LinkToExternal&gt;</code> components.</p></dd><dt>isRouteExternal <code>boolean</code></dt><dd><p>Default: <span class="default">false</span></p><p>This controls if the "LinkTo" is external to the Ember engine (<a href="https://ember-engines.com/docs/link-to-external" target="_blank" rel="noopener noreferrer">more details here</a>) in which case it will use a <code>&lt;LinkToExternal&gt;</code> instead of a simple <code>&lt;LinkTo&gt;</code> for the @route.</p></dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p></dd></dl>