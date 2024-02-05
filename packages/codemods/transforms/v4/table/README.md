# v4/table

## Usage

To run this codemod in your project using `npx`, you would run the following:

```bash
npx @hashicorp/design-system-codemods v4/table path/to/some/glob/**/*.hbs
```

## Local usage

To run this codemod in this repository (even before publishing it), you would run the following from the root directory of this repository:

```bash
node ./packages/codemods/bin/cli.js v4/table path/to/some/glob/**/*.hbs
```

## Input

```hbs
<Hds::Table::ThSort @onClick={{...}}>

<Hds::Table>
  <:head as |H|>
    <H.Tr>
      <H.ThSort @onClick={{...}}>
```

## Output

```hbs
<Hds::Table::ThSort @onClickSort={{...}} />

<Hds::Table>
  <:head as |H|>
    <H.Tr>
      <H.ThSort @onClickSort={{...}}>
```
