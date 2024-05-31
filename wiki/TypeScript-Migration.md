# TypeScript migration

The following steps are recommended for migrating components to TypeScript.

1. [Pick a component](https://hashicorp.atlassian.net/browse/HDS-2392), assign yourself to the task in Jira, and add it to the current sprint

    - [This spreadsheet](https://docs.google.com/spreadsheets/d/1sWzLSP8TUb3WYibYNZ5w6UfEb338DQbZkVaTjK8b1tw/edit#gid=0) contains (more or less) all the dependencies between components, so it’s easier to understand what is ready to be converted (e.g. has dependencies that are already converted to TypeSscript) and what is not.

2. Rename the backing class from `.js` to `.ts`; commit after this step to make it easier to review the changes

3. Opening the files (`.ts` and `.hbs`) in VS Code should show you the linting errors (if you have the [Glint extension](https://marketplace.visualstudio.com/items?itemName=typed-ember.glint-vscode)); similarly, if you are running `yarn lint` in `packages/components`

4. Define component signature

    - You can either do it manually [following the documentation](https://typed-ember.gitbook.io/glint/environments/ember/component-signatures#glimmer-components)
    - Or, you can generate it using `npx ember-codemod-args-to-signature --src /path/to/component`. This codemod renames the component class name to `IndexComponent` by default, so make sure to revert it (e.g. `HdsBadgeComponent`)
    - For [template-only components](https://typed-ember.gitbook.io/glint/environments/ember/template-only-components) use the following pattern:

      ```js
      import TemplateOnlyComponent from '@ember/component/template-only';
      interface HdsBadgeSignature {
        // signature
      }
      const HdsBadgeComponent = TemplateOnlyComponent<HdsBadgeSignature>();
      export default HdsBadgeComponent;

5. Add types and use them in the signature

    - The signature should follow the naming convention (e.g. `HdsBadgeSignature`) and should be placed right before the backing class declaration, so it’s consistent across components

    - Compare the signature generated, with the expected arguments using the website documentation (Component API section); start defining the [basic types](https://www.typescriptlang.org/docs/handbook/basic-types.html) (e.g. `boolean`, `number`, `string`) and mark them as optional, when not required, using the `argument?: type` syntax.

    - Try to keep the order of the arguments consistent between the `Args` in the signature and the "Component API" documentation, so it’s easier to reference and compare one to another; there are no specific rules about the order, so look at other similar components as reference (for example, `Button`, `Badge/BadgeCount`, `IconTile`, `LinkInline/Standalone`, `Tag` they all share some common props, like `type`, `size`, `color`, `text`, `textSomething`, `icon`, `iconSomething` so try to keep this order; for component that get their arguments from the `Interactive` component, keep all the `Interactive`-related arguments in the same block and order; etc.)

    - For more involved types, such as `enum`s, conditional, and mapped types, create a `types.ts` file colocated with the component (a single file in the “root” of the component, containing types for components and sub-components).
      - By separating types into their own files, we can keep your codebase more organized and easier to navigate. It also makes it easier to find and update type definitions. Keeping types separate from component logic helps maintain a clear separation of concerns making the component code easier to understand and maintain.
      - These types need to be exported, as they will be “consumed” in the backing class for the component/sub-components

    - Import declarations from `types.ts` into the backing class file as needed. When importing types and other values make sure values are listed first (in alphabetical order), followed by the types (also in alphabetical order).

      ```js
      import { HdsTextSizeValues, HdsTextWeightValues } from './types.ts'
      import type { HdsTextAligns, HdsTextColors, HdsTextWeights } from './types.ts';
      ```

    - Enable glint checking by removing the top comment in the template file and run `yarn lint` to check for any type-related errors
    - If there are errors, fix them by adjusting the signature and/or updating logic
    - If the component contains named blocks, or contextual components make sure to define them under the `Blocks` section

      ```js
        // toggle and content as named blocks
        Blocks: {
          toggle: [];
          content: [];
        };
      ```

      ```js
        // toggle and content as contextual components
        Blocks: {
          default: [
            {
              // Toggle subcomponent
              Toggle: ComponentLike<ToggleSignature>;
              // Content subcomponent, with `size` already bound
              Content: WithBoundArgs<typeof ContentSignature, 'size'>;
            }
          ]
        };
      ```

    - Try to be as specific as possible with the `Element` type used by the component; if splattributes (`...attributes`) are used within the component template, the element with splattributes is considered the main element

6. Update the template registry

    - Remove the code generated by the codemod at the end of the backing class and add the component/sub-component to `template-registry.ts` using other components as reference

7. Add a re-export entry

    - Add a new entry for each main component, helper, or modifier that is part of the public API to `packages/components/src/components.ts`, `packages/components/src/helpers.ts`, or `packages/components/src/modifiers.ts`, respectively.

8. Add changelog entry

    - Mark the change as minor (we’re introducing a new feature, the types associated with a component)
    - Use the following template: `ComponentName` - Converted component to TypeScript
    - Raise a PR, assign it the `typescript` label, and request a review from [hashicorp/hds-engineering](https://github.com/orgs/hashicorp/teams/hds-engineering)

9. Remember to update the status of your Jira task
