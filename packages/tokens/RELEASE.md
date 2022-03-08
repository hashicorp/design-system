# How To Release

Whenever there is an update to the design tokens in Figma (e.g. a new color is added), these changes need to be transfered also to the code. This means updating the "source" token files, and re-generate "output" CSS/Sass/JS/JSON files and once these changes have been approved, release them as package to the npm registry.

Please see the instructions in the [CONTRIBUTING](CONTRIBUTING.md) file for more details about how to setup the project and make changes to the code for these packages.

## Bump

The "bump" step increases the _SemVer_ version number in the `package.json` file.

* Make sure your local `main` branch is up to date.
* Create new custom branch from `main`.
* `cd /design-system-tokens`
* Run `yarn bump` and choose the _SemVer_ version as agreed upon on the previous PR.
  * _The `bump` command is interactive, you can move up and down with the keyboard, choose one option, and then hit "enter": the tool will automatically update the version in the `package.json` file for you._
* Check the `git diff` for the project, you should see only the `package.json` file changed (with the new version).
* Commit, push, open a pull request, and wait for approval.

Once the PR has been approved and merged, you can finally move to the next step, the actual release.

## Release

The "release" step publishes the package on the npm registry, using the version declared in the `package.json` file, and [tags](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-tag) that specific release on git.

_**IMPORTANT**: Once released a package on the public registry, you can't revert the changes: the only solution is to deprecate the package (this will hide it from the public, but remains there). If you need to do some tests, use a **local** package registry (see below), don't test directly in production!_

* Make sure your local `main` branch is up to date.
* You will need a company-approved 2FA-enabled account on npm to publish (see [npm 2FA docs](https://docs.npmjs.com/configuring-two-factor-authentication) for more info).
* `cd /design-system-tokens`
* `yarn release`
* Check the git diff, you should not see any change.

**Notice**: this action will automatically:

* publish the new version of the package on the [NPM registry](https://www.npmjs.com/) using the current _SemVer_ version declared in the `package.json` file (the one previously chosen in the `bump` step).
* tag the current last commit in the `main` branch and push the tag to the git origin

At this point check on npm that the package ([@hashicorp/design-system-tokens](https://www.npmjs.com/package/@hashicorp/design-system-tokens) has been successfully published, and if it's so... well done! You just published your new package 🎉.

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
