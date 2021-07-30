ember-flight-icons
==============================================================================

An Ember addon for the Flight Icons. Currently in development.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v10 or above

Installation
------------------------------------------------------------------------------

```bash
ember install ember-flight-icons
```

Usage
------------------------------------------------------------------------------
`iconName` must be specified. `iconSize` is optional. Icons are set to `small` (16x16) by default.

```hbs
<FlightIcon @iconName="activity" @iconSize="large" />
```

```hbs
<FlightIcon @iconName="zap" @iconSize="small" />
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
