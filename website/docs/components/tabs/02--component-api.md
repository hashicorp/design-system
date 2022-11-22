---
title: Tabs
category: components
component: tabs
section: component-api
---

The `Tabs` component is composed of different parts, with their own APIs:

*   a `Tabs` main “container”
*   multiple `Tab` sub-components (individual Tabs)
*   multiple `Panel` sub-components (individual Panels corresponding to each Tab)

#### Tabs

Here is the API for the main (“container”) component:

<dl class="dummy-component-props" aria-labelledby="component-api-tabs"><dt>onClickTab <code>function</code></dt><dd>Pass an optional function which is called when a Tab is clicked.</dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p></dd></dl>

#### Tabs::Tab

Here is the API for the “Tab” component:

<dl class="dummy-component-props" aria-labelledby="component-api-tab"><dt>count <code>string</code></dt><dd><p>Displays an optional "count" indicator in the tab. Accepts the text value that should go in the <a href="/components/badge-count">BadgeCount</a>.</p></dd><dt>icon</dt><dd><p>Displays an optional icon in the tab. Accepts the name of the <a href="https://flight-hashicorp.vercel.app/">FlightIcon</a>.</p></dd><dt>isSelected <code>boolean</code></dt><dd><p>Sets a custom initial tab to display when the page is loaded.</p><p>Default: <span class="default">false</span> (The first tab is selected on page load by default.)</p></dd><dt>"yield"</dt><dd><p>Elements passed as children of this component are yielded inside a <code class="dummy-code">&lt;button&gt;</code> element.</p></dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p></dd></dl>

#### Tabs::Panel

Here is the API for the “Panel” component:

<dl class="dummy-component-props" aria-labelledby="component-api-panel"><dt>"yield"</dt><dd><p>Elements passed as children of this component are yielded inside a <code class="dummy-code">&lt;section&gt;</code> element.</p></dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p></dd></dl>