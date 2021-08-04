ember-flight-icons
==============================================================================

An Ember addon for the Flight Icons. Currently in development.

Goals:

* accessible
* positive developer experience (easy to use the first time, and easy to remember what you did when you come back in six months and re-visit the code)
* sensible defaults (evaluated current icon use and set defaults based on what the data told us)

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

For accessibility best practice, `aria-hidden` is set to `false` on the component.
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

This project is licensed under the [MIT License](LICENSE.md).
