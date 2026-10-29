function validateConsumer(consumer) {
  if (!consumer || typeof consumer !== 'object' || Array.isArray(consumer)) {
    throw new Error('Each consumer config entry must be an object.');
  }

  if (!/^[a-z0-9-]+$/.test(consumer.id)) {
    throw new Error(`Invalid consumer id: ${consumer.id}`);
  }

  if (
    consumer.publicName !== undefined &&
    (typeof consumer.publicName !== 'string' ||
      !/^[A-Za-z0-9][A-Za-z0-9 &()-]{0,79}$/.test(consumer.publicName))
  ) {
    throw new Error(`Invalid public product name for ${consumer.id}.`);
  }

  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(consumer.repository)) {
    throw new Error(`Invalid consumer repository for ${consumer.id}.`);
  }

  if (
    typeof consumer.packageRoot !== 'string' ||
    consumer.packageRoot.length === 0 ||
    consumer.packageRoot.startsWith('/') ||
    consumer.packageRoot.split('/').includes('..') ||
    consumer.packageRoot.includes('\\') ||
    consumer.packageRoot.includes('\0')
  ) {
    throw new Error(`Invalid packageRoot for ${consumer.id}.`);
  }

  if (
    !Array.isArray(consumer.hdsDependencies) ||
    consumer.hdsDependencies.some(
      (name) => typeof name !== 'string' || !name.startsWith('@hashicorp/')
    ) ||
    !Array.isArray(consumer.expectedChecks) ||
    consumer.expectedChecks.some(
      (check) => typeof check !== 'string' || check.trim().length === 0
    )
  ) {
    throw new Error(
      `Invalid dependency or check declaration for ${consumer.id}.`
    );
  }

  if (
    !consumer.preview ||
    typeof consumer.preview !== 'object' ||
    Array.isArray(consumer.preview)
  ) {
    throw new Error(`Invalid preview declaration for ${consumer.id}.`);
  }

  for (const field of ['workflow', 'selector']) {
    const value = consumer.preview[field];

    if (
      value !== undefined &&
      (typeof value !== 'string' || value.trim().length === 0)
    ) {
      throw new Error(`Invalid preview ${field} for ${consumer.id}.`);
    }
  }
}

function isExpectedRepository(pr) {
  return (
    pr.base?.repo?.full_name === 'hashicorp/design-system' &&
    pr.head?.repo?.full_name === 'hashicorp/design-system'
  );
}

function publicSummary({ candidateState, consumers }) {
  const verifiedProductionPreviewCount = consumers.filter(
    ({ preview }) => preview.verified
  ).length;

  return {
    candidate: candidateState,
    consumers: consumers.length,
    productionPreviewsVerified: verifiedProductionPreviewCount,
    state: 'planning',
    products: consumers
      .filter(({ publicName }) => publicName !== undefined)
      .map(({ publicName }) => ({ name: publicName, state: 'not-validated' })),
  };
}

export function selectConsumers(config, projectIds = []) {
  if (
    !config ||
    typeof config !== 'object' ||
    Array.isArray(config) ||
    !Array.isArray(config.consumers)
  ) {
    throw new Error('Configuration must contain a consumers array.');
  }

  for (const consumer of config.consumers) {
    validateConsumer(consumer);
  }

  if (
    new Set(config.consumers.map(({ id }) => id)).size !==
    config.consumers.length
  ) {
    throw new Error('Consumer ids must be unique.');
  }

  for (const id of projectIds) {
    if (!config.consumers.some((consumer) => consumer.id === id)) {
      throw new Error(`Unknown project id: ${id}`);
    }
  }

  return config.consumers.filter(
    ({ id }) => projectIds.length === 0 || projectIds.includes(id)
  );
}

export async function buildPlan({
  pullRequestNumber,
  config,
  github,
  projectIds = [],
}) {
  if (!Number.isSafeInteger(pullRequestNumber) || pullRequestNumber < 1) {
    throw new Error('Pull request number must be a positive integer.');
  }

  const selectedConsumers = selectConsumers(config, projectIds);
  const pr = await github.getPullRequest(pullRequestNumber);

  if (pr.state !== 'open' || pr.merged_at) {
    throw new Error('Smoke-test planning requires an open, unmerged candidate PR.');
  }

  if (!isExpectedRepository(pr) || pr.base.ref !== 'main') {
    throw new Error(
      'Candidate validation requires a PR from hashicorp/design-system targeting main.'
    );
  }

  if (!/^[0-9a-f]{40,64}$/i.test(pr.head.sha ?? '')) {
    throw new Error('Candidate PR contains an invalid source commit SHA.');
  }

  const candidatePackages = await github.getPublishedCandidatePackages(
    pullRequestNumber,
    pr.head.sha
  );

  const packagesByName = new Map(
    candidatePackages.map((item) => [item.name, item])
  );

  if (packagesByName.size !== candidatePackages.length) {
    throw new Error('Candidate publication contains duplicate package names.');
  }

  const blockers = [
    'The consumer draft PR has not been opened; collect CI and preview evidence after it is created.',
  ];

  if (selectedConsumers.length === 0) {
    blockers.push('No consumer repositories are configured.');
  }

  const consumerSnapshots = await Promise.all(
    selectedConsumers.map((consumer) =>
      github.getConsumerSnapshot(
        consumer.repository,
        consumer.packageRoot,
        consumer.hdsDependencies
      )
    )
  );

  const consumers = selectedConsumers.map((consumer, index) => {
    const snapshot = consumerSnapshots[index];
    const dependencies = consumer.hdsDependencies.map((name) => {
      const releasePackage = packagesByName.get(name);
      const installed = snapshot.dependencies[name];
      const lockMatchesManifest =
        installed.lockfile?.specifier === installed.declaredVersion;

      if (!installed.declaredVersion) {
        blockers.push(`${consumer.id}: ${name} is not declared in the app manifest.`);
      }

      if (!snapshot.lockfile || !installed.lockfile?.resolvedVersion) {
        blockers.push(
          `${consumer.id}: no supported locked resolution was found for ${name}.`
        );
      } else if (!lockMatchesManifest) {
        blockers.push(
          `${consumer.id}: the lockfile specifier for ${name} does not match the app manifest.`
        );
      }

      return {
        name,
        declaredVersion: installed.declaredVersion,
        resolvedVersion: installed.lockfile?.resolvedVersion ?? null,
        lockfileSpecifier: installed.lockfile?.specifier ?? null,
        releaseVersion: releasePackage?.version ?? null,
        candidateVersion: releasePackage?.candidateVersion ?? null,
      };
    });

    const previewConfigured = Boolean(
      consumer.preview.workflow && consumer.preview.selector
    );

    if (dependencies.length === 0) {
      blockers.push(
        `${consumer.id}: none of its configured HDS dependencies are in this release.`
      );
    }

    if (consumer.expectedChecks.length === 0) {
      blockers.push(`${consumer.id}: no required CI checks are configured.`);
    }

    if (!previewConfigured) {
      blockers.push(
        `${consumer.id}: production-build preview evidence is not configured and verified.`
      );
    } else {
      blockers.push(
        `${consumer.id}: production preview readiness and human approval have not been verified.`
      );
    }

    return {
      id: consumer.id,
      publicName: consumer.publicName,
      repository: consumer.repository,
      targetRef: 'main',
      baseSha: snapshot.commitSha,
      packageRoot: consumer.packageRoot,
      packageManager: snapshot.packageManager,
      lockfile: snapshot.lockfile,
      dependencies,
      expectedChecks: consumer.expectedChecks,
      preview: {
        workflow: consumer.preview.workflow ?? null,
        selector: consumer.preview.selector ?? null,
        verified: false,
      },
    };
  });

  return {
    mode: 'dry-run',
    candidateSource: {
      repository: 'hashicorp/design-system',
      pullRequest: pullRequestNumber,
      title: pr.title,
      baseRef: pr.base.ref,
      baseSha: pr.base.sha,
      sourceRef: pr.head.ref,
      sourceSha: pr.head.sha,
    },
    candidate: {
      state: 'published',
      verified: true,
      packages: candidatePackages.map(
        ({ name, version, candidateVersion }) => ({
          name,
          stagedVersion: version,
          candidateVersion,
          consumerValidationConfigured: selectedConsumers.some((consumer) =>
            consumer.hdsDependencies.includes(name)
          ),
        })
      ),
    },
    consumers,
    publicSummary: publicSummary({
      candidateState: 'published',
      consumers,
    }),
    blockers: [...new Set(blockers)],
    mutationCount: 0,
  };
}
