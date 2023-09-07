# Hashicorp.com

## Usage

### Packages

### Pagage components
Design System components in Ember.js

[https://isabelschoepd.hashicorp.design/components](https://isabelschoepd.hashicorp.design/components)
more info: see (packages/components/README.md) (packages/components/CONTRIBUTING.md).

### packages/ember-flight-icons

hashicorp/ember-flight-icons`
- website: [https://isabelschoepd.hashicorp.design/icons/library](https://isabelschoepd.hashicorp.design/icons/library)
- more info: see [ember-flight-
### Changesets

This project uses [changesets](https://github.com/changesets/changesets) to manage how changes will be released. Each user-facing change to a package should come with a changeset for each package that has changed.

To create a changeset, run and follow the prompts in your terminal:

```bash
yarn changeset
```

See the [changeset docs](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md) for more information.

Note: If you want to ignore a changeset bump in terminal (e.g. major bump for selected "package x" is N/A, want a patch release), press return on the command line to skip that step. Press the spacebar to select that step.

### Releasing

Release PRs are created and automatically updated on every PR merge by the [changeset GitHub action](https://github.com/changesets/action). Once we are ready to do a release, the PR – titled `Version Packages` – can be approved and merged to `main`, and the changes will be released to npm automatically.

#### Local testing of versioning

You can simulate the versioning experience locally with this command:

```bash
yarn changeset version
```

In order for this step to complete successfully you'll need to create a personal access token [in GitHub](https://github.com/settings/tokens). The name could be anything e.g. `design-system`, with `read:user` and `repo:status` scopes, and then add the token to a `.env` file in the project's root.

```bash
GITHUB_TOKEN=YOUR-TOKEN-HERE
```

## License

This project is licensed under the [Mozilla Public License 2.0](LICENSE).

## Versioning

We use [SemVer](http://semver.org/) for versioning.
