# How to test a component in Cloud UI

To test a new component (or a component that has been modified) using your local environment as source for the `@hashicorp/design-system-components` package, you have to follow a few steps.

## Prepare the Cloud UI project

For simplicity, you will need three CLI/terminal windows/tabs opened.

In in the first terminal window go the folder containing your local version of the https://github.com/hashicorp/cloud-ui/ codebase:

- go to the root of the project
  - eg. `cd ~/path-to/your-local/hashicorp/cloud-ui`
- run `rm -fr node_modules/` to start from a blank slate
- run `yarn` to make sure all the packages are installed

## Replace the installed `@hashicorp/design-system-components` package in Cloud UI with the local one

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
