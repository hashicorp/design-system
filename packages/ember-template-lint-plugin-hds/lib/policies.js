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
