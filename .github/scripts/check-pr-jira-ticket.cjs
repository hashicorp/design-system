const fs = require('node:fs/promises');

const JIRA_LINE_PATTERN =
  /https:\/\/hashicorp\.atlassian\.net\/browse\/[A-Z][A-Z0-9_]*-\d+\b/i;

async function main() {
  const token = process.env.GITHUB_TOKEN;
  const eventPath = process.env.GITHUB_EVENT_PATH;
  const repository = process.env.GITHUB_REPOSITORY;

  if (!token || !eventPath || !repository) {
    throw new Error('Missing required GitHub Actions environment variables.');
  }

  const event = JSON.parse(await fs.readFile(eventPath, 'utf8'));
  const pullRequest = event.pull_request;

  if (!pullRequest) {
    console.log('No pull request found in event payload.');
    return;
  }

  if (pullRequest.user?.type === 'Bot') {
    console.log('Skipping Jira ticket check for bot-authored pull request.');
    return;
  }

  const [owner, repo] = repository.split('/');
  const authorLogin = pullRequest.user.login;
  const { isCodeowner, usedFallback } = await getIsCodeowner({
    owner,
    repo,
    ref: pullRequest.base.ref,
    authorLogin,
    token,
  });

  if (isCodeowner) {
    console.log(`Skipping Jira ticket check for codeowner ${authorLogin}.`);
    return;
  }

  const hasValidJiraTicket = JIRA_LINE_PATTERN.test(pullRequest.body ?? '');

  if (hasValidJiraTicket) {
    console.log('Valid Jira ticket found in PR body.');
    return;
  }

  const fallbackSuffix = usedFallback
    ? ' Codeowner detection could not be verified for this run, so the check was applied.'
    : '';

  throw new Error(
    'The PR description is missing a valid Jira ticket link or still contains the `HDS-XXX` placeholder. ' +
      'Please update the PR body to include a link to a Jira ticket.' +
      fallbackSuffix,
  );
}

async function getIsCodeowner({ owner, repo, ref, authorLogin, token }) {
  try {
    const owners = await getCodeowners({ owner, repo, token, ref });
    const result = await isAuthorCodeowner({ authorLogin, owners, token });

    return {
      ...result,
      usedFallback: false,
    };
  } catch (error) {
    console.warn('Falling back to non-codeowner behavior because CODEOWNERS lookup failed.');
    console.warn(error);

    return {
      isCodeowner: false,
      usedFallback: true,
    };
  }
}

async function getCodeowners({ owner, repo, token, ref }) {
  const response = await githubRequest({
    path: `/repos/${owner}/${repo}/contents/.github/CODEOWNERS?ref=${encodeURIComponent(ref)}`,
    token,
  });
  const content = Buffer.from(response.content, 'base64').toString('utf8');

  const users = new Set();
  const teams = [];

  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) {
      continue;
    }

    const segments = line.split(/\s+/).slice(1);

    for (const segment of segments) {
      if (!segment.startsWith('@')) {
        continue;
      }

      const ownerReference = segment.slice(1);

      if (ownerReference.includes('/')) {
        const [org, slug] = ownerReference.split('/');

        if (org && slug) {
          teams.push({ org, slug });
        }
      } else if (ownerReference) {
        users.add(ownerReference);
      }
    }
  }

  return {
    users,
    teams,
  };
}

async function isAuthorCodeowner({ authorLogin, owners, token }) {
  if (owners.users.has(authorLogin)) {
    return { isCodeowner: true };
  }

  for (const team of owners.teams) {
    try {
      const response = await githubRequest({
        path: `/orgs/${team.org}/teams/${team.slug}/memberships/${authorLogin}`,
        token,
      });

      if (response.state === 'active') {
        return { isCodeowner: true };
      }
    } catch (error) {
      if (error.status === 404 || error.status === 403) {
        continue;
      }

      throw error;
    }
  }

  return { isCodeowner: false };
}

async function githubRequest({ method = 'GET', path, token, body }) {
  const response = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'hds-pr-jira-ticket-check',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const error = new Error(`GitHub API request failed with status ${response.status}.`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});