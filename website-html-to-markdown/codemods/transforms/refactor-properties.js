// ## refactor component properties
//
// This codemod converts this code:
// ```
// <dl class="dummy-component-props" aria-labelledby="component-api-alert">
//   <dt>type <code>enum</code> <strong class="required">required</strong></dt>
//   <dd>
//     <p>Sets the type of alert.</p>
//     <p>Acceptable values:</p>
//     <ol><li>page</li><li>inline</li><li>compact</li></ol>
//   </dd>
// </dl>
// ```
// in this
// ```
// <api>
//   <output data-name="type" data-type="enum" data-values="page inline compact" data-required="true">
//     <p>Sets the type of alert.</p>
//   </output>
// </api>
// ```
// so we can later alter in `convert-to-markdown.ts` to
// ```
// <Doc::ComponentAPI as |C|>
//   <C.Property @name='type' @type='enum' @value='page inline compact' @required='true'>
//     <p>Sets the type of alert.</p>
//   </C.Property>
// </Doc::ComponentAPI>
// ```
//
// ## Usage
// - in the `website-html-to-markdown` folder run the command:
//   `node codemods/bin/cli.js refactor-properties ./path-to-your-files/**/*.hbs`

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

module.exports = function ({ source, path }, { parse, visit }) {
  const ast = parse(source);

  return visit(ast, (env) => {
    let { builders: build } = env.syntax;

    return {
      ElementNode(node) {
        if (node.tag === 'dl') {
          let className = getNodeAttributeValue(node, 'class');
          let properties = [];

          if (className === "dummy-component-props") {
            let property = [];
            node.children.forEach((c) => {
              if (c.tag === 'dt') {
                property['name'] = '';
                c.children.forEach((c) => {
                  if (c.tag === 'code') {
                    property['type'] = c.children[0].chars.trim();
                  } else if (c.tag === 'strong') {
                    property['required'] = true;
                  } else if (c.type === 'TextNode' && c.chars) {
                    property['name']+=c.chars.trim().replace(/"/g, '').replace(/\//g, ' ');
                  }
                });
              } else if (c.tag === 'dd') {
                if (c.type === 'TextNode' && c.chars) {
                  property['notes'] = c.chars;
                } else {
                  property['notes'] = '';
                  c.children.forEach((c) => {
                    if (c.tag === 'p' && c.children) {
                      if (property['notes'] !== '') property['notes']+=' ';
                      c.children.forEach((c) => {
                        if (c.type === 'TextNode' && c.chars) {
                          if (!c.chars.includes('Acceptable values') && !c.chars.includes('Default:') ) property['notes']+=c.chars;
                        } else if ((c.tag === 'code' || c.tag === 'strong' || c.tag === 'em' || c.tag === 'a') && c.children) {
                          let href = getNodeAttributeValue(c, 'href');
                          property['notes']+=`<${c.tag} ${href?'href="'+href+'"':''}>`;
                          c.children.forEach((c) => {
                            if (c.type === 'TextNode' && c.chars) {
                              property['notes']+=c.chars;
                            } else if ((c.tag === 'code' || c.tag === 'strong' || c.tag === 'em' || c.tag === 'a') && c.children) {
                              let href = getNodeAttributeValue(c, 'href');
                              property['notes']+=`<${c.tag} ${href?'href="'+href+'"':''}>${c.children[0].chars}</${c.tag}>`;
                            }
                          });
                          property['notes']+=`</${c.tag}>`;
                        }
                      });
                    } else if (c.tag === 'ol' && c.children) {
                      let values = [];
                      c.children.forEach((c) => {
                        if (c.tag === 'li' && c.children[0]) {
                          let value = c.children[0].chars;
                          if (getNodeAttributeValue(c, 'class') === 'default') {
                            property['default']=value;
                          }
                          values.push(value);
                        }
                      });
                      property['value'] = values.join(', ').trim();
                    }
                  });
                  properties.push(property);
                  property = [];  
                }
              }
            });
          } else {
            console.error(
              'ERROR: Found <dl> without `dummy-component-props` class in ',
              `\nFILE: "${path}"`
            );
          }


          let output = [];
          output.push(build.text(`<api>`));
          properties.forEach((p) => {
            output.push(build.text(`<output data-name="${p['name']}" data-type="${p['type']?p['type']:''}" data-value="${p['value']?p['value']:''}"${p['default']?' data-default="'+p['default']+'"':''}${p['required']?' data-required="true"':''}>`));
            output.push(build.text(`${p['notes']?p['notes']:'–'}`));
            output.push(build.text(`</output>`));
          });
          output.push(build.text(`</api>`));
          return output;
        }
      },
    };
  });
};

module.exports.type = 'hbs';
