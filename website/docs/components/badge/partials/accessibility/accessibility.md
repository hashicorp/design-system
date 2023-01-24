## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any accessibility issues with this component.

## Icon usage

Status Badges (Success, Warning, Critical) require an icon to avoid relying on color alone as a means to indicate status to the user.

<Hds::Badge @color="success" @type="filled" @icon="check" @text="Applied" />
<Hds::Badge @color="warning" @type="filled" @icon="alert-triangle" @text="Policy override" />
<Hds::Badge @color="critical" @type="filled" @icon="x" @text="Errored" />

## Annotations in design

When using icon-only Badges, include annotations of the non-visual experience in your handoff notes. For example:

![Example of an annotation of a badge to provide more context](/assets/components/badge/badge-annotations.png =511x*)

<!-- TODO: add relevant WCAG Success Criteria -->

---

## Support

If any accessibility issues have been found within this component, let us know by [submitting an issue](https://github.com/hashicorp/design-system/issues/new/choose).