---
category: components
component: stepper
section: component-api
---

# Stepper Indicator Component - Component API

**Note:** Since the `indicator` components are meant to be assembled into larger stepper item patterns, the component's interactive states should be tied to the larger pattern. This includes `hover`, `active`, and `focus`.

#### Stepper::Step::Indicator

Here is the API for the `Step::Indicator` component:

<dl class="dummy-component-props" aria-labelledby="component-api-stepper-indicator"><dt>status <code>enum</code></dt><dd><p>Acceptable values:</p><ol><li class="default">incomplete</li><li>progress</li><li>processing</li><li>complete</li></ol></dd><dt>isInteractive <code>boolean</code></dt><dd><p>Default: <span class="default">true</span></p><p>By default the <code class="dummy-code">Indicator::Step</code> is not interactive and has no hover state. Usage for this variant is generally recommended for onboarding-type sequences or list-item steps.</p></dd><dt>text <code>string</code></dt><dd><p>Generally corresponds with the numerical value of the index of the item in an array of multiple steps.</p></dd></dl>

#### Stepper::Task::Indicator

Here is the API for the `Task::Indicator` component:

<dl class="dummy-component-props" aria-labelledby="component-api-stepper-indicator"><dt>status <code>enum</code></dt><dd><p>Acceptable values:</p><ol><li class="default">incomplete</li><li>progress</li><li>processing</li><li>complete</li></ol></dd><dt>isInteractive <code>boolean</code></dt><dd><p>Default: <span class="default">true</span></p></dd></dl>