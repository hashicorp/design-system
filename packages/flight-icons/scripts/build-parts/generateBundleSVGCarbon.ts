/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from "fs-extra";
import prettier from "prettier";
import { JSDOM } from "jsdom";
import { camelCase, upperFirst } from "lodash";
import hdsCarbonIconMap from "../../hds-carbon-icon-map";

// import { getCssForIconAnimation } from "./getCssForIconAnimation";

import type { ConfigData } from "../@types/ConfigData";

interface CarbonIconDescriptor {
  elem: string;
  attrs?: { [key: string]: string | null };
  content?: CarbonIconDescriptor[];
  name?: string;
}

const CARBON_ICON_SIZE_16 = 16;
const CARBON_ICON_SIZE_24 = 24;
const CARBON_ICON_SIZES = [CARBON_ICON_SIZE_16, CARBON_ICON_SIZE_24];

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
global.document = dom.window.document;
global.window = dom.window as unknown as Window & typeof globalThis;

const prettierConfig = {
  parser: "ember-template-tag",
  plugins: ["prettier-plugin-ember-template-tag"] as string[],
  tabWidth: 4,
  singleQuote: true,
  trailingComma: "none",
} as const;

const getComponentName = (fileName: string) => {
  return upperFirst(camelCase(`Carbon Icon ${fileName}`));
};

const convertJSONToSVGString = (
  descriptor: CarbonIconDescriptor,
  isRoot = false
): string => {
  const { elem, attrs = {}, content = [] } = descriptor;

  let attrString = Object.entries(attrs)
    .map(([key, value]) => {
      if (value == null) {
        return "";
      }

      if (key === "fill" && value === "currentColor") {
        return 'fill={{if @color @color "currentColor"}}';
      }

      return `${key}="${value}"`;
    })
    .join(" ");

  let childrenString = content
    .map((child) => convertJSONToSVGString(child))
    .join("");

  if (isRoot) {
    attrString += " aria-labelledby={{if @title (concat 'title-' id)}}";
    attrString += " aria-hidden={{unless @title 'true'}}";
    attrString += " ...attributes";

    const titleBlock = `
      {{#if @title}}
        <title id="title-{{id}}">{{@title}}</title>
      {{/if}}
    `;
    childrenString = titleBlock + childrenString;
  }

  return `<${elem} ${attrString}>${childrenString}</${elem}>`;
};

const getComponentSource = ({
  componentName,
  svgCarbon,
}: {
  componentName: string;
  svgCarbon: unknown;
}) => {
  return `
      import { guidFor } from '@ember/object/internals';
      import { concat } from '@ember/helper';
  
      import type TemplateOnlyComponent from '@ember/component/template-only';
      import type { CarbonIconSignature } from './types';

      const uniqueId = () => guidFor({});

      const ${componentName}: TemplateOnlyComponent<CarbonIconSignature> = <template>
        {{#let (uniqueId) as |id|}}
          ${svgCarbon}
        {{/let}}
      </template>;

      export default ${componentName};
    `;
};

export async function generateBundleSVGCarbon({
  config,
}: {
  config: ConfigData;
}): Promise<void> {
  const exports: { componentName: string; fileName: string }[] = [];

  // remove the generated content from the destination folder
  try {
    await fs.emptyDir(`${config.mainFolder}/svg-carbon`);
  } catch (err) {
    console.error(err);
  }

  // process the icon objects and convert them to Ember components
  for (const [iconName, carbonIconName] of Object.entries(hdsCarbonIconMap)) {
    for (const size of CARBON_ICON_SIZES) {
      const iconModule = await import(
        `@carbon/icons/es/${carbonIconName}/${size}`
      );
      const iconDef = iconModule.default;

      const svgString = convertJSONToSVGString(iconDef, true);

      const fileName = `${iconName.replace(/-+/g, "-")}-${size}`;
      const componentName = getComponentName(fileName);

      exports.push({ componentName, fileName });

      const componentSource = getComponentSource({
        componentName,
        svgCarbon: svgString,
      });

      const fileContent = await prettier.format(
        componentSource,
        prettierConfig
      );

      await fs.writeFile(
        `${config.mainFolder}/svg-carbon/${fileName}.gts`,
        fileContent
      );
    }
  }

  // generate an "index.tsx" file
  let indexContent = "";
  for (const { fileName, componentName } of exports) {
    indexContent += `export { ${componentName} } from './${fileName}';\n`;
  }
  await fs.writeFile(`${config.mainFolder}/svg-carbon/index.ts`, indexContent);

  // generate a "types.ts" file
  const typesContent = await prettier.format(
    `
      export interface CarbonIconSignature {
        Args: {
          color?: string;
          title?: string;
        };
        Element: SVGSVGElement;
      }
    `,
    prettierConfig
  );

  await fs.writeFile(`${config.mainFolder}/svg-carbon/types.ts`, typesContent);

  // add CSS used to animate "loading" and "running" icons
  // const animationIconCss: string = await getCssForIconAnimation();
  // await fs.writeFile(
  //   `${config.mainFolder}/svg-carbon/animation.css`,
  //   animationIconCss
  // );
}
