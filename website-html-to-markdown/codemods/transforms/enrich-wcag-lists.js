// ## refactor-codeblocks
//
// This codemod converts this code:
// ```
// <ul class='dummy-list'>
//   <li>
//     <a
//       href='https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships'
//       rel='noopener noreferrer'
//       target='_blank'
//     >1.3.1 Info and Relationships (A):</a>
//     Information, structure, and relationships conveyed through presentation ...
// ```
// in this
// ```
// <div>
//   <DummyWcagSuccessCriteriaList data-list="..." data-json="..." />
//   <ul class='dummy-list'>
//     <li>
//       <a
//         href='https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships'
//         rel='noopener noreferrer'
//         target='_blank'
//       >1.3.1 Info and Relationships (A):</a>
//       Information, structure, and relationships conveyed through presentation ...
// ```
//
// ## Usage
// - in the `website-html-to-markdown` folder run the command:
//   `node codemods/bin/cli.js reorganize-codeblocks ./path-to-your-files/**/*.hbs`

const getNodeAttributeValue = (node, attributeName) => {
  const foundAttributeWithName = node.attributes.find(
    (a) => a.name === attributeName
  );
  if (foundAttributeWithName) {
    return foundAttributeWithName.value.chars;
  } else {
    return undefined;
  }
};

module.exports = function ({ source /*, path */ }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, (env) => {
    let { builders: build } = env.syntax;

    return {
      ElementNode(node /* ,nodePath */ ) { // use nodePath if you need access to the parent node
        // console.log('\n\n[nodePath.parent]\n', nodePath.parent, '\n\n');
        if (
          node.tag === 'ul' &&
          getNodeAttributeValue(node, 'class') === 'dummy-list'
        ) {
          let list = node.children;
          let criteria = [];
          list.forEach((item) => {
            if (item.type === 'ElementNode' && item.tag === 'li') {
              let textNode;
              let linkNode;
              if (item.children[0].type === 'ElementNode' && item.children[0].tag === 'a') {
                // <li><a
                //   href="https://www.w3.org/WAI/WCAG21/Understanding/use-of-color"
                //   rel="noopener noreferrer"
                //   target="_blank"
                // >1.4.1 Use of Color (A):</a>
                textNode = item.children[0].children[0];
                linkNode = item.children[0];

              } else if (item.children[0].type === 'TextNode') {
                // <li>1.4.1:
                //   <a
                //     href="https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html"
                //     rel="noopener noreferrer"
                //     target="_blank"
                //   >Use of Color</a></li>
                textNode = item.children[0];
                linkNode = item.children[1];
              } else {
                console.log('Found node that does not match expected format', node);

              }

              // item.children.forEach((link) => {
              //   if (link.type === 'ElementNode' && link.tag === 'a') {
              //     let href = getNodeAttributeValue(link, 'href');
              //     href = href.replace('https://www.w3.org/WAI/WCAG21/Understanding/','');
              //     const text = link.children[0].chars;
              //     const id = text.replace(/^(\d+\.\d+\.\d+)\s?.*/gm, "$1");
              //     if(!id.match(/^\d+\.\d+\.\d+/)) {
              //       console.log('\nFound error!\n', `[[${text}]]`, `<<${id}>>`, '\n');
              //     }
              //   }
              // });
              let id = textNode.chars.replace(/^\s*(\d+\.\d+\.\d+):?\s?.*/gm, "$1");
              if(!id.match(/^\d+\.\d+\.\d+/)) {
                console.log('\nFound error!\n', `[[${id}]]`, '\n');
              }
              let href = getNodeAttributeValue(linkNode, 'href');
              href = href.replace('https://www.w3.org/WAI/WCAG21/Understanding/','');
              criteria.push({ href, id});
            }
          });

          const nl = build.text('\n');

          const customComponentNode = build.element(
            { name: 'dummywcagsuccesscriterialist', selfClosing: false },
            {
              children: [ build.text('WCAG') ],
              attrs: [
                // use this one if we need just the ID of the criteria
                build.attr('data-list', build.text(`${criteria.map(item => item.id).join('|')}`)),
                // use this one if we need more metadata coming from the original content
                // build.attr('data-json', build.text(`${JSON.stringify(criteria).replace(/"/g,'\'')}`)),
              ]
            }
          );

          return [
            build.element(
              { name: 'div', selfClosing: false },
              {
                children: [nl, nl, customComponentNode, nl],
              }
            ),
          ];
        }
      },
    };
  });
};

module.exports.type = 'hbs';
