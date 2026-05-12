export type CatalogArg = {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  default?: string;
  values?: string[];
  notes?: CatalogApiNote[];
  links?: CatalogApiLink[];
};

export type CatalogApiNote = {
  kind: 'note' | 'important' | 'warning';
  text: string;
};

export type CatalogApiLink = {
  href: string;
  label?: string;
};

export type CatalogBlock = {
  name: string;
  description?: string;
};

export type CatalogApiProperty = {
  name: string;
  type?: string;
  required?: boolean;
  default?: string;
  values?: string[];
  valueNote?: string;
  description?: string;
  notes?: CatalogApiNote[];
  links?: CatalogApiLink[];
  properties?: CatalogApiProperty[];
};

export type CatalogApiSection = {
  title: string;
  description?: string;
  properties: CatalogApiProperty[];
};

export type CatalogApi = {
  arguments?: CatalogApiProperty[];
  blocks?: CatalogApiProperty[];
  contextualComponents?: CatalogApiProperty[];
};

export type CatalogApiDoc = {
  sections: CatalogApiSection[];
};

export type CatalogComponent = {
  name: string;
  slug: string;
  summary: string;
  args?: CatalogArg[];
  blocks?: CatalogBlock[];
  api: CatalogApi;
};

export type Catalog = {
  generatedAt: string;
  components: CatalogComponent[];
};

export type ComponentExport = {
  exportName: string;
  componentPath: string;
};
