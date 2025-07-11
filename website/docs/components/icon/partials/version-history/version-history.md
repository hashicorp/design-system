## 4.15.0

Aligned private class properties to follow a standardized notation

## 4.9.0

!!! Info

In the process of converting the `FlightIcon` component to the `Hds::Icon` component, we have taken the decision to change the default default layout from `display: inline-block` to `display: block`, and to rename the argument that control this option from `@isInlineBlock` to `@isInline`.

This RFC document highlights the reasons for this choice: [DS-083: Migrate FlightIcon Component into HDS](https://docs.google.com/document/d/1mh4AdnyLhN1JB6qzIYkr1hUK-hMVoiKakPoQ0U34Zs0/edit).

!!!

Added the `Hds::Icon` component. It replaces the `FlightIcon` component.

### How to migrate

We now recommend migrating the existing `FlightIcon` instances to the `Hds::Icon` component.

You can automate this migration using the codemod `v4/icon` (see [readme file](https://github.com/hashicorp/design-system/tree/main/packages/codemods/transforms/v4/icon)). This codemod provides also a special flag to preserve the old `display` layout for the icon (but we suggest to avoid using it, it's likely not needed at all).

If you have already started to use the `FlightIconSignature` in TypeScript, you will have to replace the signature with the equivalent `HdsIconSignature` (note: the `isInlineBlock` argument has now become `isInline`)

Aside from the codemod, which serves to update the component invocations, you will need to ensure that any style and/or testing code that uses CSS selectors from FlightIcon (`.flight-icon`) is migrated to the new component classes (`.hds-icon`). We suggest using a simple “find-and-replace” as a suitable strategy for updating these selectors.
