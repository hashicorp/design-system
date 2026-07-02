# Helios → Carbon Web Components Migration Report

**Generated:** 2026-06-22  
**Mode:** `full`  
**Scope:** `showcase/app/components/page-ai-testing/component-sandbox/sub-sections/component-sandbox.gts`

---

## Summary

- **Total candidates identified:** 28
- **High-confidence (≥ 0.90):** 6
- **Medium-confidence (0.60-0.89):** 14
- **Low-confidence (< 0.60):** 8
- **Migrations applied:** 11
- **Migrations skipped:** 17
- **Manual review required:** 9

---

## Candidate Breakdown by Confidence

### High Confidence (≥ 0.90)

| ID | Component | Line | CWC Target | Confidence |
|----|-----------|------|------------|------------|
| `btn-preview-submit-300` | `Hds::Button` | 300 | `cds-button` | 0.90 |
| `btn-cancel-305` | `Hds::Button` | 305 | `cds-button` | 0.90 |
| `btn-confirm-submit-364` | `Hds::Button` | 364 | `cds-button` | 0.90 |
| `btn-go-back-369` | `Hds::Button` | 369 | `cds-button` | 0.90 |
| `buttonset-form-299` | `Hds::ButtonSet` | 299 | `<div>` | 0.95 |
| `buttonset-modal-363` | `Hds::ButtonSet` | 363 | `<div>` | 0.95 |

**Status:** All 6 auto-applied in Phase 2a.

### Medium Confidence (0.60-0.89) — Approved by user

| ID | Component | Line | CWC Target | Confidence | Applied |
|----|-----------|------|------------|------------|---------|
| `btn-search-118` | `Hds::Button` | 118 | `cds-button` | 0.85 | ✅ |
| `form-244` | `Hds::Form` | 244 | `cds-form` | 0.85 | ✅ |
| `textinput-name-265` | `Hds::Form::TextInput::Field` | 265 | `cds-text-input` | 0.88 | ✅ |
| `textinput-email-281` | `Hds::Form::TextInput::Field` | 281 | `cds-text-input` | 0.88 | ✅ |
| `accordion-183` | `Hds::Accordion` | 183 | `cds-accordion` | 0.82 | ✅ |
| `alert-248` | `Hds::Alert` | 248 | `cds-inline-notification` | 0.75 | ⏭ not approved |
| `modal-335` | `Hds::Modal` | 335 | `cds-modal` | 0.70 | ⏭ not approved |
| `apphomelink-100` | `Hds::AppHeader::HomeLink` | 100 | `cds-header-name` | 0.75 | ⏭ not approved |
| `appsidenav-138` | `Hds::AppSideNav` | 138 | `cds-side-nav` | 0.70 | ⏭ not approved |
| `appsidenav-list-139` | `Hds::AppSideNavList` | 139 | `cds-side-nav-items` | 0.65 | ⏭ not approved |
| `appsidenav-list-146` | `Hds::AppSideNavList` | 146 | `cds-side-nav-items` | 0.65 | ⏭ not approved |
| `appsidenav-list-160` | `Hds::AppSideNavList` | 160 | `cds-side-nav-items` | 0.65 | ⏭ not approved |
| `pageheader-171` | `Hds::PageHeader` | 171 | native HTML | 0.95† | ⏭ not approved |
| `appheader-98` | `Hds::AppHeader` | 98 | `cds-header` | 0.60 | ⏭ not approved |

†`pageheader-171` scores 0.95 but carries a `no-equivalent` risk flag — kept in the approval gate per user decision.

**Status:** 5 of 14 approved and applied. 9 not approved — remain as manual follow-ups.

### Low Confidence (< 0.60)

| ID | Component | Line | Confidence | Reason |
|----|-----------|------|------------|--------|
| `appframe-92` | `Hds::AppFrame` | 92 | 0.50 | No Carbon equivalent — full layout rewrite required |
| `dropdown-org-109` | `Hds::Dropdown` | 109 | 0.55 | `dd.Checkmark` has no Carbon equivalent |
| `dropdown-help-119` | `Hds::Dropdown` | 119 | 0.55 | `dd.Title` has no Carbon equivalent |
| `dropdown-user-127` | `Hds::Dropdown` | 127 | 0.55 | `dd.Title` / `dd.Description` have no Carbon equivalent |
| `textbody-187` | `Hds::Text` | 187 | 0.0 | No Carbon equivalent |
| `textbody-208` | `Hds::Text` | 208 | 0.0 | No Carbon equivalent |
| `textbody-224` | `Hds::Text` | 224 | 0.0 | No Carbon equivalent |
| `textbody-344` | `Hds::Text` | 344 | 0.0 | No Carbon equivalent |

**Status:** All 8 skipped — require human review.

---

## Migrations Applied

**Count:** 11

| ID | Helios Component | CWC Component | Line |
|----|-----------------|---------------|------|
| `btn-preview-submit-300` | `Hds::Button` | `cds-button` | 300 |
| `btn-cancel-305` | `Hds::Button` | `cds-button` | 305 |
| `btn-confirm-submit-364` | `Hds::Button` | `cds-button` | 364 |
| `btn-go-back-369` | `Hds::Button` | `cds-button` | 369 |
| `buttonset-form-299` | `Hds::ButtonSet` | `<div>` | 299 |
| `buttonset-modal-363` | `Hds::ButtonSet` | `<div>` | 363 |
| `btn-search-118` | `Hds::Button` | `cds-button` + inline SVG | 118 |
| `form-244` | `Hds::Form` | `cds-form` | 244 |
| `textinput-name-265` | `Hds::Form::TextInput::Field` | `cds-text-input` | 265 |
| `textinput-email-281` | `Hds::Form::TextInput::Field` | `cds-text-input` | 281 |
| `accordion-183` | `Hds::Accordion` | `cds-accordion` | 183 |

**Changed files:**
- `showcase/app/components/page-ai-testing/component-sandbox/sub-sections/component-sandbox.gts`

---

## Migrations Skipped

**Count:** 17

| ID | Reason |
|----|--------|
| `alert-248` | Not approved at medium gate |
| `modal-335` | Not approved at medium gate |
| `apphomelink-100` | Not approved at medium gate |
| `appsidenav-138` | Not approved at medium gate |
| `appsidenav-list-139` | Not approved at medium gate |
| `appsidenav-list-146` | Not approved at medium gate |
| `appsidenav-list-160` | Not approved at medium gate |
| `pageheader-171` | Not approved at medium gate |
| `appheader-98` | Not approved at medium gate |
| `appframe-92` | Confidence 0.50 — below threshold |
| `dropdown-org-109` | Confidence 0.55 — `dd.Checkmark` no CWC equiv |
| `dropdown-help-119` | Confidence 0.55 — `dd.Title` no CWC equiv |
| `dropdown-user-127` | Confidence 0.55 — `dd.Title`/`dd.Description` no CWC equiv |
| `textbody-187` | Confidence 0.0 — no CWC equivalent |
| `textbody-208` | Confidence 0.0 — no CWC equivalent |
| `textbody-224` | Confidence 0.0 — no CWC equivalent |
| `textbody-344` | Confidence 0.0 — no CWC equivalent |

---

## Verification Results

### Lint

✅ **PASSED** — 0 errors, 0 warnings

```
pnpm lint:hbs   → clean (603 files)
pnpm lint:js    → clean
pnpm lint:types → clean
```

### Build

Not run (showcase file only — no package source changed).

---

## Blockers

None.

---

## Manual Follow-ups

The following candidates were not approved and require manual migration:

| ID | Component | Line | CWC Target | Notes |
|----|-----------|------|------------|-------|
| `pageheader-171` | `Hds::PageHeader` | 171 | native `<header>/<h1>/<p>` | Replace with native HTML |
| `alert-248` | `Hds::Alert` | 248 | `cds-inline-notification` | `A.Title`/`A.Description` → `title`/`subtitle` attrs; `@color='critical'` → `kind='error'` |
| `modal-335` | `Hds::Modal` | 335 | `cds-modal` | `{{#if}}` wrapper → `open` attr; `M.Header/Body/Footer` → child elements; `MF.close` → `data-modal-close` |
| `appheader-98` | `Hds::AppHeader` | 98 | `cds-header` | Named blocks `:logo`/`:globalActions`/`:utilityActions` → Carbon header child elements |
| `apphomelink-100` | `Hds::AppHeader::HomeLink` | 100 | `cds-header-name` | `@icon='hashicorp'` → remove, use `prefix` attr |
| `appsidenav-138` | `Hds::AppSideNav` | 138 | `cds-side-nav` | `@isCollapsible` → `collapse-mode='rail'`; children wrap in `cds-side-nav-items` |
| `appsidenav-list-139` | `Hds::AppSideNavList` | 139 | `cds-side-nav-items` | `SNL.Link` → `cds-side-nav-link`; `@icon` remove; `@isActive` → `active` attr |
| `appsidenav-list-146` | `Hds::AppSideNavList` | 146 | `cds-side-nav-menu` | `SNL.Title` → `title` attr on `cds-side-nav-menu`; `SNL.Link` → `cds-side-nav-menu-item` |
| `appsidenav-list-160` | `Hds::AppSideNavList` | 160 | `cds-side-nav-menu` | Same pattern as `appsidenav-list-146` |

Skipped (no CWC equivalent — human decision required):

| ID | Component | Line | Notes |
|----|-----------|------|-------|
| `appframe-92` | `Hds::AppFrame` | 92 | Remove entirely; place `cds-header` / `cds-side-nav` / `<main>` as siblings at root |
| `dropdown-org-109` | `Hds::Dropdown` | 109 | `dd.ToggleButton` → `cds-menu-button`; `dd.Checkmark` → custom impl |
| `dropdown-help-119` | `Hds::Dropdown` | 119 | `dd.ToggleIcon` → `cds-overflow-menu`; `dd.Title` → remove |
| `dropdown-user-127` | `Hds::Dropdown` | 127 | `dd.ToggleIcon` → `cds-overflow-menu`; `dd.Title`/`dd.Description` → remove |
| `textbody-187/208/224/344` | `Hds::Text` | 187+ | Remove wrapper — children already use native HTML |

---

## Component Migration Summary

| Helios Component | Carbon Component | Candidates | Applied | Manual | Skipped |
|-----------------|-----------------|-----------|---------|--------|---------|
| `Hds::Button` | `cds-button` | 5 | 5 | 0 | 0 |
| `Hds::ButtonSet` | `<div>` | 2 | 2 | 0 | 0 |
| `Hds::Form` | `cds-form` | 1 | 1 | 0 | 0 |
| `Hds::Form::TextInput::Field` | `cds-text-input` | 2 | 2 | 0 | 0 |
| `Hds::Accordion` | `cds-accordion` | 1 | 1 | 0 | 0 |
| `Hds::Alert` | `cds-inline-notification` | 1 | 0 | 1 | 0 |
| `Hds::Modal` | `cds-modal` | 1 | 0 | 1 | 0 |
| `Hds::PageHeader` | native HTML | 1 | 0 | 1 | 0 |
| `Hds::AppHeader` | `cds-header` | 1 | 0 | 1 | 0 |
| `Hds::AppHeader::HomeLink` | `cds-header-name` | 1 | 0 | 1 | 0 |
| `Hds::AppSideNav` | `cds-side-nav` | 1 | 0 | 1 | 0 |
| `Hds::AppSideNavList` | `cds-side-nav-items` | 3 | 0 | 3 | 0 |
| `Hds::AppFrame` | none | 1 | 0 | 0 | 1 |
| `Hds::Dropdown` | `cds-overflow-menu` | 3 | 0 | 0 | 3 |
| `Hds::Text` | none | 4 | 0 | 0 | 4 |

---

## Risk Flags Summary

| Risk Flag | Candidates Affected |
|-----------|-------------------|
| `no-equivalent` | `appframe-92`, `pageheader-171`, `textbody-187/208/224/344` |
| `complex-transformation` | `appframe-92`, `appheader-98`, `appsidenav-138/139/146/160`, `accordion-183`, `form-244`, `modal-335`, `dropdown-*` |
| `incomplete-mapping` | `btn-search-118`, `dropdown-*`, `appsidenav-list-*` |
| `slot-to-attribute` | `alert-248`, `textinput-*`, `modal-335`, `appheader-98` |
| `behavioral-difference` | `appframe-92`, `appheader-98`, `apphomelink-100`, `appsidenav-138`, `modal-335`, `dropdown-*` |
| `dismissal-pattern-change` | `alert-248` |
| `manual-migration-required` | `textbody-187/208/224/344` |

---

## Next Actions

### Immediate
- Approve remaining medium-confidence candidates (`alert-248`, `modal-335`, `appheader-98`, `appsidenav-*`) in a follow-up `full` run.
- Manually migrate `HdsAppFrame` (structural rewrite — remove wrapper, place `cds-header`/`cds-side-nav`/`<main>` as siblings).
- Replace `HdsTextBody` wrappers with plain `<div>` or remove entirely.

### Follow-up
- Manually migrate `HdsDropdown` instances (each requires individual evaluation — `dd.Checkmark`/`dd.Title`/`dd.Description` have no CWC equivalent).
- Test `{{on "click" ...}}` on `<cds-button>` in the browser to confirm event firing.
- Verify `cds-text-input` `invalid` / `invalid-text` binding behaves correctly with the `isNameEmpty` / `isEmailEmpty` getters.

---

## Artifacts

- **Migration plan:** `migration-plan.json`
- **Migration report:** `migration-report.md` (this file)
- **Mapping table:** `.ai/migration/helios-to-carbon-component-map.json`
- **Candidate schema:** `.ai/migration/schemas/migration-candidate.schema.json`

---

**Report generated by:** `helios-to-carbon-orchestrator` skill  
**Subskill used:** `helios-to-carbon-evaluator-swapper`
