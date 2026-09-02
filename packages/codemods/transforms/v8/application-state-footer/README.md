# v8/application-state-footer

## Usage

To run this codemod in your project using `npx`, you would run the following:

```bash
npx @hashicorp/design-system-codemods v8/application-state-footer path/to/some/glob/**/*.hbs
```

## Local usage

To run this codemod in this repository (even before publishing it), you would run the following from the root directory of this repository:

```bash
node ./packages/codemods/bin/cli.js v8/application-state-footer path/to/some/glob/**/*.hbs
```

## Input

```hbs
<Hds::ApplicationState as |A|>
    <A.Footer @hasDivider={{true}} as |F|>
        <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
        <F.LinkStandalone @icon="help" @text="Need Help" @href="/components/alert" @iconPosition="trailing" />
    </A.Footer>
</Hds::ApplicationState>
```

## Output

```hbs
<Hds::ApplicationState as |A|>
    <A.Footer as |F|>
        <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
        <F.LinkStandalone @icon="help" @text="Need Help" @href="/components/alert" @iconPosition="trailing" />
    </A.Footer>
</Hds::ApplicationState>
```