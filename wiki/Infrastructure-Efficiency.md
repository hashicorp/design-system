# Infrastructure Efficiency

- [Infrastructure Efficiency](#infrastructure-efficiency)
  - [GitHub Actions](#github-actions)
  - [Vercel](#vercel)
    - [Website](#website)
    - [Showcase](#showcase)

---

To conserve resources and improve efficiency, we have steps in place to limit when tests are run and preview apps are deployed based on the following matrix:

| Project Changed | Showcase Preview | Website Preview | Components CI | Ember Flight Icons CI | Website CI |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | 
| Components  | ✅  | ❌  | ✅  | ❌  | ❌  |
| Website  | ❌  | ✅  | ❌  | ❌  | ✅  |
| Ember Flight Icons  | ✅  |  ❌  | ❌  | ✅  | ❌  |
| Flight Icons  | ✅  | ✅  | ✅  | ❌  | ✅  | 

## GitHub Actions

We leverage conditional jobs across our CI suite to limit CI runs. Where needed, we pass in a list of strings of directories we want to trigger CI for if they change, and pass them into [a bash script](https://github.com/hashicorp/design-system/blob/main/.github/scripts/filter_changed_files.sh). If the bash script detects changes in the referenced directories, the rest of the CI process will proceed; otherwise, the job will be marked as “Skipped”.

## Vercel

Vercel has [built-in functionality](https://vercel.com/guides/how-do-i-use-the-ignored-build-step-field-on-vercel#with-folders-and-workspaces) to ignore builds based on criteria we specify. This is managed per app in the Vercel Dashboard under `<App Name> -> Settings -> Git -> Ignored Build Step` which looks like this:

![image](https://github.com/hashicorp/design-system/assets/1672302/a1c12d18-fc7e-4d62-8e20-60d2e8810a41)


### Website

Keeping in mind that the command is run from the Root Directory specified in Settings -> General, which in this case is `website`, we use the following command to limit builds:

`git diff HEAD^ HEAD --quiet  . ../packages/flight-icons/catalog.json`

### Showcase

Keeping in mind that the command is run from the Root Directory specified in Settings -> General, which in this case is `packages/components`, we use the following command to limit builds:

`git diff HEAD^ HEAD --quiet  . ../../packages/flight-icons/catalog.json ../../packages/ember-flight-icons/`
