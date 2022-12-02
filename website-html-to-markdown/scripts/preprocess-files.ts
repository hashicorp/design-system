import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const sourceFolder = path.resolve(__dirname, '../temp/split-files');

(async () => {
  try {
    console.log(
      `\n==========\n${chalk.cyan(
        'Preprocessing source files...'
      )}\n`
    );

    await preprocess();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

async function preprocess() {
  // process the HBS files
  glob(sourceFolder + '/**/*.hbs', {}, async function (_error, files) {
    // loop on every HBS file found in the source folder
    for (const filePath of files) {
      // get the relative path of the file, in relation to the "source" folder
      const fileRelativePath = path.relative(sourceFolder, filePath);

      // DEBUG - let's use a single file for testing
      // if (fileRelativePath !== 'components/alert/partials/code/showcase.hbs') {
      //   continue;
      // }

      // DEBUG
      // console.log(`Preprocessing HBS file ${fileRelativePath}`);

      // we read the handlebars source (made of HTML + Handlebars code) to process it
      let hbsSource = await fs.readFile(filePath, 'utf8');

      // FILE SPECIFIC CHANGES
      // ----------------------------

      if (fileRelativePath === 'foundations/tokens/partials/other/generic-2.hbs') {
        hbsSource = hbsSource.replace(/DummyToken/g, 'Doc::TokenCard');
      }
      if (fileRelativePath === 'foundations/colors/partials/other/generic-2.hbs') {
        hbsSource = hbsSource.replace(/DummyColorCard/g, 'Doc::ColorCard');
      }
      if (fileRelativePath === 'components/alert/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace(/@route="\.\.\."/g, '@route="components"');
      }
      if (fileRelativePath === 'components/breadcrumb/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace(/@route="\.\.\."/g, '@route="components"');
        // TODO add more fixes for other routes (`list`, `detail`, etc)
      }
      if (fileRelativePath === 'components/dropdown/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace(/@route="\.\.\."/g, '@route="components"');
      }
      if (fileRelativePath === 'components/form/base-elements/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace(/@route="components.link.inline"/g, '@route="show" @model="components/link/inline"');
      }
      if (fileRelativePath === 'components/form/checkbox/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace(/myAction/g, 'this.yourOnChangeFunction');
      }
      if (fileRelativePath === 'components/form/radio/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace(/myAction/g, 'this.yourOnChangeFunction');
      }
      if (fileRelativePath === 'components/form/radio-card/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace(/myAction/g, 'this.yourOnChangeFunction');
      }
      if (fileRelativePath === 'components/form/select/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace(/myAction/g, 'this.yourOnBlurFunction');
      }
      if (fileRelativePath === 'components/form/text-input/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace(/myAction/g, 'this.yourOnBlurFunction');
      }
      if (fileRelativePath === 'components/form/textarea/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace(/myAction/g, 'this.yourOnBlurFunction');
      }
      if (fileRelativePath === 'components/form/toggle/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace(/myAction/g, 'this.yourOnChangeFunction');
      }
      //
      // TODO - fix `Dropdown` errors
      //
      if (fileRelativePath === 'components/link/inline/partials/code/showcase.hbs') {
        hbsSource = hbsSource.replace(/@route="index"/g, '@route="components"');
      }
      if (fileRelativePath === 'components/link/standalone/partials/code/showcase.hbs') {
        hbsSource = hbsSource.replace(/@route="(index|components.link)"/g, '@route="components"');
      }
      if (fileRelativePath === 'components/link/inline/partials/code/showcase.hbs') {
        hbsSource = hbsSource.replace(/@route="index"/g, '@route="components"');
      }
      if (fileRelativePath === 'components/tag/partials/code/how-to-use.hbs' || fileRelativePath === 'components/tag/partials/code/showcase.hbs') {
        hbsSource = hbsSource.replace(/ your function here /g, 'this.yourOnDismissFunction');
        hbsSource = hbsSource.replace(/@route="components.tag"/g, '@route="show" @model="components/tag"');
      }
      if (fileRelativePath === 'components/power-select/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace(/@route="components.tag"/g, '@route="components"');
      }
      if (fileRelativePath === 'components/toast/partials/code/how-to-use.hbs') {
        hbsSource = hbsSource.replace(/Hds::Toast @onDismiss=\{\{ your function here \}\} as \|T\|/g, 'Hds::Toast @onDismiss={{this.yourOnDismissFunction}} as |T|');
        hbsSource = hbsSource.replace(/@onDismiss=\{\{\.\.\.\}\}/g, '@onDismiss={{this.yourOnDismissFunction}}');
        hbsSource = hbsSource.replace(/@onClick=\{\{ your function here \}\}/g, '@onClick={{this.yourOnClickFunction}}');
        hbsSource = hbsSource.replace(/@route="\.\.\."/g, '@route="components"');
      }

      await fs.writeFile(filePath, hbsSource);
    }
  });
}
