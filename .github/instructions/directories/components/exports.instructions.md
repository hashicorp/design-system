---
applyTo: "packages/components/src/**"
description: "Instructions for how components should be exported and registered in the components library"
---

## Relevant files
- `packages/components/src/components.ts` - Main entry point for the components library, exporting all components and types.
- `packages/components/src/template-registry.ts` - Template registry file, registering all components for use in Ember applications.

## Requirements
- Export all component classes and types defined under `packages/components/src/components/hds/**` in the `packages/components/src/components.ts` file.
  - Example: The `HdsButton` component should be exported as follows:
    ```ts
    export { default as HdsButton } from './components/hds/button/index.gts';
    export * from './components/hds/button/types.ts';
    ```
- Import all components defined under `packages/components/src/components/hds/**` in the `packages/components/src/template-registry.ts` file, and add their registration to the `HdsComponentsRegistry` interface.
  - Example: The `HdsButton` component should be registered as follows:
    ```ts
    import type HdsButtonComponent from './components/hds/button';

    export default interface HdsComponentsRegistry {
      // Button
      'Hds::Button': typeof HdsButtonComponent;
      'hds/button': typeof HdsButtonComponent;
    }
    ```
