# Notes on TSDocs exploration

## The Problem

We need a way to parse the docs into a JSON document with a strict schema. Our documents are written in a non-standardized method. While we follow the same general patterns across docs, there is enough nuance in how some items are documented that parsing becomes difficult.

## The Proposal

Component API documentation should be a deterministic output based on TSDoc comments and defined types.

## Issues

### General

- We need to change the way we use Enums

### AppHeader

[Docs](website/docs/components/app-header/partials/code/component-api.md)

- `a11yRefocusSkipText`
  - Default value is in the description
- `a11yRefocusNavigationText`
  - Default value is in the description
- `a11yRefocusRouteChangeValidator`
  - Remarks included in description
  - Incorrectly documented as a string
- `a11yRefocusExcludeAllQueryParams`
  - Remarks included in description
  - Default not included
- `breakpoint`
  - Not formatted as string

### Alert

[Types file](packages/components/src/components/hds/alert/index.types.ts)

- `color`
  - Need to reference the enum itself rather than the stringified values
- `icon`
  - Let's us correct the type

### Dropdown

- We don't always nest dependent attributes
- `enableCollisionDetection` is improperly documented as only a boolean
- We have multiple components documented in one section
  - `#### [D].Header / [D].Footer`

## RANDOM THOUGHTS

- Make this the default for when yielded components fo not have an explicit description: "`Alert::Description` yielded as contextual component (see below)."
- We don't document params for function arguments.
- We have multiple ways of adding "notes" to documentation
  - Banners
  - Italic text
  - "Warning:"
  - "Note:"

## Write-up outline

- Why cant we just parse the existing docs?
-
