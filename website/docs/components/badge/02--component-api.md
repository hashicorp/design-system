---
title: Badge
category: components
component: badge
section: component-api
---

Here is the API for the component:

<dl class="dummy-component-props" aria-labelledby="component-api-badge"><dt>size <code>enum</code></dt><dd><p>Acceptable values:</p><ol><li>small</li><li class="default">medium</li><li>large</li></ol></dd><dt>type <code>enum</code></dt><dd><p>Acceptable values:</p><ol><li class="default">filled</li><li>inverted</li><li>outlined</li></ol></dd><dt>color <code>enum</code></dt><dd><p>Acceptable values:</p><ol><li class="default">neutral</li><li>neutral-dark-mode</li><li>highlight</li><li>critical</li><li>success</li><li>warning</li></ol></dd><dt>text <code>string</code></dt><dd><p>The text of the badge or value of the <em>screen-reader only</em> element if <em>isIconOnly</em> is set to <em>true</em>.</p><p><em>If no text value is defined an error will be thrown.</em></p></dd><dt>icon <code>string</code></dt><dd><p>Use this parameter to show an icon. Acceptable value: any Flight icon name.</p></dd><dt>isIconOnly <code>boolean</code></dt><dd><p>This indicates if the button will only contain an icon.</p><p><em>Notice: an internal check is in place to ensure that accessible text is still applied to the component.</em></p></dd><dt>...attributes</dt><dd><p><code class="dummy-code">...attributes</code> spreading is supported on this component.</p></dd></dl>