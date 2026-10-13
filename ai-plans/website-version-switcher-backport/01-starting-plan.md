# Verifying the backport assumption

## Problem

Validate that commit `a74c3813c96e2c7235168a62f7fb161ca99bfa39` can be cherry-picked onto older documentation versions and
re-deployed so archived sites (e.g. `hds-website-6-4-0.vercel.app`) gain the version
switcher, repointing the existing alias at the new build.

Preference: do this **locally** where possible, without opening PRs.

The assumption is broadly correct. Several things would bite during the real flow, one of
which is destructive — and is *more* exposed when run locally.

---

## The chosen route: push a branch, dispatch the workflow from the UI

This is the better option — the workflow was built for exactly this, and it sidesteps the
Vercel CLI linking problems of a purely local deploy.

**How it knows which URL to generate:** not from the branch name. The alias comes from
`package.json` on whatever ref you select:

```yaml
VERSION=$(jq -r .version packages/components/package.json | sed 's/\./-/g')
# …
-d "{\"alias\": \"hds-website-${{ env.VERSION }}.vercel.app\", …}"
```

So on a branch cut from the 6.4.0 tag: `6.4.0` → `6-4-0` → **`hds-website-6-4-0.vercel.app`**,
automatically. Nothing to configure, nothing to pass in.

The two inputs have cleanly separated jobs:

| Input | Source | Used for |
| --- | --- | --- |
| `BRANCH_NAME` | `github.ref` (UI selection) | finding the Vercel deployment via `meta.githubCommitRef` |
| `VERSION` | `packages/components/package.json` | naming the alias |

This is also why a **local** `vercel deploy` would *not* work with this workflow: such a
deployment carries no `meta.githubCommitRef`, so the lookup finds nothing. Pushing a real
branch is what makes the workflow usable.

Flow: cut branch from tag → cherry-pick → fix `CURRENT_VERSION` → **strip `algolia:index`
from `vercel.json`** (see finding 2) → push → wait for the Vercel deployment → dispatch the
workflow on that branch → verify the alias by hand.

Branch names with slashes are fine (`refs/heads/backport/x` → `backport/x`, which is what
Vercel records).

---

## Findings

### 1. No tag work is needed — and the tags must NOT be touched

`create-vercel-alias.yml` never reads git tags. Two inputs only:

- `BRANCH_NAME` — from `github.ref`, used to find the deployment via
  `select(.meta.githubCommitRef == $branch)`
- `VERSION` — from `packages/components/package.json` at the checked-out ref, used to
  build `hds-website-$VERSION.vercel.app`

Verified: at tag `@hashicorp/design-system-components@6.4.0`, `package.json` is `6.4.0`,
so a branch from that tag yields exactly `hds-website-6-4-0.vercel.app`.

**Cut a branch from the tag; leave the tag alone.** Tags mark what was published to npm;
moving one misrepresents a published artifact. Aliases are overridable (per internal docs),
so no deletion step is needed.

### 2. `algolia:index` is destructive — and local runs are *more* exposed

`website/vercel.json` (same at the 6.4.0 tag):

```
"buildCommand": "pnpm -F website build && pnpm -F website algolia:index"
```

`docs-scraper/index-website-content.mjs` has `const DEV_SKIP_API_CALLS = false;` — a
**hardcoded constant, not environment-driven**. It unconditionally calls
`algoliaIndex.clearObjects()` then re-indexes.

Local `.env` contains `ALGOLIA_API_KEY_ADMIN` and `ALGOLIA_INDEX_ID`. So there is no
sandbox locally: on Vercel, Preview *might* be isolated by per-environment variables; on a
laptop it points wherever `.env` points, with an admin key.

The safe/unsafe split is precise:

| Command | Runs `algolia:index`? |
| --- | --- |
| `pnpm -F website build` | **No** — safe |
| `vercel build` / `vercel deploy` | **Yes** — honours `vercel.json` buildCommand |
| `pnpm -F website algolia:index` | **Yes** |

Plain local builds are fine. Anything driven by `vercel.json` is not, unless the
buildCommand is temporarily stripped on the throwaway branch.

**Mitigation that makes the push-a-branch route safe regardless of Vercel's env config:**
on the backport branch, edit `vercel.json` to drop `&& pnpm -F website algolia:index`:

```json
"buildCommand": "pnpm -F website build"
```

Vercel reads `vercel.json` from the ref being deployed, so this takes effect for that
deployment only. It is also semantically right — an archived snapshot has no business
rebuilding the live search index. This removes the need to audit Vercel's environment
variables at all.

### 3. The archived behaviour can be tested entirely locally (hosts file)

The runtime check is `/^hds-website-\d+-\d+-\d+\.vercel\.app$/` against
`window.location.hostname` — nothing else. So mapping that hostname to localhost makes the
real archived code path execute locally:

```
127.0.0.1  hds-website-6-4-0.vercel.app
```

Serve the built app on port 80 under that name and the component takes the archived
branch and performs the genuine cross-origin fetch to `helios.hashicorp.design`,
exercising CORS for real. This validates the behaviour with **zero deployments and zero
risk** — and is strictly better evidence than a preview deployment, which cannot test it
at all (see 4).

### 4. A preview/branch deployment cannot test the archived path

- branch preview → `hds-website-git-<branch>-hashicorp.vercel.app` → **no regex match** →
  reads its own local JSON
- after aliasing → `hds-website-6-4-0.vercel.app` → **match** → fetches canonical

The *same build* behaves differently by hostname, so only the aliased URL exercises the
real path. This is why the hosts-file test carries the weight.

### 5. `CURRENT_VERSION` makes the cherry-pick clean but wrong

The commit applies without conflict, but `CURRENT_VERSION = '6.5.0'` is hardcoded — a
6.4.0 backport would display **"v6.5.0"**. No test or linter catches it.

Each backport needs a manual edit. Deriving it from `packages/components/package.json`
would remove the footgun and make the commit truly identical across versions — worth
considering before backporting to several versions.

### 6. The alias workflow can silently no-op

`sed 's|refs/heads/||'` only strips a branch prefix, so dispatching on a **tag** leaves
`refs/tags/…`, matches no deployment, and `DEPLOYMENT_ID` ends up empty. The final step is
a bare `curl -X POST` with no `-f` and no guard, so the URL becomes
`/v2/deployments//aliases`, curl exits `0`, and **the run goes green having done nothing**.

Also: the deployments query reads one page and takes `head -n 1`, so run it promptly after
the deployment lands.

Note: a locally-created deployment (`vercel deploy`) has no `meta.githubCommitRef`, so the
workflow cannot find it. Going fully local means aliasing directly via `vercel alias set`
or the same `POST /v2/deployments/<id>/aliases` call the workflow makes.

### 7. Sequencing

`helios.hashicorp.design/doc-versions.json` currently returns the 1 MB `_empty.html` shell
with a `200`. Until PR #4166 merges, any archived-path test shows an empty list and proves
nothing. **Merge first, then test.**

Minor: on an archived deployment the cherry-picked `doc-versions.json` and the
`vercel.json` CORS header are inert — the archived site only ever *fetches* from canonical.
Only the canonical deployment needs them.

---

## Proposed verification, cheapest first

1. **Local cherry-pick dry run** — branch from the 6.4.0 tag, cherry-pick, fix
   `CURRENT_VERSION`, strip `algolia:index` from `vercel.json`, run `pnpm -F website build`
   (not `vercel build`). Answers "does it apply and still build?" with no network and no
   Algolia exposure. Nothing pushed yet.
2. **Merge PR #4166** so the canonical JSON actually exists.
3. **Local hosts-file test of the archived path** — the decisive functional check
   (finding 3). Depends on step 2.
4. **Push the branch and dispatch the workflow** — the real thing, since by this point the
   code, the build and the runtime behaviour have all been proven locally. Verify the alias
   by hand afterwards (finding 6).

Dropped from the earlier draft:

- *Auditing Algolia env separation in Vercel* — unnecessary once the buildCommand is
  stripped on the branch (finding 2).
- *The `0.0.0` alias rehearsal* — still available if the alias mechanics feel risky, but
  largely redundant now that the hosts-file test covers the runtime behaviour and the
  alias step is overridable anyway. Keep it in reserve.

Todos tracked in SQL.

---

## Open questions

- Will an old branch still build on current Node/pnpm? Step 1 answers this locally.
- Is the Vercel CLI installed/linked for this monorepo? Local `vercel deploy` may need
  project linking and is the fiddliest part of the local route.
- Worth hardening the workflow with a `-z "$DEPLOYMENT_ID"` guard + `curl -f`? It
  currently cannot report its own failure.
