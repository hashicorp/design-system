---
title: Dropdown
category: components
component: dropdown
section: component-api
---

The `Dropdown` component is composed of different child components, each with their own APIs:

*   the dropdown component (parent to the child components)
*   Toggle components to open/close the dropdown
    
    *   ToggleButton
    *   ToggleIcon
*   And finally, list item components, to build the dropdown's list items
    
    *   Description
    *   Generic
    *   Interactive
    *   Separator
    *   Title

_Notice: to make the invocation more intuitive for developers, all the sub-components are named yields, so the yielded name is a simplified version of the full component name (eg. `Hds::ListItem::Interactive` becomes just `Interactive`). See below how they are invoked as yielded components._

#### Dropdown

Here is the API for the main ("container") component:

<dl class="dummy-component-props" aria-labelledby="component-api-dropdown"><dt>listPosition <code>string</code></dt><dd><p>Acceptable values:</p><ol><li>left</li><li class="default">right</li></ol></dd><dt>width <code>string</code></dt><dd><p>Acceptable values: any valid CSS width (px, rem, etc)</p><p><em>Notice: by default the dropdown list has a <code class="dummy-code">min-width</code> of <code class="dummy-code">200px</code> and a <code class="dummy-code">max-width</code> of <code class="dummy-code">400px</code> applied to it, so it adapts to the content size. If a <code class="dummy-code">@width</code> parameter is provided then the list will have a fixed width.</em></p></dd><dt>close <code>function</code></dt><dd><p>Function that can be called to programmatically close the dropdown.</p><p><em>Notice: if this function is invoked using an <code class="dummy-code">{{on click}}</code> modifier applied to the <code class="dummy-code">ListItem::Interactive</code> element, there is a quirk behaviour of the Ember <code class="dummy-code">&lt;LinkTo&gt;</code> component that will require some workaround to have the events executed in the right order (this happens only if it has a <code class="dummy-code">@route</code> argument). <a href="https://github.com/jgwhite" target="_blank" rel="noopener noreferrer">Jamie White</a> has detailed the issue and a possible solution <a href="https://github.com/hashicorp/design-system/pull/399#issuecomment-1171186772" target="_blank" rel="noopener noreferrer">in this GitHub comment</a>.</em></p></dd><dt>onClose <code>function</code></dt><dd><p>Callback function invoked when the dropdown is closed (if provided).</p></dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p></dd></dl>

#### Toggle::Button

Here is the API for the "button-like" toggle component (yielded in a hash under the key `ToggleButton`):

<dl class="dummy-component-props" aria-labelledby="component-api-toggle-button"><dt>text <code>string</code> <strong class="required">required</strong></dt><dd><p>The text of the toggle button.</p><p><em>If no text value is defined an error will be thrown.</em></p></dd><dt>color <code>enum</code></dt><dd><p>Acceptable values:</p><ol><li class="default">primary</li><li>secondary</li></ol></dd><dt>size <code>enum</code></dt><dd><p>Acceptable values:</p><ol><li class="default">medium</li><li>small</li></ol></dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p></dd></dl>

#### Toggle::Icon

Here is the API for the icon-only toggle component (yielded as `ToggleIcon`):

<dl class="dummy-component-props" aria-labelledby="component-api-toggle-icon"><dt>text <code>string</code> <strong class="required">required</strong></dt><dd><p>The value of <em>aria-label</em> for the toggle icon.</p><p><em>If no text value is defined an error will be thrown.</em></p></dd><dt>icon <code>string</code></dt><dd><p>Acceptable value: any Flight icon name.</p></dd><dt>hasChevron <code>boolean</code></dt><dd><p>Default: <span class="default">true</span></p><p>Per design, <code class="dummy-code">false</code> is only acceptable when the "more-horizontal" icon is used; as such, it is set to <code class="dummy-code">true</code> by default.</p></dd><dt>imageSrc <code>string</code></dt><dd>The URL of an image to be used instead of an icon (e.g., as an avatar).</dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p></dd></dl>

#### ListItem::CopyItem

<dl class="dummy-component-props" aria-labelledby="api-listitem-copyitem"><dt>copyItemTitle <code>string</code></dt><dd>Optional. Provides a contextual title for the text to be copied.</dd><dt>text <code>string</code> <strong class="required">required</strong></dt><dd><p>The text to be copied.</p><p><em>If no text value is defined an error will be thrown.</em></p></dd></dl>

#### ListItem::Description

Here is the API for the "description" list item component (yielded in a hash under the key `Description`):

<dl class="dummy-component-props" aria-labelledby="component-api-listitem-description"><dt>text <code>string</code> <strong class="required">required</strong></dt><dd><p>The text to be used for the description.</p><p><em>If no text value is defined an error will be thrown.</em></p></dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p></dd></dl>

#### ListItem::Generic

Here is the API for the "generic" list item component (yielded in a hash under the key `Generic`):

<dl class="dummy-component-props" aria-labelledby="component-api-listitem-generic"><dt>"yield"</dt><dd><p>Elements passed as children of this sub-component are yielded inside the list item.</p><p>🚨 <em>Notice: when using the "generic" list item the developer is completely responsible for any element yielded, including the accessibility of that element, as well as the layout of the content (we provide only the horizontal padding for consistency with the other items).</em></p></dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p></dd></dl>

#### ListItem::Interactive

Here is the API for the "interactive" list item component (yielded in a hash under the key `Interactive`):

<dl class="dummy-component-props" aria-labelledby="component-api-listitem-interactive"><dt>text <code>string</code> <strong class="required">required</strong></dt><dd><p>The text to be used in the item.</p><p><em>If no text value is defined an error will be thrown.</em></p></dd><dt>color <code>enum</code></dt><dd><p>Acceptabe values:</p><ol><li class="default">action</li><li>critical</li></ol></dd><dt>icon <code>string</code></dt><dd><p>Acceptable value: any Flight icon name.</p></dd><dt>isLoading <code>boolean</code></dt><dd><p>This controls if the item is in "loading" state.</p><p>Default: <span class="default">false</span></p><p><em>Notice: when in this state, the item is not actually interactive, but you can pass the other expected arguments for the item (they're simply ignored).</em></p></dd><dt>href</dt><dd><p>This is the URL parameter that is passed down to the <code>&lt;a&gt;</code> element.</p></dd><dt>isHrefExternal <code>boolean</code></dt><dd><p>Default: <span class="default">true</span></p><p>This controls if the <code>&lt;a&gt;</code> link is external and so for security reasons we need to add the <code>target="_blank"</code> and <code>rel="noopener noreferrer"</code> attributes to it.</p></dd><dt>route/models/model/query/current-when/replace</dt><dd><p>These are the parameters that are passed down as arguments to the <code>&lt;LinkTo/LinkToExternal&gt;</code> component.</p></dd><dt>isRouteExternal <code>boolean</code></dt><dd><p>Default: <span class="default">false</span></p><p>This controls if the "LinkTo" is external to the Ember engine (<a href="https://ember-engines.com/docs/link-to-external" target="_blank" rel="noopener noreferrer">more details here</a>) in which case it will use a <code>&lt;LinkToExternal&gt;</code> instead of a simple <code>&lt;LinkTo&gt;</code> for the @route.</p></dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p><p>🚨 <em><strong>Important</strong>: in this specific component, the <code class="dummy-code">...attributes</code> are not spread on the root element of the component (an <code class="dummy-code">&lt;li&gt;</code> element) but on the underlying element/component (<code class="dummy-code">&lt;button&gt;</code>, <code class="dummy-code">&lt;a&gt;</code>, <code class="dummy-code">&lt;LinkTo&gt;</code> or <code class="dummy-code">&lt;LinkToExternal&gt;</code> depending on the <code class="dummy-code">@route/@href</code> arguments).</em></p></dd></dl>

#### ListItem::Separator

Here is the API for the "separator" list item component (yielded in a hash under the key `Separator`):

<dl class="dummy-component-props" aria-labelledby="component-api-listitem-separator"><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p></dd></dl>

#### ListItem::Title

Here is the API for the "description" list item component (yielded in a hash under the key `Title`):

<dl class="dummy-component-props" aria-labelledby="component-api-listitem-title"><dt>text <code>string</code> <strong class="required">required</strong></dt><dd><p>The text to be used for the title.</p><p><em>If no text value is defined an error will be thrown.</em></p></dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p></dd></dl>