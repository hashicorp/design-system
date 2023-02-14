module.exports = function ({ source, path }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, (env) => {
    let { builders: build } = env.syntax;

    return {
      ElementNode(node) {
        const classAttr = node.attributes.find((a) => a.name === 'class');
        if (classAttr?.value?.chars) {
          let className = classAttr.value.chars;
          // console.log(
          //   `\nProcessing <${node.tag}> in FILE: "${path}" with className="${className}"`
          // );
          let variantEmberName;
          let classOutputAttr;
          if (className.includes('dummy-h')) {
            const headingLevel = className.match(/dummy-(h\d)/)[1];
            switch (headingLevel) {
              case 'h4':
                variantEmberName = 'H2';
                break;
              case 'h5':
                variantEmberName = 'H3';
                break;
              case 'h6':
                variantEmberName = 'H4';
                break;
            }
            if (!className.match(/^dummy-h\d$/)) {
              classOutputAttr = className.replace(/dummy-h\d/, '').trim();
            }
          }
          if (variantEmberName) {
            const otherAttrs = node.attributes.filter((a) => a.name !== 'class');
            const outputAttrs = [...otherAttrs];
            if (classOutputAttr) {
              outputAttrs.push(build.attr('class', build.text(classOutputAttr)));
            }

            return build.element(
              { name: `Shw::Text::${variantEmberName}`, selfClosing: false },
              {
                attrs: outputAttrs,
                children: node.children,
                modifiers: node.modifiers,
                blockParams: node.blockParams,
                comments: node.comments,
              }
            );
          }
        }
      },
    };
  });
};

module.exports.type = 'hbs';
