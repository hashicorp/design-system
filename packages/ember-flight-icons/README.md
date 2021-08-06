ember-flight-icons
==============================================================================

An Ember addon for the Flight Icons. Currently in development.

Goals:

* accessible
* easy to use
* easy to maintain
* sensible defaults

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v10 or above

Installation
------------------------------------------------------------------------------

This package has not yet been published. Once it has, you can install it like any other Ember addon:

```bash
ember install @hashicorp/ember-flight-icons
```

Usage
------------------------------------------------------------------------------
The `name` must be specified.

```hbs
<FlightIcon @name="activity" />
```

Icons are 24x24 by default. To use the 16x16 size instead, set `size` to `small`:

```hbs
<FlightIcon @name="zap" @size="small" />
```

Icons are set to `display: inline-block` by default. To remove this, set `isInlineBlock` to `false`:

```hbs
<FlightIcon @name="archive" @isInlineBlock={{false}} />
```

Icons are set to `fill="currentColor"` by default. To change this, set the desired color:

```hbs
<FlightIcon @name="activity" @fillColor="red" />
```

Accessibility
------------------------------------------------------------------------------

Accessibility support for SVGs is inconsistent across browsers and assistive technology. Currently, best practice is to set the `aria-hidden` attribute to `false` on the SVG itself.
This means that the `<FlightIcon>` component will need to be used _in context_.
The icons themselves are for presentation purposes only and should never be used on their own.

Example:

```hbs
<button aria-label="Check Activity">
  <FlightIcon @name="activity" />
</button>
```

```hbs
<h2><FlightIcon @name="activity" />Activity Report</h2>
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [Mozilla Public License 2.0](LICENSE.md).
