---
applyTo: "website/docs/components/**/code/component-api.md"
description: "Guidelines for documenting a component's API"
---

# Component API documentation

The `code/component-api.md` file documents the public API for a component. It lists all available arguments, attributes, named blocks, and contextual components for a component.

## Important rules

- Any argument, attribute, named block, or contextual component available for a component needs to be included in the component API
- If the component supports the usage of `...attributes`, that needs to be included

## `Doc::ComponentApi`

The `Doc::ComponentApi` component from `website/app/components/doc/component-api` is a custom component used to render the component API in docs.

The `Doc::ComponentApi::Property` sub-component is used for a property within the component API.

`Doc::ComponentApi::Property` API
- `@name` - Name of the property (eg. “color”)
- `@type` - “Type” of the property (eg. `string`, `number`, `boolean`, `enum`, etc.)
- `@required` - If the property is required
- `@deprecated` - If the property is deprecated
- `@values` - List of possible values for a property, as an array of strings
- `@valueNote` - Alternative note, for when it's not possible to use the `@values` argument
- `@default` - Default value of the property
- `yield` - Description of the property (in markdown format)
  - ⚠️ Note: don't leave empty lines or the markdown will not be interpreted correctly
- `[P].Banner` - `Doc::Banner` yielded as named component

## Example template

```md
### ComponentName

<Doc::ComponentApi as |C|>
  <C.Property @name="<[A].ContextualComponentName>" @type="yielded component">
    `ComponentName::ContextualComponentName` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<:namedBlock>" @type="named block">
    Named block description
    <Doc::ComponentApi as |C|>
      <C.Property @name="[A].namedBlockProperty" @type="string">
        Named block property description
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
  <C.Property @name="enumArgument" @type="enum" @values={{array "small" "medium" "large" }} @default="medium" />
  <C.Property @name="booleanArgument" @default="false" @type="boolean">
    Property description
  </C.Property>
  <C.Property @name="onEvent" @type="function">
    Callback description
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

#### [A].ContextualComponentName

The `ComponentName::ContextualComponentName` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="enumArgument" @type="enum" @values={{array "small" "medium" "large" }} @default="medium" />
  <C.Property @name="booleanArgument" @default="false" @type="boolean">
    Additional property information
  </C.Property>
  <C.Property @name="onEvent" @type="function">
    Callback description
  </C.Property>
</Doc::ComponentApi>
```
