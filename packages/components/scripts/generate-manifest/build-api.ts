import type {
  CatalogApi,
  CatalogApiProperty,
  CatalogArg,
  CatalogBlock,
} from './types.ts';

export function argsToApiProperties(args: CatalogArg[]): CatalogApiProperty[] {
  return args.map((arg) => {
    return {
      name: arg.name,
      type: arg.type,
      required: arg.required,
      default: arg.default,
      values: arg.values,
      description: arg.description,
      notes: arg.notes,
      links: arg.links,
    };
  });
}

export function getSplattributesApiProperty(): CatalogApiProperty {
  return {
    name: '...attributes',
    description:
      'This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).',
  };
}

function blocksToApiProperties(blocks: CatalogBlock[]): CatalogApiProperty[] {
  return blocks.map((block) => {
    return {
      name: block.name,
      type: 'block',
      description: block.description,
    };
  });
}

export function buildApi(
  args: CatalogArg[],
  blocks: CatalogBlock[],
  contextualProperties: CatalogApiProperty[],
  hasSplattributes: boolean
): CatalogApi {
  const api: CatalogApi = {};

  if (args.length > 0) {
    const apiArgs = argsToApiProperties(args);

    if (hasSplattributes === true) {
      apiArgs.push(getSplattributesApiProperty());
    }

    api.arguments = apiArgs;
  }

  if (blocks.length > 0) {
    api.blocks = blocksToApiProperties(blocks);
  }

  if (contextualProperties.length > 0) {
    api.contextualComponents = contextualProperties;
  }

  return api;
}
