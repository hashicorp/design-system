## How to use this component

The basic invocation requires `@value` to be passed.

<!-- Getting error: 
  loader.js:247 Uncaught (in promise) Error: Could not find module `prismjs` imported from `@hashicorp/design-system-components/components/hds/code-block/index`

```handlebars
<Hds::CodeBlock
  @value="let codeLang=`JavaScript`;
  console.log(`I am ${codeLang} code`);"
/>
```
-->