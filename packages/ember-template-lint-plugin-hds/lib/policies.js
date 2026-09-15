export default [
  {
    component: "Hds::Button",
    when: {
      argument: "color",
      equals: "tertiary",
    },
    requires: ["icon"],
    message: '<Hds::Button> with @color="tertiary" requires @icon.',
    source: "packages/components/src/components/hds/button/index.gts",
  },
];

export const attributeAliases = [
  {
    components: ["Hds::Link::Inline", "Hds::Link::Standalone"],
    from: "isExternal",
    destinations: [
      {
        to: "@isHrefExternal",
        when: { present: ["href"], absent: ["route"] },
      },
      {
        to: "@isRouteExternal",
        when: { present: ["route"], absent: ["href"] },
      },
    ],
    diagnostic:
      "Use @isHrefExternal for an @href link or @isRouteExternal for an @route link.",
    source: "packages/components/src/components/hds/link",
  },
  {
    components: ["Hds::Button"],
    from: "disabled",
    destinations: [
      {
        to: "disabled",
        when: { absent: ["href", "route"] },
      },
    ],
    diagnostic:
      "Replace @disabled with bare disabled when the Button does not use @href or @route.",
    source: "packages/components/src/components/hds/button/index.gts",
  },
  {
    components: ["Hds::Button"],
    from: "isDisabled",
    destinations: [
      {
        to: "disabled",
        when: { absent: ["href", "route"] },
      },
    ],
    diagnostic:
      "Replace @isDisabled with bare disabled when the Button does not use @href or @route.",
    source: "packages/components/src/components/hds/button/index.gts",
  },
  {
    components: ["Hds::Button", "Hds::Form::TextInput::Field"],
    from: "ariaExpanded",
    destinations: [{ to: "aria-expanded" }],
    diagnostic: "Replace @ariaExpanded with bare aria-expanded.",
    source:
      "packages/components/src/components/hds/button/index.gts; packages/components/src/components/hds/form/text-input/field.gts",
  },
  {
    components: ["Hds::Form::TextInput::Field"],
    from: "disabled",
    destinations: [{ to: "disabled" }],
    diagnostic: "Replace @disabled with bare disabled.",
    source: "packages/components/src/components/hds/form/text-input/field.gts",
  },
  {
    components: ["Hds::Form::TextInput::Field", "Hds::Form::Textarea::Field"],
    from: "name",
    destinations: [{ to: "name" }],
    diagnostic: "Replace @name with bare name.",
    source:
      "packages/components/src/components/hds/form/text-input/field.gts; packages/components/src/components/hds/form/textarea/field.gts",
  },
  {
    components: ["Hds::Form::TextInput::Field", "Hds::Form::Textarea::Field"],
    from: "placeholder",
    destinations: [{ to: "placeholder" }],
    diagnostic: "Replace @placeholder with bare placeholder.",
    source:
      "packages/components/src/components/hds/form/text-input/field.gts; packages/components/src/components/hds/form/textarea/field.gts",
  },
  {
    components: ["Hds::Form::TextInput::Field"],
    from: "ariaLabelledBy",
    destinations: [{ to: "aria-labelledby" }],
    diagnostic: "Replace @ariaLabelledBy with bare aria-labelledby.",
    source: "packages/components/src/components/hds/form/text-input/field.gts",
  },
  {
    components: ["Hds::Form::Textarea::Field"],
    from: "disabled",
    destinations: [{ to: "disabled" }],
    diagnostic: "Replace @disabled with bare disabled.",
    source: "packages/components/src/components/hds/form/textarea/field.gts",
  },
  {
    components: ["Hds::Form::Checkbox::Field"],
    from: "checked",
    destinations: [{ to: "checked" }],
    diagnostic: "Replace @checked with bare checked.",
    source: "packages/components/src/components/hds/form/checkbox/field.gts",
  },
];

export const diagnosticOnlyArgumentPolicies = [
  {
    arguments: ["alignItems", "width", "columns", "isLoading"],
  },
  {
    components: ["Hds::CodeBlock"],
    arguments: ["plaintext"],
  },
  {
    components: ["Hds::Form::RadioCard"],
    arguments: ["fixed"],
  },
  {
    componentPrefixes: [
      "Hds::Pagination::",
      "Hds::Table",
      "Hds::Form::SuperSelect::",
    ],
  },
  {
    components: ["Hds::TooltipButton"],
  },
];
