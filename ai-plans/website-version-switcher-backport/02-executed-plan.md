# Version switcher backport: execution plan (EXECUTED 2026-10-13)

> Status: **COMPLETED on 2026-10-13.** All 10 archived sites (6.0.0 → 6.6.0) serve the version switcher. Tags were checked at every checkpoint (T0–T4, B0–B3) and never changed.
> Supersedes the procedure in `VERSION-SWITCHER-BACKPORT-PLAN.md`. That file stays unchanged for reference.
> Validated against the repo state on 2026-10-13.

## 1. Goal

Make each archived documentation site `https://hds-website-<X-Y-Z>.vercel.app` for the 10 versions listed in
`website/public/doc-versions.json` (`6.0.0` → `6.6.0`) show the version switcher from PR #4166 (commit `a74c381`).
Each site should:

- show **its own** version (e.g. `v6.1.0`),
- fetch the version list at runtime from `https://helios.hashicorp.design/doc-versions.json`, so it also lists versions released later.

The following must stay untouched:

- ❌ any git tag, locally or on `origin`
- ❌ `main` or any other existing branch
- ❌ any published npm artifact
- ❌ the Algolia search index
- ❌ the content of the archived docs, apart from the switcher

`7.0.0` is out of scope: it's the canonical site and already has the switcher.

## 2. Confirmed decisions

| # | Decision | Choice |
|---|---|---|
| D1 | What to backport | **Only** the version switcher: PR #4166, commit `a74c3813c96e2c7235168a62f7fb161ca99bfa39`. The global banner (#4195) is **not** backported. |
| D2 | `CURRENT_VERSION` (hardcoded `'7.0.0'` in the commit) | Edit it per branch in a **separate commit** |
| D3 | `algolia:index` in `website/vercel.json` | **Remove it** from `buildCommand` on every backport branch |
| D4 | Rollback | Record each alias's current deployment in the **Vercel dashboard** before changing it |
| D5 | Backport branches after use | **Delete** them once the alias is verified |
| D6 | Rollout | **Pilot `6.1.0`** end to end, **pause for review**, then the other 9 **as a batch** |
| D7 | Branch prefix | `website-archive/<x.y.z>` |
| D8 | Trial alias before the real one | **Yes**, on `hds-website-0-0-0.vercel.app`. It must match `/^hds-website-\d+-\d+-\d+\.vercel\.app$/`, otherwise the archived path (fetching the list from canonical) isn't exercised. A free-form name like `test-hds-website-….vercel.app` would only behave like the preview |
| D9 | Local builds in the batch | Only `6.0.0` (the only version with the classic `.ts`+`.hbs` popover) and `6.6.0` (newest). The other 7 rely on Vercel's build. That's safe because aliasing only happens once a deployment is **Ready** |
| D10 | Archived-site spot check | Nothing beyond the checks in step 2.7 |
| D11 | Keeping the old deployments | The old archived deployments are **Preview** (pre-production, 180-day retention). They're only kept because they hold the `hds-website-x-y-z` alias. Once the alias moves, Vercel deletes them, typically within days and at most ~30 days later, with a 30-day recovery period after that. Accepted: a **~1–2 month rollback window** is enough, so no "keep-alive" alias. The new deployments are kept because they hold the alias, so deleting the branches is safe |

## 3. What has been checked (read-only, 2026-10-13)

| Check | Result |
|---|---|
| `a74c381` identity | PR #4166 "Add HDS version to page header and version switcher popover". Parent `7cbbab6`. Touches 7 files under `website/` only: header `index.gts`, new `version-switcher.gts`, 2 SCSS files, `public/doc-versions.json`, `types/template-registry.ts`, `vercel.json` |
| Tags exist | All 10 `@hashicorp/design-system-components@6.x.y` tags exist locally and on `origin`, as annotated tags |
| Alias name derivation | `packages/components/package.json` version at each tag equals the tag version. The workflow will produce exactly `hds-website-6-1-0.vercel.app` etc. |
| Cherry-pick applies | Simulated in memory with `git merge-tree --merge-base=a74c381^ <tag> a74c381` (no refs, branches, tags or working tree touched): **clean on all 10 tags** |
| Code dependencies at old tags | `HdsPopoverPrimitive` is exported and supports `@enableSoftEvents` at all tags (6.0.0 has the classic `.ts`+`.hbs` version, 6.1.0+ has `.gts`). `ember-cli-fastboot`, header `index.gts`, `styles/doc-components/index.scss` and `types/template-registry.ts` exist at all tags |
| Node | `.nvmrc` is `v24` at all tags, the same as the workflow |
| Alias workflow at old tags | `create-vercel-alias.yml` exists at all tags. The only difference from `main` is the `actions/checkout` SHA pin. `workflow_dispatch` runs **the YAML from the selected branch**, i.e. the tag's version, which is fine |
| Canonical JSON | `https://helios.hashicorp.design/doc-versions.json` returns `200`, `application/json`, `access-control-allow-origin: *`. The old plan's "merge #4166 first" prerequisite is **already met** |
| Preview deployments are public | Branch preview URLs return `200` with no Vercel Authentication, so aliasing a preview deployment keeps the archived site public |
| GitHub Actions on branch push | `release.yml` runs **only** on push to `main`. `ci-*.yml` run on `main` and on PRs. Pushing a backport branch triggers **no** Actions, only the Vercel Git integration |
| Tag protection on GitHub | **No tag rulesets exist.** Nothing on the server stops a tag being moved or deleted, so **tag safety depends entirely on the guardrails in §4** |
| Branch rulesets | PR-required, no-deletion and no-force-push rules apply to `main`, `release/**/*`, `release-**`, `v**.**`, `hashicorp-main`, `ptfe-releases/**`. **Branch names must avoid these patterns.** Example: `version-switcher/6.1.0` would match `v**.**` and become undeletable |
| Local git config | No `push.followTags`, `push.default` or tag settings |
| Vercel CLI | Not installed or linked locally. The dashboard is used instead (D4) |
| HSTS | `*.vercel.app` sends `strict-transport-security: …; includeSubDomains; preload`, so the old plan's **hosts-file test can't work** (browsers force HTTPS). It's replaced by §6 step 2.5 |

## 4. Tag-safety guardrails (apply to every step)

1. **Forbidden commands, everywhere in this procedure:**
   - `git push --tags`, `--follow-tags`, `--mirror`, `--all`
   - `--force`, `-f`, `--force-with-lease`
   - any `git tag …` (create, `-d`, `-f`)
   - `git fetch --prune-tags`
   - `git push origin :<ref>` or `--delete` with anything other than a fully-qualified `refs/heads/website-archive/…`
2. **Fully-qualified refspecs only.** For example:
   - `git push origin refs/heads/website-archive/6.1.0:refs/heads/website-archive/6.1.0`
   - `git push origin --delete refs/heads/website-archive/6.1.0`

   A `refs/heads/…` ref can never resolve to a tag.
3. **Branch naming: `website-archive/<x.y.z>`.** This prefix matches no ruleset. It can't be confused with an `@hashicorp/…@x.y.z` tag. It starts with `w`, so it avoids `v**.**`.
4. **Create branches from the explicit tag ref:** `refs/tags/@hashicorp/design-system-components@<x.y.z>`. Creating a branch from a tag only reads the tag.
5. **Tag snapshots before and after each phase.** Save both to the session folder, not the repo:
   - `git ls-remote --tags origin`
   - `git show-ref --tags`

   They must be **byte-identical** at every checkpoint (`diff` exits `0`). If they differ, stop.
6. **Dispatch the alias workflow only on a branch, never on a tag.** On a tag it silently does nothing (see §7, R4).

## 5. Phase 0: Preparation (read-only, no remote changes)

- **0.1** In the main checkout, confirm a clean working tree and note the current branch. Nothing else in the main checkout changes; all work happens in a separate `git worktree` (§6).
- **0.2 Tag snapshot "T0".** `git ls-remote --tags origin > <session>/tags-remote-T0.txt` and `git show-ref --tags > <session>/tags-local-T0.txt`. Also check that the local and remote SHAs of the 10 tags match.
- **0.3 Vercel dashboard: rollback register.** For each alias in scope, note the deployment it currently points to (deployment URL/ID, creation date, git ref) in the table in §9. For the pilot, only `6.1.0` is required now.
- **0.4 Vercel dashboard: retention.** Check the website project's *Deployment Retention* settings, to confirm that deployments from **deleted branches** (D5) aren't removed. Aliased deployments are normally kept, but confirm it.
- **0.5 (optional)** Note which other Vercel projects build on push from this repo (e.g. showcase). They'll create harmless preview builds of the backport branches.

## 6. Phase 1–2: Pilot `6.1.0`

### Phase 1: Local (no network writes)

| Step | Action | Pass criteria |
|---|---|---|
| 1.1 | `git worktree add -b website-archive/6.1.0 ../hds-website-archive-6.1.0 refs/tags/@hashicorp/design-system-components@6.1.0` | Worktree created. `HEAD` is the tag's commit `69461f9efd…` |
| 1.2 | `git cherry-pick -x a74c3813c96e2c7235168a62f7fb161ca99bfa39` (`-x` records the source commit) | Applies with no conflicts |
| 1.3 | In `website/app/components/doc/version-switcher.gts`: `CURRENT_VERSION = '7.0.0'` → `'6.1.0'`. Commit separately, e.g. `Website / Archived 6.1.0: set version switcher CURRENT_VERSION` | One-line diff |
| 1.4 | In `website/vercel.json`: `buildCommand` → `"pnpm -F website build"` (drop `&& pnpm -F website algolia:index`). Commit separately | One-line diff |
| 1.5 | Review: `git log --oneline refs/tags/@hashicorp/design-system-components@6.1.0..HEAD` and `git diff --stat <tag>..HEAD` | Exactly 3 commits. Only the 7 files from #4166 change, plus nothing outside `website/`. `doc-versions.json` and the CORS header come along but have no effect on an archived site |
| 1.6 | In the worktree: `pnpm install --frozen-lockfile`, then `pnpm -F website build` (builds the packages, then the Ember app). **Never run `vercel build`/`deploy` or `algolia:index`** | Build succeeds |
| 1.7 | `pnpm -F website lint:types` (Glint) and `pnpm -F website lint:hbs` | No **new** errors compared with the tag (if the tag has existing ones, compare against the tag) |
| 1.8 | Run locally (`pnpm -F website start`, `localhost:4200`) | Header shows `v6.1.0`. Popover opens on hover/focus. It lists the versions from the **local** JSON (expected, because the hostname doesn't match). No console errors |
| 1.9 | Tag snapshot "T1" | Identical to T0 |

### Phase 2: Remote (first remote write)

| Step | Action | Pass criteria |
|---|---|---|
| 2.1 | `git push origin refs/heads/website-archive/6.1.0:refs/heads/website-archive/6.1.0` | New branch on `origin`. Output lists **only** this ref |
| 2.2 | GitHub → Actions | **No** workflow runs triggered |
| 2.3 | Tag snapshot "T2" | Identical to T0 |
| 2.4 | Vercel: wait for the website deployment of `website-archive/6.1.0` to reach **Ready** | Status is Ready, **not Error**. The build log shows **no** Algolia step |
| 2.5 | Open the preview URL (`hds-website-git-website-archive-6-1-0-hashicorp.vercel.app` or as shown) | 6.1.0 docs, header `v6.1.0`, popover works. In the DevTools console on this page, `await (await fetch('https://helios.hashicorp.design/doc-versions.json')).json()` returns the manifest. That proves cross-origin + CORS from a `*.vercel.app` origin, which is what the archived path does |
| 2.5a | **Trial alias (D8).** First check `https://hds-website-0-0-0.vercel.app` is unused (expect a Vercel `404 DEPLOYMENT_NOT_FOUND`); if it's taken, **stop and ask**. Then, in the Vercel dashboard, assign `hds-website-0-0-0.vercel.app` to the new 6.1.0 branch deployment. It matches the archived-hostname regex, so it runs the **real archived path** without touching the 6.1.0 alias. Verify, then **remove the trial alias** | Header `v6.1.0`. Network tab: `helios.hashicorp.design/doc-versions.json` → 200. Popover lists versions **fetched from canonical**, including `7.0.0`. No `Failed to load…` warning. After removal, the trial URL returns 404 again |
| 2.6 | Dispatch: GitHub → Actions → *Create Vercel Alias* → *Run workflow* → **Use workflow from: Branch `website-archive/6.1.0`**, or `gh workflow run create-vercel-alias.yml --ref website-archive/6.1.0`. Do this **soon after 2.4** (see R5) | Run is green **and** the log shows: `Branch Name: website-archive/6.1.0`, plus a curl response containing `"alias":"hds-website-6-1-0.vercel.app"` with no `"error"` |
| 2.7 | Verify `https://hds-website-6-1-0.vercel.app` (hard reload or private window) | Header `v6.1.0`. Popover lists versions **from canonical** (Network tab: `helios.hashicorp.design/doc-versions.json` → 200, including `7.0.0`). No `Failed to load…` console warning. Content is still 6.1.0 (spot-check a few pages, search, a component page). In the Vercel dashboard, the alias now points to the new deployment |
| 2.8 | Tag snapshot "T3" | Identical to T0 |
| 2.9 | Clean up (D5): `git push origin --delete refs/heads/website-archive/6.1.0`, then `git worktree remove ../hds-website-archive-6.1.0`, then `git branch -D website-archive/6.1.0` | Branch is gone. **The alias still serves the new build** (re-check 2.7) |
| 2.10 | Tag snapshot "T4" | Identical to T0 |
| ⏸ | **PAUSE: your review and go/no-go for Phase 3** | |

**Rollback for 6.1.0 (at any point after 2.6).** The Vercel dashboard **can't** attach a `*.vercel.app` alias to a specific deployment; only the CLI and REST API can. Two options:
- **Exact, while the old deployment still exists (~1–2 months, D11):** `npx vercel alias set hds-website-isl0j1hj2-hashicorp.vercel.app hds-website-6-1-0.vercel.app --scope hashicorp`, run from outside the repo after `npx vercel login`.
- **GitHub-only, any time:** create `website-archive/6.1.0-rollback` from the tag, with only the `algolia:index` removal commit. Push it, wait for Ready, then dispatch the alias workflow on it. That rebuilds and re-aliases the original 6.1.0 docs, without the switcher.

**Trial alias (2.5a): skipped** (decided 2026-10-13). It needed the CLI. The archived path was verified directly on the real alias in 2.7 instead.

## 7. Risks and mitigations

| ID | Risk | Mitigation |
|---|---|---|
| R1 | Moving or deleting a tag (no server-side protection) | §4 guardrails, fully-qualified refspecs, snapshots at T0–T4 |
| R2 | Algolia index wiped or overwritten (`clearObjects()` runs unconditionally) | D3: `algolia:index` removed from `vercel.json` on each branch (Vercel reads `vercel.json` from the deployed ref). Never run `vercel build`/`deploy` or `algolia:index` locally. Check the build log in 2.4 |
| R3 | Wrong version shown (`v7.0.0`) | D2: separate per-branch commit. Checked in 1.8, 2.5 and 2.7 |
| R4 | Workflow "succeeds" but does nothing: empty `DEPLOYMENT_ID` → `POST /v2/deployments//aliases`, curl exits `0` | Check the run log as in 2.6. Never dispatch on a tag |
| R5 | Workflow aliases the **wrong or failed** deployment: it reads one page of `v6/deployments` (default ~20), takes the first match by branch **without checking state**, so an `ERROR` or `BUILDING` deployment could be aliased | Dispatch only after the branch deployment is **Ready** (2.4), and do it promptly. Push once per branch (no extra commits after the deploy). In Phase 3, process branches one at a time from 2.4 to 2.7 |
| R6 | Old tag doesn't build anymore (registry, lockfile) | Local build in 1.6 first. Vercel build is checked in 2.4. A failed build never reaches the alias, thanks to the R5 mitigation |
| R7 | A deleted branch's deployment gets removed by retention → the alias breaks | Check 0.4. Re-check the alias after deletion (2.9) |
| R8 | Ruleset lock on the branch name | `website-archive/` prefix (§4.3) |
| R9 | Accidental changes in the main checkout | All work happens in a separate `git worktree` |

## 8. Phase 3: Batch for the remaining 9 (after approval)

Versions: `6.0.0, 6.1.1, 6.2.0, 6.2.1, 6.3.0, 6.4.0, 6.5.0, 6.5.1, 6.6.0`.

- **3.0** Tag snapshot "B0". Fill in §9 for all 9 aliases (Vercel dashboard).
- **3.1 Local, for all 9:** steps 1.1–1.5 for each version, with `CURRENT_VERSION` set to that version, **plus the Glint 1 signature fix as a 4th commit** (found in the pilot: drop `Args` from the signature and type the constructor `args` as `Record<string, never>`). First check which Glint version each tag uses; the fix is only needed where it's Glint 1.x. Run the full local build and Glint (1.6–1.7) **only for `6.0.0` and `6.6.0`** (D9). The other 7 rely on the Vercel build, checked in 2.4.
- **3.2** Tag snapshot "B1" equals B0.
- **3.3 Remote, one version at a time:** run steps 2.1 → 2.4 → 2.6 → 2.7 per version before moving to the next (R5). You can push all branches first, but **dispatch each one only once its own deployment is Ready**.
- **3.4** Tag snapshot "B2" equals B0.
- **3.5** Delete all 9 branches and worktrees (as in 2.9). Re-check all 10 aliases.
- **3.6** Final tag snapshot "B3" equals B0.

## 9. Rollback register (fill in during 0.3 / 3.0)

| Version | Alias | Previous deployment (before change) | New deployment | Verified | Branch deleted |
|---|---|---|---|---|---|
| 6.0.0 | hds-website-6-0-0.vercel.app | `https://hds-website-qo84mxr2p-hashicorp.vercel.app/` = `dpl_3bCzmZpw9f5HQKiRC9RaNRv7anUH` (Preview; deleted by retention ~1–2 months after 2026-10-13) | `dpl_FLQ4BRMiXZ9U8EDuZRi9RG42Re8g` = `https://hds-website-itjmbap2e-hashicorp.vercel.app` (workflow run 38423059762) | ✅ 2026-10-13: `v6.0.0`, list fetched from canonical (200), 11 versions, no console warnings | ✅ remote + local + worktree; alias still serves the new build |
| 6.1.0 | hds-website-6-1-0.vercel.app | `https://hds-website-isl0j1hj2-hashicorp.vercel.app/` = `dpl_EF1bSWSKf2iHVZduf11uEhMSBPME` (Preview, created 2025-03-09; deleted by retention ~1–2 months after 2026-10-13) | `dpl_9BWuQUJtpmuPX9FnGwmc3Wp8Janx` = `https://hds-website-80uhnxk0v-hashicorp.vercel.app` (workflow run 38420260881) | ✅ 2026-10-13: `v6.1.0`, list fetched from canonical (200), 11 versions, no console warnings | ✅ remote + local + worktree; alias still serves the new build |
| 6.1.1 | hds-website-6-1-1.vercel.app | `https://hds-website-270guahuy-hashicorp.vercel.app/` = `dpl_66K4ureRSUPG8rGuatyjE12RNwpb` (Preview; deleted by retention ~1–2 months after 2026-10-13) | `dpl_HbmN9a262BuTbaCB3zEyno6EieNi` = `https://hds-website-76o62okwb-hashicorp.vercel.app` (workflow run 38423808268) | ✅ 2026-10-13: `v6.1.1`, list fetched from canonical (200), 11 versions, no console warnings | ✅ remote + local + worktree; alias still serves the new build |
| 6.2.0 | hds-website-6-2-0.vercel.app | `https://hds-website-nwfe5t03t-hashicorp.vercel.app/` = `dpl_3PCXtEg5DNLSreZqjbboZTHitwwJ` (Preview; deleted by retention ~1–2 months after 2026-10-13) | `dpl_EAAPztKw4kQGFw1hbBJNKYdHAYX4` = `https://hds-website-mp09arrp8-hashicorp.vercel.app` (workflow run 38424481074) | ✅ 2026-10-13: `v6.2.0`, list fetched from canonical (200), 11 versions, no console warnings | ✅ remote + local + worktree; alias still serves the new build |
| 6.2.1 | hds-website-6-2-1.vercel.app | `https://hds-website-ef2cxtl6o-hashicorp.vercel.app/` = `dpl_3L2ZCrMAL93ynLAV4Ko63srD4iUt` (Preview; deleted by retention ~1–2 months after 2026-10-13) | `dpl_7kcUduHKjcSkQ9xBbS9MA8bUAAr3` = `https://hds-website-qs49110sx-hashicorp.vercel.app` (workflow run 38427330642) | ✅ 2026-10-13: `v6.2.1`, list fetched from canonical (200), 11 versions, no console warnings | ✅ remote + local + worktree; alias still serves the new build |
| 6.3.0 | hds-website-6-3-0.vercel.app | `https://hds-website-ltzsoebs4-hashicorp.vercel.app/` = `dpl_9CxKL2JHLAFHK1ZuYMXTu4CAMNm2` (Preview; deleted by retention ~1–2 months after 2026-10-13) | `dpl_DYgWAWwrYewKkgudhcGA5pbnmEEQ` = `https://hds-website-2g0qjglx0-hashicorp.vercel.app` (workflow run 38427998636) | ✅ 2026-10-13: `v6.3.0`, list fetched from canonical (200), 11 versions, no console warnings | ✅ remote + local + worktree; alias still serves the new build |
| 6.4.0 | hds-website-6-4-0.vercel.app | `https://hds-website-r17m7dspk-hashicorp.vercel.app/` = `dpl_YxBfST3NbheGsioEjdPixYVCeBhu` (Preview; deleted by retention ~1–2 months after 2026-10-13) | `dpl_9pP3aQwoNymi6V53QjGwt38AYM2N` = `https://hds-website-dh0wc99bn-hashicorp.vercel.app` (workflow run 38428650530) | ✅ 2026-10-13: `v6.4.0`, list fetched from canonical (200), 11 versions, no console warnings | ✅ remote + local + worktree; alias still serves the new build |
| 6.5.0 | hds-website-6-5-0.vercel.app | `https://hds-website-8mv15i28w-hashicorp.vercel.app/` = `dpl_7Wb7QHpTnauEFGWXgfefdxcZpqye` (Preview; deleted by retention ~1–2 months after 2026-10-13) | `dpl_4P9d9p3VRykxrijwmKL7tWKQLDwN` = `https://hds-website-ne5nd6g65-hashicorp.vercel.app` (workflow run 38429307692) | ✅ 2026-10-13: `v6.5.0`, list fetched from canonical (200), 11 versions, no console warnings | ✅ remote + local + worktree; alias still serves the new build |
| 6.5.1 | hds-website-6-5-1.vercel.app | `https://hds-website-1gc0dlk9b-hashicorp.vercel.app/` = `dpl_2uxkcz4T3P33meFroFgguKyCx4vt` (Preview; deleted by retention ~1–2 months after 2026-10-13) | `dpl_31fiFP1v5uEGeque3ZcbLJ1bj5Ba` = `https://hds-website-jopjjrjvo-hashicorp.vercel.app` (workflow run 38429966656) | ✅ 2026-10-13: `v6.5.1`, list fetched from canonical (200), 11 versions, no console warnings | ✅ remote + local + worktree; alias still serves the new build |
| 6.6.0 | hds-website-6-6-0.vercel.app | `https://hds-website-38niaind1-hashicorp.vercel.app/` = `dpl_GVDEhMwZWXY3z6aPpqsT9RipbTtp` (Preview; deleted by retention ~1–2 months after 2026-10-13) | `dpl_BLk19r6pNKoLJKxqsULnz2HBmkXz` = `https://hds-website-bpkh14ikr-hashicorp.vercel.app` (workflow run 38430838112) | ✅ 2026-10-13: `v6.6.0`, list fetched from canonical (200), 11 versions, no console warnings | ✅ remote + local + worktree; alias still serves the new build |

## 10. Out of scope / suggested follow-ups (separate PRs, not part of this run)

- **Harden `create-vercel-alias.yml` on `main`**: fail when `DEPLOYMENT_ID` is empty, use `curl -f`, filter `state == "READY"`, and fail when dispatched on a tag. Note: it would only help future releases unless also cherry-picked onto backport branches, because `workflow_dispatch` uses the YAML from the selected ref.
- **Add a GitHub tag ruleset** that blocks update and deletion of `refs/tags/@hashicorp/*` (needs a repo admin). This would turn R1 from "procedural" into "enforced".
- Remove the hardcoded `CURRENT_VERSION` on `main` for future releases.

## 11. Open points for your review

None. All earlier open points are resolved as D7–D10.
