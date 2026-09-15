export const deprecatedApiPolicyManifest = {
  version: 1,
  policies: [
    ...[
      ["Hds::Modal::Header", "HdsModalHeader", "Hds::DialogPrimitive::Header"],
      ["Hds::Modal::Body", "HdsModalBody", "Hds::DialogPrimitive::Body"],
      ["Hds::Modal::Footer", "HdsModalFooter", "Hds::DialogPrimitive::Footer"],
      [
        "Hds::Flyout::Header",
        "HdsFlyoutHeader",
        "Hds::DialogPrimitive::Header",
      ],
      [
        "Hds::Flyout::Description",
        "HdsFlyoutDescription",
        "Hds::DialogPrimitive::Description",
      ],
      ["Hds::Flyout::Body", "HdsFlyoutBody", "Hds::DialogPrimitive::Body"],
      [
        "Hds::Flyout::Footer",
        "HdsFlyoutFooter",
        "Hds::DialogPrimitive::Footer",
      ],
    ].map(([component, exportName, replacement]) => {
      const area = component.includes("::Modal::") ? "modal" : "flyout";
      const member = component.split("::").at(-1).toLowerCase();
      return {
        id: `${area}-${member}-direct-component`,
        kind: "component",
        removedIn: "5.0.0",
        component,
        imports: {
          namedExports: [exportName],
          defaultModules: [
            `@hashicorp/design-system-components/components/hds/${area}/${member}`,
          ],
        },
        guidance: `Replace <${component}> with <${replacement}>.`,
        source: {
          versionHistory: `website/docs/components/${area}/partials/version-history/version-history.md`,
          implementation: `packages/components/src/components/hds/dialog-primitive/${member}.gts`,
        },
        docs: `https://helios.hashicorp.design/components/${area}?tab=version-history`,
        safeFix: {
          kind: "rename-direct-component",
          replacement,
        },
      };
    }),
    {
      id: "advanced-table-th-is-visually-hidden",
      kind: "argument",
      removedIn: "5.0.0",
      component: "Hds::AdvancedTable::Th",
      argument: "isVisuallyHidden",
      imports: {
        namedExports: ["HdsAdvancedTableTh"],
        defaultModules: [
          "@hashicorp/design-system-components/components/hds/advanced-table/th",
        ],
      },
      contextualParent: {
        component: "Hds::AdvancedTable",
        member: "Th",
        namedExports: ["HdsAdvancedTable"],
      },
      guidance:
        "Set isVisuallyHidden on the corresponding item in the Advanced Table @columns configuration instead.",
      source: {
        versionHistory:
          "website/docs/components/table/advanced-table/partials/version-history/version-history.md",
        implementation:
          "packages/components/src/components/hds/advanced-table/th.gts",
      },
      docs: "https://helios.hashicorp.design/components/table/advanced-table?tab=version-history",
      safeFix: {
        kind: "diagnostic-only",
        reason:
          "The rule cannot identify and edit the corresponding item inside an arbitrary @columns expression without changing behavior.",
      },
    },
  ],
};
