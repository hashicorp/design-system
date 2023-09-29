# v3/side-nav

## Usage

To run this codemod in your project using `npx`, you would run the following:

```bash
npx @hashicorp/design-system-codemods v3/side-nav path/to/some/glob/**/*.hbs
```

## Local usage

To run this codemod in this repository (even before publishing it), you would run the following from the root directory of this repository:

```bash
node ./packages/codemods/bin/cli.js v3/dropdown path/to/some/glob/**/*.hbs
```

## Input

```hbs
<Hds::SideNav::List as |XXX|>
  <XXX.extraBefore>...</XXX.extraBefore>
  <XXX.Item>...</XXX.Item>
  <XXX.extraAfter>...</XXX.extraAfter>
</Hds::SideNav::List>

<Hds::SideNav::Portal as |YYY|>
  <YYY.extraBefore>...</YYY.extraBefore>
  <YYY.Item>...</YYY.Item>
  <YYY.extraAfter>...</YYY.extraAfter>
</Hds::SideNav::Portal>
```

## Output

```hbs
<Hds::SideNav::List as |XXX|>
  <XXX.ExtraBefore>...</XXX.ExtraBefore>
  <XXX.Item>...</XXX.Item>
  <XXX.ExtraAfter>...</XXX.ExtraAfter>
</Hds::SideNav::List>

<Hds::SideNav::Portal as |YYY|>
  <YYY.ExtraBefore>...</YYY.ExtraBefore>
  <YYY.Item>...</YYY.Item>
  <YYY.ExtraAfter>...</YYY.ExtraAfter>
</Hds::SideNav::Portal>
```
