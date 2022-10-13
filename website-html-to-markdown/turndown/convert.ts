import { glob} from 'glob';
import fs from 'fs-extra';
import path from 'path';
// import del from 'del';
import chalk from 'chalk';

import TurndownService from 'turndown';

const sourceFolder = path.resolve(__dirname, '../../packages/components/tests/dummy/app/templates/');
const tempFolder = path.resolve(__dirname, './temp');

(async () => {
    try {
        console.log(`\n==========\n${chalk.cyan('Turndown conversion started...')}\n==========\n`);

        await convert();

        console.log(`\n==========\n${chalk.green('Turndown conversion completed.')}\n==========\n`);

    } catch (err) {
        console.error(err);
        process.exit(1);

    }
})();

async function convert() {

    // prepare the temporary folder
    try {
        console.log('Preparing the "temp" folder');
        if (fs.existsSync(tempFolder)) {
            fs.emptyDirSync(tempFolder);
        } else {
            fs.mkdirsSync(tempFolder);
        }
    } catch (err) {
        console.error(err);
    }

    // process the HBS files
    glob(sourceFolder + "/**/*.hbs", {}, async function (_error, files) {
        // console.log(files);
        for(const filePath of files) {

            // get the relative path of the file, in relation to the "source" folder
            const fileRelativePath = path.relative(sourceFolder, filePath);
            console.log(`Processing HBS file ${fileRelativePath}`);

            // we need to skip some files...
            if (['index.hbs', 'application.hbs', 'components.hbs', 'content.hbs', 'foundations.hbs', 'overrides.hbs', 'utilities.hbs'].includes(fileRelativePath)) {
                continue;
            }

            // we read the handlebars source (made of HTML + Handlebars code) to process it
            const hbsSource = await fs.readFile(filePath, 'utf8');

            // convert the file using Turndown
            const turndownService = new TurndownService()
            const markdownContent = turndownService.turndown(hbsSource)

            // we use 'outputFile' instead of 'writeFile' to automatically create the sub-folders
            await fs.outputFile(`${tempFolder}/${fileRelativePath.replace('.hbs','.md')}`, markdownContent);
        }
    });
}
