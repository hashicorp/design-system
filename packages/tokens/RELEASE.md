# How to release

Whenever there is an update to the design tokens in Figma (e.g. a new color is added), these changes need to be transfered also to the code. This means updating the "source" token files, and re-generate "output" CSS/Sass/JS/JSON files and once these changes have been approved, release them as package to the npm registry.

Please see the instructions in the [CONTRIBUTING](CONTRIBUTING.md) file for more details about how to setup the project and make changes to the code for these packages.

## Bump and release

Follow the instructions for Changesets in the root [README](../../README.md).

🚨 **DON'T FORGET**:

You need to communicate to the product teams that are consuming the design tokens!

## Using a local NPM registry for testing

To test the release of packages without actually polluting the real/production npm registry, you can setup a local private registry using [Verdaccio](https://verdaccio.org/docs/what-is-verdaccio), an open source solution, very easy to setup and use.

You can follow [the instructions here](https://verdaccio.org/docs/installation), but essentially here is what you have to:

* install the package: `npm install -g verdaccio` - this will install it globally
* launch the service: `verdaccio` - this will serve a web frontend to the registry at the URL [http://localhost:4873/](http://localhost:4873/)
* add a user to the registry: `npm adduser --registry http://localhost:4873` - this will ask you for a username/password/email, I suggest you use test/test/test@test.com because is only a local instance. This will also authenticate you with the registry so you don't need to login when you publish.

Now you need to add this entry in the `package.json` file of the bundle you want to publish on your local registry:

```json
"publishConfig": {
    "registry": "http://localhost:4873"
},
```

This will make sure the package is published on Verdaccio. Once the package is published, the web page will be available at at [http://localhost:4873/](http://localhost:4873/). It will show you all the packages' details, and if needed you can download the tarballs to check their content.

Once you've completed testing the package locally:

1. remove verdaccio via `npm uninstall -g verdaccio`  
2. remove the files it created with `rm -fr ~/.local/share/verdaccio && rm -fr .config/verdaccio`

This same command can be used to cleanup the entire data storage of Verdaccio and start from scratch (no need to reinstall, only cleanup the data).
