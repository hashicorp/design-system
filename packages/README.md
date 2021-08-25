# Flight

[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)

## Development instructions

1. For export-go, the Figma export tool, see [export-go/README](export-go/README.md).

1. On every new Figma export, we need to manually copy the icons to the `ember-flight-icons/public/icons/` directory right now.

```bash
rm ember-flight-icons/public/icons/*
```

```bash
cp export-go/dist/* ember-flight-icons/public/icons/
```

1. To generate the sprite file, [sprite.svg](ember-flight-icons/public/icons/sprite.svg), follow the instructions in the README of [edenspiekermann/sprite.sh](https://github.com/edenspiekermann/sprite.sh) e.g.

```bash
cd ember-flight-icons/public/icons
```

```bash
npx spritesh
```

## How to make the `@hashicorp/flight-icons` npm package

```bash
mv package.json ember-flight-icons/public/icons 
```

```bash
cd ember-flight-icons/public/icons && npm pack
```

Will generate a tarball e.g. `hashicorp-flight-icons-0.0.4-beta.tgz`. Be sure to use your filename in the command below.

```bash
mv package.json hashicorp-flight-icons-0.0.4-beta.tgz ../../../flight-icons
```

After merge to main, run:

```bash
npm publish
```

***

## How to consume the Ember addon

Please see [ember-flight-icons/README](ember-flight-icons/README.md).

## How to consume just the SVGs in your Ember or React app

[![npm version](https://badge.fury.io/js/%40hashicorp%2Fflight-icons.svg)](https://badge.fury.io/js/%40hashicorp%2Fflight-icons)

🚨 Note: npm addon is currently in beta and not intended for production use yet.
