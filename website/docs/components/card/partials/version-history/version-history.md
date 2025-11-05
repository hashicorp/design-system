## 5.0.0

Removed the component invocation paths `Hds::Card` and `hds/card`. Consumers must update their templates to use `<Hds::Card::Container>` or `{{hds/card/container}}`


## 4.23.0

Updated all exported types to use template literals instead of enum values.


## 4.18.1

Add `tag` argument to choose between using a `div` tag (the default) or an `li` tag

## 4.10.0

Fixed the `HdsCard` type reexport to reflect correct component name `HdsCardContainer`. If you are importing `HdsCard` types, update it to `HdsCardContainer`.
