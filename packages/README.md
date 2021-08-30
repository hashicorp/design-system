# Flight

[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)

## Consumer instructions

### How to consume the Ember addon

[![npm version](https://badge.fury.io/js/%40hashicorp%2Fember-flight-icons.svg)](https://badge.fury.io/js/%40hashicorp%2Fember-flight-icons)

🚨 Note: npm addon is currently in beta and not intended for production use yet.

Please see [ember-flight-icons/README](ember-flight-icons/README.md).

### How to consume just the SVGs addon

[![npm version](https://badge.fury.io/js/%40hashicorp%2Fflight-icons.svg)](https://badge.fury.io/js/%40hashicorp%2Fflight-icons)

🚨 Note: npm addon is currently in beta and not intended for production use yet.

This addon can be used in React or Ember apps.

## Development instructions for `@hashicorp/ember-flight-icons` and `@hashicorp/flight-icons`

### `export-go` instructions

1. For export-go, the Figma export tool, see [export-go/README](export-go/README.md).

1. On every new Figma export, we need to manually copy the icons to the `flight-icons/icons` directory right now.

```bash
rm flight-icons/*
```

```bash
cp export-go/dist/* flight-icons/
```

### sprite instructions

1. To generate the sprite file, [sprite.svg](ember-flight-icons/public/icons/sprite.svg), follow the instructions in the README of [edenspiekermann/sprite.sh](https://github.com/edenspiekermann/sprite.sh) e.g.

```bash
cd flight-icons
```

```bash
npx spritesh
```

The `spitesh` command will great a `sprite.svg`. Copy this file to ember-flight-icons/

```bash
cd .. && cp flight-icons/sprite.svg ember-flight-icons/public/ && cp flight-icons/_catalog.json ember-flight-icons/public/
```


## How to make the `@hashicorp/ember-flight-icons` npm package

```bash
cd ember-flight-icons
```

After merge to main, from `ember-flight-icons/` directory, run:

```bash
npm publish
```

You will need 2FA on your npm account to publish.

## How to make the `@hashicorp/flight-icons` npm package

- Temporarily move files to `ember-flight-icons/public/icons` directory.

 ```bash
mv flight-icons/package.json ember-flight-icons/public/icons 
```

- Move to that directory.

```bash
cd ember-flight-icons/public/icons
```

- Bump the version number for the `package.json` with name `@hashicorp/flight-icons`.

- You will need 2FA on your npm account to publish. From the `ember-flight-icons/public/icons` directory, run:

```bash
npm publish
```

- After publish, move the files to the `flight-icons/` directory and make a PR for GitHub version control.

🚧 Note: This is a temporary workaround.

From the `ember-flight-icons/public/icons` directory

```bash
mv package.json ../../../flight-icons
```

- Then, make a PR to `main` to commit two files in `flight-icons/`, the `package.json` and the `.tgz`.
