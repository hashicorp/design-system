# How to test a component in Cloud UI

To test a component that is under development (or because it’s new or has been modified) you have a few options:

- you can install the `@hashicorp/design-system-components` package using a branch available on GitHub
- ~you can use your local environment as source for the `@hashicorp/design-system-components` package~

This is the case when the component has not yet been released as an npm package, of course.

## Using a remote branch (via GitHub)

> [!IMPORTANT]
> While this approach is more suitable for one-off testing before releasing a package, less so for ongoing development, this remains the only option available for pre-testing our code in Cloud UI until we find a way to have the local environment approach work again.

### 1 - Override the package resolution in the `package.json` file in the root

You can override every dependency declared in the engines' `package.json` files with a single entry in the `package.json` file in the root of the project folder, by adding this line to the `"resolutions"` block:

```json
"@hashicorp/design-system-components": "https://github.com/hashicorp/design-system#head=BRANCH-NAME&workspace=@hashicorp/design-system-components"
```

### 2 - Temporary commit the compiled folders

Because the npm package is released with the `dist` folder, but the monorepo ignores this folder via `.gitignore`, in your testing branch you will **temporarily** have to:
- comment the entries `/dist/` and `/declarations/` in the `.gitignore` files under the `components` and `ember-flight-icons` packages folders
- run the `yarn build` command under the `components` and `ember-flight-icons` folders (both are required)
- commit and push the `dist` folders to the branch you're using for testing (notice: it needs to be associated with a PR or GitHub will not generate a URL)

### 3 - Install the branch version of the design system packages

At this point run `yarn install` to use the "remote" version of the package, update the `node_modules` and the `yarn.lock` file.

### 4 - Testing

You can now test your code in Cloud UI, starting the HCP application in your local environment as usual.

**IMPORTANT**: the way in which yarn works in this case is that it resolves in a hash referencing a commit in `yarn.lock`; so if you make changes to the branch, they’re not reflected in the local `node_modules` unless you change the hash manually in the `yarn.lock` to point to another commit, and re-run the `yarn install` command.

### 5 - Cleanup

Once done with the testing, remember to remove the `/dist/` and `/declarations/` folders by deleting the commit, so the git history remains clean.

---

#### What to do if `yarn start ***` in Cloud UI complains about the different version number

There are cases in which the "start" command in Cloud UI will fail with an error similar to this:
```
Missing yarn packages: 
Package: @hashicorp/design-system-components
  * Specified: ^2.7.1
  * Installed: 2.6.0

Run `yarn` to install missing dependencies.
```

Running `yarn install` again will not solve the problem because the issue is with the version of the `@hashicorp/design-system-components` package declared in the `package.json` files in Cloud UI that differs from the one in the overriding package.

In this case you have two options:

- you can rebase your branch on `main` so that your branch uses the latest version of `@hashicorp/design-system-components` (which is likely the one used in Cloud UI too)
- if the one in Cloud UI is not the latest, you have to "trick" Cloud UI and replace the existing version with the one used in your branch (use a find & replace in all the `package.json` files)

With both options, you will have to re-run the `yarn install` command.

## Using your local environment (via symlink)

> [!CAUTION]
> Unfortunately this approach doesn't seem to work anymore. You can try if you want, and if you manage to get it working again please update this document accordingly (and share with the rest of the team).

This approach is the preferable one, if there is an ongoing development of the component and you want to see the changes reflected immediately in the application (automatically rebuilt/refreshed whenever you save the HDS files).

### Prepare the Cloud UI project

For simplicity, you will need three CLI/terminal windows/tabs opened.

In in the first terminal window go the folder containing your local version of the https://github.com/hashicorp/cloud-ui/ codebase:

- go to the root of the project
  - eg. `cd ~/path-to/your-local/hashicorp/cloud-ui`
- run `rm -fr node_modules/` to start from a blank slate
- run `yarn` to make sure all the packages are installed

### Replace the installed `@hashicorp/design-system-components` package in Cloud UI with the local one

In the second terminal window:

- run `cd ~/path-to/your-local/hashicorp/cloud-ui/node_modules/@hashicorp` to go in the folder containing the `@hashicorp` packages
- run `ls -la` to check that the folder `design-system-components` is present
- run `rm -fr design-system-components` to remove (recursively) the folder with the published version of the `@hashicorp/design-system-components` package

Now you have to create a symlink between the folder containing your local code for the `design-system-components` and the folder you have just removed:

In the third terminal window:

- go in the folder containing the https://github.com/hashicorp/design-system codebase
  - eg. `cd ~/path-to/your-local/hashicorp/design-system/packages/components/`
- run `pwd` and copy the full path to this folder
  - eg. `/Users/mynamesurname/src/hashicorp/design-system/packages/components`

Go back to the second terminal window:

- run `pwd` and make sure you're still in the `node_modules/@hashicorp` folder of the Cloud UI repo
- run `ln -s [full-path-to-your-local-components-folder] design-system-components` to create a symbolic link [**IMPORTANT**: you need to set `design-system-components` and not just `components` as target folder name, because that's the name expected by `yarn` (same as the folder you deleted one moment ago)]
  - eg. `ln -s /Users/mynamesurname/src/hashicorp/design-system/packages/components design-system-components`

**IMPORTANT**: if you have a new version of the design tokens package that needs to be included as well for your component to work, you will need to do the same process to symlink the local folder of the **compiled** design tokens with the one expected in the Cloud UI `node_modules` folder

- eg. `rm -fr design-system-tokens` + `ln -s /Users/mynamesurname/src/hashicorp/design-system/packages/tokens design-system-tokens`

In the first terminal window (you should be be in the Cloud UI root):
- run `yarn start` to launch the compilation of the Cloud UI project and start the local webserver
- visit the URL that appears in the command line at the end of the build (typically http://localhost:4200/ but you can specify a different port using the command `yarn start --port NNNN`)

Everything should work and you should be able to do whatever you need to do in the Cloud UI codebase using your local HDS components (eg testing a new component, or checking the impact of a change in an existing one).

**Don't forget**: once you've finished, it is better to reset the state of the Cloud UI project, to make sure that if you're doing some other tests not involving HDS components, you're using the actual code that a user will see in production:

- go to the `node_modules/@hashicorp` folder of the Cloud UI repo
- run `rm design-system-components` (no need for the `-fr` option, it's a symlink file not a folder)
- go to the root of the Cloud UI project
- run `yarn` to reinstall all the missing packages (including `@hashicorp/design-system-components` from NPM)
