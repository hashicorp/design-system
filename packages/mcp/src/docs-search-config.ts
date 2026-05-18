/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

type EnvVars = {
  ALGOLIA_APPLICATION_ID?: string | undefined;
  ALGOLIA_API_KEY_SEARCH?: string | undefined;
  ALGOLIA_INDEX_ID?: string | undefined;
};

export type DocsSearchConfig = {
  applicationId: string;
  apiKeySearch: string;
  indexId: string;
};

export type DocsSearchConfigState =
  | {
      available: true;
      config: DocsSearchConfig;
    }
  | {
      available: false;
      missingEnvVars: string[];
    };

const normalizeEnvValue = (value: string | undefined): string | null => {
  if (value === undefined) {
    return null;
  }

  const normalized = value.trim();

  if (normalized === '') {
    return null;
  }

  return normalized;
};

export const getDocsSearchConfig = (
  env: EnvVars | NodeJS.ProcessEnv = process.env
): DocsSearchConfigState => {
  const applicationId = normalizeEnvValue(env.ALGOLIA_APPLICATION_ID);
  const apiKeySearch = normalizeEnvValue(env.ALGOLIA_API_KEY_SEARCH);
  const indexId = normalizeEnvValue(env.ALGOLIA_INDEX_ID);

  const missingEnvVars: string[] = [];

  if (applicationId === null) {
    missingEnvVars.push('ALGOLIA_APPLICATION_ID');
  }

  if (apiKeySearch === null) {
    missingEnvVars.push('ALGOLIA_API_KEY_SEARCH');
  }

  if (indexId === null) {
    missingEnvVars.push('ALGOLIA_INDEX_ID');
  }

  if (applicationId === null || apiKeySearch === null || indexId === null) {
    return {
      available: false,
      missingEnvVars,
    };
  }

  return {
    available: true,
    config: {
      applicationId,
      apiKeySearch,
      indexId,
    },
  };
};
