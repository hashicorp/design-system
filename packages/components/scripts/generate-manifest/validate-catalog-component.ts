import type { CatalogComponent } from './types.ts';

export function validateCatalogComponent(component: CatalogComponent): void {
  if (component.summary.length === 0) {
    throw new Error(
      `Cannot generate manifest for "${component.slug}" because summary is empty.`
    );
  }

  if (
    component.api.arguments === undefined &&
    component.api.blocks === undefined &&
    component.api.contextualComponents === undefined
  ) {
    throw new Error(
      `Cannot generate manifest for "${component.slug}" because no API properties were generated.`
    );
  }

  if (component.api.arguments !== undefined && component.api.arguments.length === 0) {
    throw new Error(
      `Cannot generate manifest for "${component.slug}" because api.arguments has no properties.`
    );
  }

  if (component.api.blocks !== undefined && component.api.blocks.length === 0) {
    throw new Error(
      `Cannot generate manifest for "${component.slug}" because api.blocks has no properties.`
    );
  }

  if (
    component.api.contextualComponents !== undefined &&
    component.api.contextualComponents.length === 0
  ) {
    throw new Error(
      `Cannot generate manifest for "${component.slug}" because api.contextualComponents has no properties.`
    );
  }
}
