const fs = require('node:fs/promises');

const JIRA_LINE_PATTERN =
  /https:\/\/hashicorp\.atlassian\.net\/browse\/[A-Z][A-Z0-9_]*-\d+\b/i;

function logCodeowner(message, details) {
  if (details === undefined) {
    console.log(`[codeowner-check] ${message}`);
    return;
  }

  console.log(`[codeowner-check] ${message}`, details);
}

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

  const authorLogin = pullRequest.user.login;
  logCodeowner('Starting codeowner check.', {
    authorLogin,
    repository,
    baseRef: pullRequest.base?.ref,
  });

  const { isCodeowner, usedFallback } = await getIsCodeowner({
    repository,
    ref: pullRequest.base.ref,
    authorLogin,
    token,
  });

  logCodeowner('Codeowner check completed.', {
    authorLogin,
    isCodeowner,
    usedFallback,
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

async function getIsCodeowner({ repository, ref, authorLogin, token }) {
  try {
    logCodeowner('Resolving CODEOWNERS for repository.', {
      repository,
      ref,
      authorLogin,
    });

    const owners = await getCodeowners({ repository, token, ref });
    logCodeowner('Resolved CODEOWNERS entries.', {
      userCount: owners.users.size,
      users: Array.from(owners.users),
      teamCount: owners.teams.length,
      teams: owners.teams.map((team) => `${team.org}/${team.slug}`),
    });

    const result = await isAuthorCodeowner({ authorLogin, owners, token });

    logCodeowner('Finished evaluating CODEOWNERS membership.', {
      authorLogin,
      result,
    });

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

async function getCodeowners({ repository, token, ref }) {
  const [owner, repo] = repository.split('/');

  if (!owner || !repo) {
    throw new Error(`Invalid repository value: ${repository}`);
  }

  logCodeowner('Fetching CODEOWNERS file.', {
    repository,
    ref,
  });

  const response = await githubRequest({
    path: `/repos/${owner}/${repo}/contents/.github/CODEOWNERS?ref=${encodeURIComponent(ref)}`,
    token,
  });
  const content = Buffer.from(response.content, 'base64').toString('utf8');

  logCodeowner('Fetched CODEOWNERS file contents.', {
    size: content.length,
  });

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
          logCodeowner('Parsed team CODEOWNER entry.', `${org}/${slug}`);
        }
      } else if (ownerReference) {
        users.add(ownerReference);
        logCodeowner('Parsed user CODEOWNER entry.', ownerReference);
      }
    }
  }

  return {
    users,
    teams,
  };
}

async function isAuthorCodeowner({ authorLogin, owners, token }) {
  logCodeowner('Checking direct user ownership match.', {
    authorLogin,
    directMatch: owners.users.has(authorLogin),
  });

  if (owners.users.has(authorLogin)) {
    logCodeowner('Author matched direct user CODEOWNER entry.', authorLogin);
    return { isCodeowner: true };
  }

  for (const team of owners.teams) {
    try {
      logCodeowner('Checking team membership.', {
        authorLogin,
        team: `${team.org}/${team.slug}`,
      });

      const response = await githubRequest({
        path: `/orgs/${team.org}/teams/${team.slug}/memberships/${authorLogin}`,
        token,
      });

      logCodeowner('Received team membership response.', {
        authorLogin,
        team: `${team.org}/${team.slug}`,
        state: response?.state,
      });

      if (response.state === 'active') {
        logCodeowner('Author matched team CODEOWNER entry.', {
          authorLogin,
          team: `${team.org}/${team.slug}`,
        });
        return { isCodeowner: true };
      }
    } catch (error) {
      logCodeowner('Team membership lookup failed.', {
        authorLogin,
        team: `${team.org}/${team.slug}`,
        status: error.status,
        message: error.message,
      });

      if (error.status === 404 || error.status === 403) {
        continue;
      }

      throw error;
    }
  }

  logCodeowner('Author was not found in any CODEOWNER entry.', {
    authorLogin,
  });

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