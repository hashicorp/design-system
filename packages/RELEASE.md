# How To Release

In this repository there are different artefacts that can be released:

* the `flight-icons` npm package - [npmjs.com/package/@hashicorp/flight-icons](https://www.npmjs.com/package/@hashicorp/flight-icons)
* the `ember-flight-icons` npm package - [npmjs.com/package/@hashicorp/ember-flight-icons](https://www.npmjs.com/package/@hashicorp/ember-flight-icons)
* the Flight Icons micro-website - [flight-hashicorp.vercel.app/](https://flight-hashicorp.vercel.app/)

Follow the instruction below to see how to release each one of them.

_Remember: Once released a package on the public registry, you can't revert the changes: the only solution is to deprecate the package (this will hide it from the public, but remains there)._

## Release `flight-icons` or `ember-flight-icons`

Whenever there is an update to the Flight Icons library in Figma (e.g. a new icon is added), these changes need to be transfered also to the code. This means re-syncing and re-building the `flight-icons` package and once these changes have been approved, release the package to the npm registry.

Please see the instructions in the [flight-icons/CONTRIBUTING](flight-icons/CONTRIBUTING.md) or [ember-flight-icons/CONTRIBUTING](ember-flight-icons/CONTRIBUTING.md) files for more details about how to setup the project and make changes to the code for these packages.

## Bump

The "bump" step increases the _SemVer_ version number in the `package.json` file.

* Make sure your local `main` branch is up to date.
* Create new custom branch from `main`.
* `cd /flight/flight-icons` or `cd /flight/ember-flight-icons`
* Run `yarn bump` and choose the _SemVer_ version as agreed upon on the previous PR.
  * _The `bump` command is interactive, you can move up and down with the keyboard, choose one option, and then hit "enter": the tool will automatically update the version in the `package.json` file for you._
* Check the `git diff` for the project, you should see only the `package.json` file changed (with the new version).
* Commit, push, open a pull request, and wait for approval.

Once the PR has been approved and merged, you can finally move to the next step, the actual release.

## Release

The "release" step publishes the package on the npm registry, using the version declared in the `package.json` file, and [tags](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-tag) that specific release on git.

_**IMPORTANT**: if you need to do some tests, use a **local** package registry (see below), don't test directly in production!_

* Make sure your local `main` branch is up to date.
* You will need a company-approved 2FA-enabled account on npm to publish (see [npm 2FA docs](https://docs.npmjs.com/configuring-two-factor-authentication) for more info).
* `cd /flight/flight-icons` or `cd /flight/ember-flight-icons`
* `yarn release`
* Check the git diff, you should not see any change.

**Notice**: this action will automatically:

* publish the new version of the package on the [NPM registry](https://www.npmjs.com/) using the current _SemVer_ version declared in the `package.json` file (the one previously chosen in the `bump` step).
* tag the current last commit in the `main` branch and push the tag to the git origin

At this point check on npm that the package ([@hashicorp/flight-icons](https://www.npmjs.com/package/@hashicorp/flight-icons) or [hashicorp/ember-flight-icons](https://www.npmjs.com/package/@hashicorp/ember-flight-icons)) has been successfully published, and if it's so... well done! You just published your new package 🎉.

🚨 **DON'T FORGET**:

* if you're releasing **a new version of `@hashicorp/flight-icons`**:
  * you may need to update also the dependency version in the `package.json` of `ember-flight-icons` (and then release a new version of it)
  * you need to communicate to the product teams that are consuming `flight-icons` in their codebase to bump the version of the package
* if you're releasing **a new version of `@hashicorp/ember-flight-icons`**:
  * you need to communicate to the product teams that are consuming `ember-flight-icons` in their codebase to bump the version of the package

### How to do some manual QA of the new package version

You may want to test the change in the real-world, with a consuming app, to test for any gotchas that could come up in production.

#### Testing @hashicorp/flight-icons

* Bump the `@hashicorp/flight-icons` version in [hashicorp/boundary-ui/blob/main/addons/rose/package.json](https://github.com/hashicorp/boundary-ui/blob/main/addons/rose/package.json)
* At root, run `yarn`
* `cd ui/desktop && yarn start`
* Confirm you see icons in local dev.

#### Testing @hashicorp/ember-flight-icons

* Bump the `@hashicorp/ember-flight-icons` version in [this WIP PR in `cloud-ui`](https://github.com/hashicorp/cloud-ui/pull/1322)
* Run the PR locally
* Confirm you see icons, such as the external link icon, on the homepage once you're logged in.

## Release the Flight Icons micro-website

The [Flight Icons micro-website](https://flight-hashicorp.vercel.app/) gets automatically redeployed every time PRs are merged in the `main` branch once approved.

## Using a local NPM registry for testing

To test the release of packages without actually polluting the real/production npm registry, you can setup a local private registry using [Verdaccio](https://verdaccio.org/docs/what-is-verdaccio), an open source solution, very easy to setup and use.

You can follow [the instructions here](https://verdaccio.org/docs/installation) but essentially what you have to:

* install the package: `npm install -g verdaccio` - this will install it globally
* launch the service: `verdaccio` - this will serve a web frontend to the registry at the URL [http://localhost:4873/](http://localhost:4873/)
* add a user to the registry: `npm adduser --registry http://localhost:4873` - this will ask you a username/password/email, I suggest to use test/test/test@test.com because is just a local instance; this will also authenticate you with the registry so you don't need to login when you publish.

Now you need to add this entry in the `package.json` file of the bundle you want to publish on your local registry:

```json
"publishConfig": {
    "registry": "http://localhost:4873"
},
```

This will make sure the package is published on Verdaccio. Once the package is published, the web page accessible at [http://localhost:4873/](http://localhost:4873/) will show you all the details about the packages (if needed you can also download the tarballs, to check their content).

Once you've done testing, you can remove verdaccio via `npm uninstall -g verdaccio` and then remove the files he created using `rm -fr ~/.local/share/verdaccio && rm -fr .config/verdaccio`. You can use the same command to cleanup the entire data storage of Verdaccio and start from scratch (no need to reinstall for this, just cleanup the data).
