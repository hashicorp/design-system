# How to release

Whenever there is an update to the components, and these changes have been approved, we need to release them as package to the npm registry.

### Prerequisites

1. Follow the instructions in the [CONTRIBUTING](CONTRIBUTING.md) file for more details about how to setup the project and make changes to the code for these packages.
2. Set up Vercel CLI
    a. [Install Vercel CLI](https://vercel.com/docs/cli#installing-vercel-cli)
    b. Type `vercel login` in your terminal and select 'Continue with SAML Single Sign-On'
    c. Enter your team slug: `hashicorp` and press enter; you should be redirected to vercel.com with a 'CLI Login Success' message

## The release process

A release PR, titled 'Version Packages', is created and/or automatically updated on every PR merge by the [changeset GitHub action](https://github.com/changesets/action). This PR's feature branch is `changeset-release/main`.

### Generate a Vercel deployment

In preparation for a minor or major release, login to Vercel CLI and create a canonical URL for the upcoming version:

1. In GitHub, go to the “Version Packages” PR, which comes from the `changeset-release/main branch`
2. Copy the URL of the latest Vercel deployment. (e.g. `hds-website-jeq5lwde8-hashicorp.vercel.app`)
3. Determine the canonical URL for the version you're preparing to release (for version 4.3.0 it will be `hds-website-4-3-0.vercel.app`)
4. In terminal, create an alias between the latest Vercel deployment and the new canonical URL
    a. Run `vercel alias hds-website-<deployment-id>-hashicorp.vercel.app hds-website-<version-number>.vercel.app`
    b. E.g `vercel alias hds-website-jeq5lwde8-hashicorp.vercel.app hds-website-4-3-0.vercel.app`

### Update documentation

1. Switch your local branch to `changeset-release/main`
2. Open `packages/components/CHANGELOG.md`
3. Add a link to the upcoming release, after the heading with the version number, following previous examples
    a. E.g `[4.3.0 documentation](https://hds-website-4-3-0.vercel.app/)`
4. Push a commit with these changes

### Publish the release to npm

1. On the "Version Packages" PR, request a review from hds/engineering
2. When approved, merge into `main`
3. The new package should be published to npm automatically upon merge
4. Verify that the package has been published successfully on [npm](https://www.npmjs.com/package/@hashicorp/design-system-components)

After the new version is published, don't forget to communicate the release and a summary of changes to the product teams in the #team-design-systems and #tech-frontend channels.

### If you did not `alias` first

If you didn't alias the website URL before merging the Version Packages PR, here's what you do.

1. Follow steps 1-5 in the release process.
2. From your terminal, type `vercel redeploy hds-website-<deployment-id>-hashicorp.vercel.app`. This will re-deploy that preview, but with a new deployment id assigned.
3. Once that finishes, get the _new_ deployment id and run the `vercel alias` command as described in step 6.

Screenshot:

![Terminal view of steps described previously in this document](https://github.com/hashicorp/design-system/assets/4587451/d69abce7-2741-4e1a-834d-f5367436c6da)


## Local testing of versioning

You can simulate the versioning experience locally with this command:

```bash
yarn changeset version
```

For this step to complete successfully you'll need to keep in mind the following:

First, create a personal access token [in GitHub](https://github.com/settings/tokens). The name could be anything e.g. `design-system`, with `read:user` and `repo:status` scopes, and then add the token to a `.env` file in the project's root.

```bash
GITHUB_TOKEN=YOUR-TOKEN-HERE
```
Second, because this command relies on reading information about the change from GitHub, it only works if the changeset files already exist in PRs there. The best option for this is to target an existing PR branch (with a changeset) and run the command against that branch locally.

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
