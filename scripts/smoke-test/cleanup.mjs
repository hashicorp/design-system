import { selectConsumers } from './plan.mjs';
import { consumerTargetRef } from './target-ref.mjs';

export function smokeTestIdentity(pullRequestNumber, consumerId) {
  if (
    !Number.isSafeInteger(pullRequestNumber) ||
    pullRequestNumber < 1 ||
    !/^[a-z0-9-]+$/.test(consumerId)
  ) {
    throw new Error('Invalid smoke-test PR identity.');
  }

  return {
    branch: `hds-smoke-test/pr-${pullRequestNumber}/${consumerId}`,
    marker: `<!-- hds-smoke-test:hashicorp/design-system#${pullRequestNumber}:${consumerId} -->`,
  };
}

function isSmokeTest(pr, consumer, identity) {
  return (
    Number.isSafeInteger(pr.number) &&
    pr.number > 0 &&
    pr.state === 'open' &&
    !pr.merged_at &&
    pr.draft === true &&
    pr.base?.ref === consumerTargetRef(consumer) &&
    pr.base?.repo?.full_name === consumer.repository &&
    pr.head?.repo?.full_name === consumer.repository &&
    pr.head?.ref === identity.branch &&
    typeof pr.body === 'string' &&
    pr.body.split(/\r?\n/).includes(identity.marker)
  );
}

export async function cleanupSmokeTests({
  pullRequestNumber,
  config,
  github,
  projectIds = [],
  dryRun = true,
}) {
  if (!Number.isSafeInteger(pullRequestNumber) || pullRequestNumber < 1) {
    throw new Error('Pull request number must be a positive integer.');
  }

  const consumers = selectConsumers(config, projectIds);
  const targets = [];

  for (const consumer of consumers) {
    const identity = smokeTestIdentity(pullRequestNumber, consumer.id);
    const prs = await github.getSmokeTestPullRequests(
      consumer.repository,
      identity.branch,
      consumerTargetRef(consumer)
    );

    for (const pr of prs) {
      if (isSmokeTest(pr, consumer, identity)) {
        targets.push({ consumer, identity, number: pr.number });
      } else {
        throw new Error(
          `${consumer.id}: PR #${pr.number} uses the smoke-test branch but does not match the cleanup identity; refusing cleanup.`
        );
      }
    }
  }

  const results = [];

  for (const { consumer, identity, number } of targets) {
    let action = 'would-close';

    if (!dryRun) {
      const live = await github.getConsumerPullRequest(consumer.repository, number);

      if (!isSmokeTest(live, consumer, identity) || live.number !== number) {
        throw new Error(
          `${consumer.id}: PR #${number} changed before cleanup; stopped after closing ${results.length} PR(s).`
        );
      }

      await github.closeConsumerPullRequest(consumer.repository, number);
      action = 'closed';
    }

    results.push({
      project: consumer.id,
      repository: consumer.repository,
      pullRequest: number,
      action,
    });
  }

  return {
    mode: dryRun ? 'dry-run' : 'cleanup',
    candidatePullRequest: pullRequestNumber,
    projects: consumers.map(({ id }) => id),
    pullRequests: results,
    mutationCount: dryRun ? 0 : results.length,
  };
}
