import componentManifestJson from '@hashicorp/design-system-components/manifest/components.json';

export type DocComponentApiSection =
  | 'api'
  | 'arguments'
  | 'blocks'
  | 'contextual'
  | 'contextual-args';

export interface DocComponentApiProperty {
  name?: string;
  type?: string;
  values?: string[];
  required?: boolean;
  default?: string | number | boolean;
  valueNote?: string;
  description?: string;
  remarks?: string;
  links?: Array<{ href: string; label?: string }>;
  properties?: DocComponentApiProperty[];
  sourcePath?: string;
}

interface NormalizedComponent {
  name: string;
  slug: string;
  splattributes?: boolean;
  api?: {
    arguments?: DocComponentApiProperty[];
    blocks?: DocComponentApiProperty[];
    contextualComponents?: DocComponentApiProperty[];
  };
}

interface ManifestWithComponents {
  components: NormalizedComponent[];
}

type ParserManifest = Record<string, ParsedComponent>;

interface ParsedArgument {
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number | boolean | null;
  description?: string;
  remarks?: string;
  valueNote?: string;
  links?: Array<{ href: string; label?: string }>;
  values?: string[];
  dependsOn?: string | null;
}

interface ParsedYield {
  name: string;
  type?: string;
  description?: string;
  remarks?: string;
  sourcePath?: string;
}

interface ParsedBlock {
  name: string;
  description?: string;
  yields?: ParsedYield[];
}

interface ParsedComponent {
  name?: string;
  slug?: string;
  splattributes?: boolean;
  args?: ParsedArgument[];
  blocks?: ParsedBlock[];
}

const SPLATTRIBUTES_PROPERTY: DocComponentApiProperty = {
  name: '...attributes',
  description:
    'This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).',
};

function toPascalCase(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function slugToComponentName(slug: string): string | undefined {
  const normalized = slug.replace(/^layout\//, 'layout/');
  const parts = normalized.split('/').filter(Boolean);

  if (parts.length === 0) {
    return undefined;
  }

  return `Hds${parts.map((part) => toPascalCase(part)).join('')}`;
}

function componentNameToYieldPrefix(componentName: string): string | undefined {
  const withoutPrefix = componentName.replace(/^Hds/u, '');
  const initials = withoutPrefix.match(/[A-Z]/gu)?.join('');

  if (initials === undefined || initials.length === 0) {
    return undefined;
  }

  return initials;
}

function unquoteLiteralValue(value: string): string {
  const match = /^(['"])(.*)\1$/u.exec(value);

  if (match === null) {
    return value;
  }

  return match[2] ?? value;
}

function normalizeDefaultValue(
  defaultValue: string | number | boolean | null | undefined,
): string | number | boolean | undefined {
  if (defaultValue === null || defaultValue === undefined) {
    return undefined;
  }

  if (typeof defaultValue !== 'string') {
    return defaultValue;
  }

  return unquoteLiteralValue(defaultValue);
}

function parseEnumValues(typeText: string | undefined): string[] | undefined {
  if (typeof typeText !== 'string') {
    return undefined;
  }

  const values = typeText
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean);

  if (values.length < 2) {
    return undefined;
  }

  const areAllStringLiterals = values.every((value) => {
    return /^(['"]).*\1$/u.test(value);
  });

  if (areAllStringLiterals === false) {
    return undefined;
  }

  return values.map((value) => unquoteLiteralValue(value));
}

function normalizeParsedArgument(arg: ParsedArgument): DocComponentApiProperty {
  const enumValues =
    Array.isArray(arg.values) && arg.values.length > 0
      ? arg.values
      : parseEnumValues(arg.type);

  return {
    name: arg.name,
    type: enumValues === undefined ? arg.type : 'enum',
    values: enumValues,
    required: arg.required,
    default: normalizeDefaultValue(arg.defaultValue),
    description: arg.description,
    remarks: arg.remarks || undefined,
    valueNote: arg.valueNote,
    links: arg.links,
  };
}

function normalizeParsedArguments(
  args: ParsedArgument[] = [],
): DocComponentApiProperty[] {
  const propertiesByName = new Map<string, DocComponentApiProperty>();
  const argumentsProperties = args.map((arg) => {
    const normalized = normalizeParsedArgument(arg);
    propertiesByName.set(arg.name, normalized);

    return normalized;
  });

  args.forEach((arg) => {
    if (arg.dependsOn === null || arg.dependsOn === undefined) {
      return;
    }

    const child = propertiesByName.get(arg.name);
    const parent = propertiesByName.get(arg.dependsOn);

    if (child === undefined || parent === undefined) {
      return;
    }

    if (Array.isArray(parent.properties) === false) {
      parent.properties = [];
    }

    parent.properties.push(child);
  });

  return argumentsProperties.filter((property, index) => {
    const arg = args[index];

    if (arg === undefined) {
      return true;
    }

    if (arg.dependsOn === null || arg.dependsOn === undefined) {
      return true;
    }

    return propertiesByName.has(arg.dependsOn) === false;
  });
}

function normalizeParsedComponentApiEntry(
  componentName: string,
  parsedEntry: ParsedComponent,
): NormalizedComponent {
  const argumentsProperties = normalizeParsedArguments(parsedEntry.args);
  const yieldPrefix = componentNameToYieldPrefix(
    parsedEntry.name ?? componentName,
  );

  const blocksProperties: DocComponentApiProperty[] = (
    parsedEntry.blocks ?? []
  ).map((block) => ({
    name: block.name,
    description: block.description,
    properties: (block.yields ?? []).map((yieldedValue) => ({
      name: yieldedValue.name,
      type: yieldedValue.type,
      description: yieldedValue.description,
      remarks: yieldedValue.remarks || undefined,
      sourcePath: yieldedValue.sourcePath || undefined,
    })),
  }));

  const contextualComponents: DocComponentApiProperty[] = [];
  (parsedEntry.blocks ?? []).forEach((block) => {
    (block.yields ?? []).forEach((yieldedValue) => {
      const contextualNamePrefix =
        yieldPrefix === undefined ? block.name : `[${yieldPrefix}]`;

      contextualComponents.push({
        name: `${contextualNamePrefix}.${yieldedValue.name}`,
        type:
          yieldedValue.type === 'component'
            ? 'yielded component'
            : yieldedValue.type,
        description: yieldedValue.description,
        remarks: yieldedValue.remarks || undefined,
        sourcePath: yieldedValue.sourcePath || undefined,
      });
    });
  });

  return {
    name: parsedEntry.name ?? componentName,
    slug: parsedEntry.slug ?? parsedEntry.name ?? componentName,
    splattributes: parsedEntry.splattributes === true,
    api: {
      arguments: argumentsProperties,
      blocks: blocksProperties,
      contextualComponents,
    },
  };
}

function loadManifestComponentBySlug(
  slug: string,
): NormalizedComponent | undefined {
  const manifest = componentManifestJson as
    | ManifestWithComponents
    | ParserManifest;

  if ('components' in manifest && Array.isArray(manifest.components)) {
    return manifest.components.find((entry) => entry.slug === slug);
  }

  const componentName = slugToComponentName(slug);

  if (componentName === undefined) {
    return undefined;
  }

  const parsedEntry = (manifest as ParserManifest)[componentName];

  if (parsedEntry === undefined) {
    return undefined;
  }

  return normalizeParsedComponentApiEntry(componentName, parsedEntry);
}

function getApiProperties(
  component: NormalizedComponent,
  key: 'arguments' | 'blocks' | 'contextualComponents',
): DocComponentApiProperty[] {
  const properties = component.api?.[key];

  if (Array.isArray(properties) === false) {
    return [];
  }

  return properties;
}

function getApiPropertiesIfPresent(
  component: NormalizedComponent,
  key: 'arguments' | 'blocks' | 'contextualComponents',
): DocComponentApiProperty[] | undefined {
  const properties = component.api?.[key];

  if (Array.isArray(properties) === false || properties.length === 0) {
    return undefined;
  }

  return properties;
}

function stripNestedProperties(
  properties: DocComponentApiProperty[],
): DocComponentApiProperty[] {
  return properties.map((property) => {
    const topLevelProperty = { ...property };

    delete topLevelProperty.properties;

    return topLevelProperty;
  });
}

function keepYieldedComponentsOnly(
  properties: DocComponentApiProperty[],
): DocComponentApiProperty[] {
  return properties.filter((property) => property.type === 'yielded component');
}

function keepTopLevelYieldedValuesOnly(
  properties: DocComponentApiProperty[],
): DocComponentApiProperty[] {
  return properties.filter((property) => {
    return (
      typeof property.name === 'string' && /^\[[^\]]+\]\./u.test(property.name)
    );
  });
}

function getYieldedPropertyCategoryRank(
  property: DocComponentApiProperty,
): number {
  if (property.type === 'yielded component') {
    return 0;
  }

  if (property.type === 'function') {
    return 2;
  }

  return 1;
}

function sortYieldedProperties(
  properties: DocComponentApiProperty[],
): DocComponentApiProperty[] {
  return [...properties].sort((a, b) => {
    const categoryRankDiff =
      getYieldedPropertyCategoryRank(a) - getYieldedPropertyCategoryRank(b);

    if (categoryRankDiff !== 0) {
      return categoryRankDiff;
    }

    const aName = a.name ?? '';
    const bName = b.name ?? '';

    return aName.localeCompare(bName);
  });
}

function normalizeContextualSummaryDescription(
  description: string | undefined,
): string | undefined {
  if (description === undefined || description.length === 0) {
    return description;
  }

  if (/yielded as contextual component \(see below\)\.?$/u.test(description)) {
    return description;
  }

  const normalized = description
    .replace(/^The\s+/u, '')
    .replace(
      /\s+component,\s+yielded as (?:a\s+)?contextual component\.?$/u,
      '',
    )
    .replace(/\s+component\s+yielded as (?:a\s+)?contextual component\.?$/u, '')
    .replace(/\s+yielded as (?:a\s+)?contextual component\.?$/u, '')
    .trim();

  if (normalized.length === 0) {
    return description;
  }

  return `${normalized} yielded as contextual component (see below).`;
}

function getContextualComponentSummaryName(
  component: NormalizedComponent,
  propertyName: string | undefined,
): string | undefined {
  if (typeof propertyName !== 'string' || propertyName.length === 0) {
    return undefined;
  }

  const contextualNameMatch = /^\[[^\]]+\]\.(.+)$/u.exec(propertyName);
  const contextualName = contextualNameMatch?.[1];

  if (contextualName === undefined || contextualName.length === 0) {
    return undefined;
  }

  const componentName = component.name;

  if (typeof componentName !== 'string' || componentName.length === 0) {
    return undefined;
  }

  const baseComponentName = componentName.replace(/^Hds/u, '');

  if (baseComponentName.length === 0) {
    return undefined;
  }

  return `${baseComponentName}::${contextualName}`;
}

function sourcePathToContextualSegments(
  sourcePath: string | undefined,
): string[] | undefined {
  if (typeof sourcePath !== 'string' || sourcePath.length === 0) {
    return undefined;
  }

  const withoutPrefix = sourcePath.replace(/^\.\//u, '');
  const withoutExtension = withoutPrefix.replace(/\.[a-z0-9]+$/iu, '');
  const segments = withoutExtension
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      return segment
        .split('-')
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
    })
    .filter(Boolean);

  if (segments.length === 0) {
    return undefined;
  }

  return segments;
}

function getContextualComponentSummaryNameFromSourcePath(
  component: NormalizedComponent,
  sourcePath: string | undefined,
): string | undefined {
  const componentName = component.name;

  if (typeof componentName !== 'string' || componentName.length === 0) {
    return undefined;
  }

  const baseComponentName = componentName.replace(/^Hds/u, '');

  if (baseComponentName.length === 0) {
    return undefined;
  }

  const sourceSegments = sourcePathToContextualSegments(sourcePath);

  if (sourceSegments === undefined || sourceSegments.length === 0) {
    return undefined;
  }

  return `${baseComponentName}::${sourceSegments.join('::')}`;
}

function formatTopLevelYieldedProperty(
  component: NormalizedComponent,
  property: DocComponentApiProperty,
): DocComponentApiProperty {
  if (property.type !== 'yielded component') {
    return {
      ...property,
      description: property.description,
      remarks: property.remarks,
    };
  }

  const summaryName =
    getContextualComponentSummaryNameFromSourcePath(
      component,
      property.sourcePath,
    ) ?? getContextualComponentSummaryName(component, property.name);
  const normalizedDescription = normalizeContextualSummaryDescription(
    property.description,
  );
  const fallbackDescription =
    normalizedDescription === undefined || normalizedDescription.length === 0
      ? summaryName === undefined
        ? undefined
        : `\`${summaryName}\` yielded as contextual component (see below).`
      : normalizedDescription;

  return {
    ...property,
    name:
      property.name !== undefined && property.name.startsWith('<') === false
        ? `<${property.name}>`
        : property.name,
    description: fallbackDescription,
  };
}

function formatNamedBlock(
  property: DocComponentApiProperty,
): DocComponentApiProperty {
  const name = property.name;
  const hasNamedBlockSyntax =
    name !== undefined && /^<:[^>]+>$/u.test(name) === true;

  return {
    ...property,
    name:
      hasNamedBlockSyntax === true || name === undefined ? name : `<:${name}>`,
    type: 'named block',
  };
}

function keepNamedBlocksOnly(
  properties: DocComponentApiProperty[],
): DocComponentApiProperty[] {
  return properties.filter((property) => property.name !== 'default');
}

function getYieldedProperties(
  component: NormalizedComponent,
): DocComponentApiProperty[] {
  const contextualProperties = getApiPropertiesIfPresent(
    component,
    'contextualComponents',
  );

  if (contextualProperties === undefined) {
    return [];
  }

  return sortYieldedProperties(
    stripNestedProperties(keepTopLevelYieldedValuesOnly(contextualProperties)),
  ).map((property) => formatTopLevelYieldedProperty(component, property));
}

function appendSplattributesPropertyIfNeeded(
  component: NormalizedComponent,
  properties: DocComponentApiProperty[],
): DocComponentApiProperty[] {
  if (component.splattributes !== true) {
    return properties;
  }

  const hasSplattributesProperty = properties.some((property) => {
    return property.name === '...attributes' || property.name === '…attributes';
  });

  if (hasSplattributesProperty === true) {
    return properties;
  }

  return [...properties, SPLATTRIBUTES_PROPERTY];
}

function sortPropertiesByRequiredThenName(
  properties: DocComponentApiProperty[],
): DocComponentApiProperty[] {
  return [...properties]
    .map((property) => {
      const normalizedProperty = { ...property };

      if (
        Array.isArray(normalizedProperty.properties) === true &&
        normalizedProperty.properties.length > 0
      ) {
        normalizedProperty.properties = sortPropertiesByRequiredThenName(
          normalizedProperty.properties,
        );
      }

      return normalizedProperty;
    })
    .sort((a, b) => {
      if (a.required === true && b.required !== true) {
        return -1;
      }

      if (a.required !== true && b.required === true) {
        return 1;
      }

      const aName = a.name ?? '';
      const bName = b.name ?? '';

      return aName.localeCompare(bName);
    });
}

function getContextualProperty(
  component: NormalizedComponent,
  contextualName: string,
): DocComponentApiProperty | undefined {
  const contextualProperties = getApiProperties(
    component,
    'contextualComponents',
  );
  const contextualPattern = new RegExp(
    `^\\[[^\\]]+\\]\\.${contextualName}$`,
    'u',
  );

  return contextualProperties.find((property) => {
    return (
      typeof property.name === 'string' && contextualPattern.test(property.name)
    );
  });
}

export function getDocComponentApiProperties(
  componentSlug: string,
  section: DocComponentApiSection = 'api',
  contextualName?: string,
): DocComponentApiProperty[] {
  const component = loadManifestComponentBySlug(componentSlug);

  if (component === undefined) {
    return [];
  }

  if (section === 'api') {
    const namedBlocksProperties = keepNamedBlocksOnly(
      getApiProperties(component, 'blocks'),
    ).map((property) => formatNamedBlock(property));
    const yieldedComponentsProperties = getYieldedProperties(component);
    const argumentsProperties = appendSplattributesPropertyIfNeeded(
      component,
      sortPropertiesByRequiredThenName(
        getApiProperties(component, 'arguments'),
      ),
    );

    return [
      ...namedBlocksProperties,
      ...yieldedComponentsProperties,
      ...argumentsProperties,
    ];
  }

  if (section === 'arguments') {
    const argumentsProperties = appendSplattributesPropertyIfNeeded(
      component,
      sortPropertiesByRequiredThenName(
        getApiProperties(component, 'arguments'),
      ),
    );
    const contextualProperties = getApiPropertiesIfPresent(
      component,
      'contextualComponents',
    );

    if (contextualProperties === undefined) {
      return argumentsProperties;
    }

    const topLevelContextualComponents = stripNestedProperties(
      keepYieldedComponentsOnly(contextualProperties),
    ).map((property) => formatTopLevelYieldedProperty(component, property));

    return [...topLevelContextualComponents, ...argumentsProperties];
  }

  if (section === 'blocks') {
    const namedBlocksProperties = keepNamedBlocksOnly(
      getApiProperties(component, 'blocks'),
    ).map((property) => formatNamedBlock(property));
    const yieldedComponentsProperties = getYieldedProperties(component);

    return [...namedBlocksProperties, ...yieldedComponentsProperties];
  }

  if (section === 'contextual') {
    const contextualProperties = getApiProperties(
      component,
      'contextualComponents',
    );

    return stripNestedProperties(
      keepYieldedComponentsOnly(contextualProperties),
    );
  }

  if (section === 'contextual-args') {
    if (contextualName === undefined || contextualName.length === 0) {
      return [];
    }

    const contextualProperty = getContextualProperty(component, contextualName);

    if (
      contextualProperty === undefined ||
      Array.isArray(contextualProperty.properties) === false
    ) {
      return [];
    }

    return sortPropertiesByRequiredThenName(contextualProperty.properties);
  }

  return [];
}
