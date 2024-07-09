## Component API

The Breadcrumb component is composed of three different parts, each with their own APIs:

- a container, Breadcrumb container
- an item child component, Breadcrumb::Item
- a truncation child component, Breadcrumb::Truncation

### Breadcrumb container

<Doc::ComponentApi as |C|>
  <C.Property @name="itemsCanWrap" @type="boolean" @default="true">
    This controls if the Breadcrumb Items can wrap if they don’t fit within the container.
  </C.Property>
  <C.Property @name="ariaLabel" @type="string" @default="&quot;breadcrumbs&quot;">
    Accepts a localized string.
  </C.Property>
  <C.Property @name="didInsert" @type="function">
    This hook method is called when the component is inserted in the DOM. Internally we use the `did-insert` modifier from `@ember/render-modifiers`.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).<br/>
  </C.Property>
</Doc::ComponentApi>

### Breadcrumb::Item

<Doc::ComponentApi as |C|>
  <C.Property @name="text" @type="string">
    The text displayed within the item.
  </C.Property>
  <C.Property @name="icon" @type="string">
    Use to show an icon. Any [icon](/icons/library) name is acceptable.
  </C.Property>
  <C.Property @name="route/models/model/query/current-when/replace">
    Parameters that are passed down as arguments to the `<LinkTo>`/`<LinkToExternal>` components.
  </C.Property>
  <C.Property @name="isRouteExternal" @type="boolean" @default="false">
    Controls if the “LinkTo” is external to the Ember engine, in which case it will use a `<LinkToExternal>` for the `@route`.
  </C.Property>
  <C.Property @name="current" @type="boolean" @default="false">
    Determines if an item is the last item in the Breadcrumb, in which case it doesn’t generate a link.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Breadcrumb::Truncation

<Doc::ComponentApi as |C|>
  <C.Property @name="ariaLabel" @type="string" @default="show more">
    Set on the truncation toggle button. Accepts a localized string.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded to the content of the [MenuPrimitive](/utilities/menu-primitive) component (used to show/hide the yielded Breadcrumb Items via a "toggle" button).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### Width-based truncation

!!! Warning

The text will automatically truncate and be replaced with an ellipsis to fit within the container. Please be aware there are [serious accessibility concerns](/components/copy/snippet?tab=accessibility) with using this feature.
!!!

```handlebars
<Hds::Breadcrumb @itemsCanWrap={{false}}>
  <Hds::Breadcrumb::Item @text="Level one with a very long string" @icon="org" />
  <Hds::Breadcrumb::Item @text="Level two with a very long string" @icon="folder" />
  <Hds::Breadcrumb::Item @text="Level three with a very long string" />
  <Hds::Breadcrumb::Item @text="Level four with a very long string" />
  <Hds::Breadcrumb::Item @text="Level five with a very long string" />
  <Hds::Breadcrumb::Item @text="Current with a very long string" @current={{true}} />
</Hds::Breadcrumb>
```
