const Plugin = require('broccoli-plugin');
const {
  readFileSync,
  writeFileSync,
} = require('fs');
const walkSync = require('walk-sync');
const { join } = require('path');
const _ = require('lodash');

function preparePages(blobs, pageSize, pageSortFunction) {
  return _.chain(blobs)
    .tap((items) => {
      if (pageSortFunction) {
        return items.sort(pageSortFunction);
      }
      return items;
    })
    .chunk(pageSize)
    .value();
}

class SerializeJsonBlobs extends Plugin {
  constructor(inputNode, options = {}) {
    super([inputNode], options);
    this.options = _.assign({}, {
      collationFileName: 'all.json',
      pageSize: 10,
    }, options);
  }

  build() {
    // don't do any work if collation is turned off
    if (!this.options.collate) {
      return;
    }

    let blobs = [];
    this.inputPaths.forEach((inputPath) => {
      const paths = walkSync(inputPath);
      const folderConents = [];

      paths.forEach((path) => {
        if (path.endsWith('/')) {
          return;
        }
        const fileContent = readFileSync(join(inputPath, path)).toString();
        const deserializedFile = JSON.parse(fileContent);
        folderConents.push(deserializedFile);
      });

      blobs = [...blobs, ...folderConents];
    });

    function groupData(pageData) {
      return pageData.reduce((prev, current) => {
        prev.data.push(current.data);
        return prev;
      }, { data: [] });
    }

    if (this.options.collate) {
      if (this.options.paginate) {
        const contentPages = preparePages(
          blobs,
          this.options.pageSize,
          this.options.paginateSortFunction,
        );
        contentPages.forEach((pageData, index) => {
          const serializedPageData = groupData(pageData);
          let fileName;

          const fileNameMatch = this.options.collationFileName.match(/(.*)\.json$/);

          if (fileNameMatch) {
            fileName = `${fileNameMatch[1]}-${index}.json`;

            serializedPageData.links = {
              first: `/${this.options.contentFolder}/${fileNameMatch[1]}-0.json`,
              last: `/${this.options.contentFolder}/${fileNameMatch[1]}-${contentPages.length - 1}.json`,
              prev: index === 0 ? null : `/${this.options.contentFolder}/${fileNameMatch[1]}-${index - 1}.json`,
              next: index === contentPages.length - 1 ? null : `/${this.options.contentFolder}/${fileNameMatch[1]}-${index + 1}.json`,
            };
          } else {
            fileName = `${this.options.collationFileName}-${index}`;

            serializedPageData.links = {
              first: `/${this.options.contentFolder}/${fileNameMatch[1]}-0`,
              last: `/${this.options.contentFolder}/${fileNameMatch[1]}-${contentPages.length - 1}`,
              prev: index === 0 ? null : `/${this.options.contentFolder}/${fileNameMatch[1]}-${index - 1}`,
              next: index === contentPages.length - 1 ? null : `/${this.options.contentFolder}/${fileNameMatch[1]}-${index + 1}`,
            };
          }
          writeFileSync(
            join(this.outputPath, fileName),
            JSON.stringify(serializedPageData),
          );

          // also write the default collection name for the first page
          if (index === 0) {
            writeFileSync(
              join(this.outputPath, this.options.collationFileName),
              JSON.stringify(serializedPageData),
            );
          }
        });
      } else {
        const collection = blobs.reduce((prev, blob) => {
          prev.data.push(blob.data);
          return prev;
        }, { data: [] });

        const outputFile = join(this.outputPath, this.options.collationFileName);
        writeFileSync(outputFile, JSON.stringify(collection));
      }
    }
  }
}

module.exports = SerializeJsonBlobs;
