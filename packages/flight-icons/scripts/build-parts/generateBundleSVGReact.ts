import fs from 'fs-extra';
// @ts-ignore svgr/core doesn't have type definitions available yet - see https://github.com/gregberge/svgr/pull/555
import svgr from '@svgr/core';
import prettier from 'prettier';
import { camelCase, upperFirst } from 'lodash';

import { ConfigData } from '../@types/ConfigData';
import { AssetsCatalog } from '../@types/AssetsCatalog';

const prettierConfig = { parser: 'typescript' as const, tabWidth: 4, singleQuote: true };

const getComponentName = (fileName: string) => {
    return upperFirst(camelCase(`Icon ${fileName}`));
};

const getComponentSource = ({ componentName, svgReact }: { componentName: string; svgReact: any }) => {
    return `
        import { forwardRef } from 'react';
        import { IconProps } from './types';

        export const ${componentName} = forwardRef<SVGSVGElement, IconProps>(({ color = 'currentColor', title, titleId, ...props }, svgRef) => {
            return (
                ${svgReact}
            );
        })
    `;
};

export async function generateBundleSVGReact({ config, catalog } : { config: ConfigData, catalog: AssetsCatalog }): Promise<void> {

    const tempSVGFolderPath = config.tempFolder;

    // remove the generated content from the destination folder
    try {
        await fs.emptyDir(`${config.mainFolder}/svg-react`)
    } catch (err) {
        console.error(err);
    }

    // process the SVGs and convert them to React
    for(const { fileName } of catalog.assets) {
        const svgSource = await fs.readFile(`${tempSVGFolderPath}/${fileName}.svg`, 'utf8');

        const componentName = getComponentName(fileName);

        // convert SVG to React/JSX
        // see: https://github.com/gregberge/svgr/blob/main/packages/core/src/convert.js
        let svgReact = await svgr(svgSource,
            // CONFIG
            // for all the options see: https://github.com/gregberge/svgr/blob/main/packages/core/src/index.d.ts
            // for the "outDir" option see: https://github.com/gregberge/svgr/issues/532 (essentially, it's only for CLI)
            {
                icon: false,
                dimensions: true,
                typescript: true,
                expandProps: 'end',
                svgo: false,
                prettier: false,
                ref: true,
                titleProp: true,
                svgProps: { 'aria-hidden': '{!title}' },
                replaceAttrValues: { '#000001': '{color}' },
                // plugins: [
                //     '@svgr/plugin-jsx',
                //     '@svgr/plugin-prettier'
                // ],
                // to use a custom template:
                // see: - https://react-svgr.com/docs/custom-templates/
                //      - https://github.com/gregberge/svgr/issues/363
                //      - https://github.com/gregberge/svgr/issues/530
                // @ts-ignore
                template: ({ template }, opts, { jsx }) => template.ast`${jsx}`,
                // template: ({ template }, opts, { imports, interfaces, componentName, props, jsx, exports }) => {
                //     const typescriptTemplate = template.smart({
                //         plugins: ['jsx', 'typescript'],
                //     });
                //     return typescriptTemplate.ast`
                //         ${imports}
                //         ${interfaces}
                //         function ${componentName}(${props}) {
                //             return ${jsx};
                //         }
                //         ${exports}
                //     `
                // },
                // template: ({ template }, opts, { imports, interfaces, componentName, props, jsx, exports }) => {
                //     const typescriptTemplate = template.smart({
                //         plugins: ['jsx', 'typescript'],
                //     });
                //     console.log(JSON.stringify(props, null, 2));
                //     // props.ref = 'forwardedRef';
                //     return typescriptTemplate.ast`
                //         ${imports}
                //         ${interfaces}
                //         function ${componentName}(${props}) {
                //             return ${jsx};
                //         }
                //         ${exports}
                //     `
                // },
                // template: ({ template }, opts, { jsx }) => {
                //     const typescriptTemplate = template.smart({
                //         plugins: ['jsx', 'typescript'],
                //     });
                //     return typescriptTemplate.ast`
                //         import { forwardRef } from 'react';
                //         import type { IconProps } from './types';
                //         export const ${componentName} = forwardRef<SVGSVGElement, IconProps>(
                //             ({ color = 'currentColor', ...props }, forwardedRef) => {
                //                 return (${jsx});
                //             )
                //         });
                //     `
                // },
                // template: ({ template }, opts, { jsx }) => {
                //     const typescriptTemplate = template.smart({
                //         plugins: ['jsx', 'typescript'],
                //     });
                //     return typescriptTemplate.ast`
                //         import { forwardRef } from 'react';
                //         import type { IconProps } from './types';
                //         export const ${componentName} = forwardRef<SVGSVGElement, IconProps>(
                //             ({ color = 'currentColor', ...props }, forwardedRef) => {
                //                 return (${jsx});
                //             )
                //         });
                //     `;
                // },
                // template: ({ template }, opts, { jsx }) => {
                //     const typescriptTemplate = template.smart({
                //         plugins: ['jsx', 'typescript'],
                //     });
                //     const svgComponent = '<SvgComponent svgRef={ref} {...props} />';
                //     return typescriptTemplate.ast`
                //         import { forwardRef } from 'react'
                //         import { IconProps } from './types'
                //         const SvgComponent = ({ svgRef, ...props }: IconProps) => ${jsx};

                //         export const ${componentName} = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
                //         (props, ref) => ${svgComponent}
                //         );
                //     `;
                // },
            },
            // STATE
            {
                componentName: componentName
            }
        );

        // remove the extra semi-colon added at the end of the output by the SVGR AST transformer
        svgReact = svgReact.replace(/;$/,'');

        const componentSource = getComponentSource({ componentName, svgReact});
        const fileContent = prettier.format(componentSource, prettierConfig);

        // use these to debug
        // if (fileName === 'amazon-eks-color-24') {
        // if (fileName === 'dot-16') {
        //     await console.log(fileContent);
        // }

        await fs.writeFile(`${config.mainFolder}/svg-react/${fileName}.tsx`, fileContent);
    }

    // generate an "index.tsx" file
    let indexContent = '';
    for(const { fileName } of catalog.assets) {
        const componentName = getComponentName(fileName);
        indexContent += `export { ${componentName} } from './${fileName}';\n` ;
    }
    await fs.writeFile(`${config.mainFolder}/svg-react/index.ts`, indexContent);

    // generate a "types.ts" file
    const typesContent = prettier.format(`
        import { SVGAttributes } from 'react';
        export interface IconProps extends SVGAttributes<SVGElement> {
            children?: never,
            color?: string,
            title?: string,
            titleId?: string,
        }
    `, prettierConfig);

    await fs.writeFile(`${config.mainFolder}/svg-react/types.ts`, typesContent);
}
