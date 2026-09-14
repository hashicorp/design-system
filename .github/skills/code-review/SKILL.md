---
name: code-review
description: "Skill to review code changes in the repository and provide constructive feedback."
---

Read the skill file `.bob/skills/code-review/SKILL.md` and implement this skill.

If this skill is being run by GitHub Copilot on a PR review, follow the following rules:
- Adapt any local-only steps (e.g. running `git` commands) to GitHub PR review context by using the PR diff and repository file-reading/search tools instead.
- Do not use the `run-checks` skill referenced for checking for errors. Instead, check that all GitHub PR checks have passed successfully.
