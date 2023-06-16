## Usage

Usage documentation for this component is coming soon. In the meantime, help us improve this documentation by letting us know how your team is using it in [#team-design-systems](https://hashicorp.slack.com/archives/C7KTUHNUS) (internal only).

### When to use

- To navigate to a new destination, either internally or externally.
- Wihtin a block of body text or other text element.

### When not to use

- As a standalone element, consider [Standalone Link](/components/link/standalone)
- To trigger an action or event, like a form submission, consider [Button](/components/button)

## Usage in Figma

The Inline Link is only published as a component in Ember, there is no corresponding component in Figma. To achieve the same results apply **text** and **color** styles from the [Foundations library](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?type=design&node-id=2130%3A2&t=6XBReWOxMRTiW1Iv-1) to your text.

- Text styles can be found under text styles `Body` or `Code`.
- Color styles:
    - `Components / Link inline / Foreground / Primary`
    - `Components / Link inline / Foreground / Secondary`

## Color

### Primary

We recommend using the `primary` variant as the default and for more important links.

Lorem ipsum <Hds::Link::Inline @color="primary" @href="...">dolor</Hds::Link::Inline> sit amet, consectetur adipiscing elit.

### Secondary

Use the secondary variant for less important links, when the primary link can't be used, or when there are multiple links in a block of text.

Lorem ipsum <Hds::Link::Inline @color="secondary" @href="...">dolor</Hds::Link::Inline> sit amet, consectetur adipiscing elit, sed do <Hds::Link::Inline @color="secondary" @href="...">eiusmod</Hds::Link::Inline> tempor incididunt ut <Hds::Link::Inline @color="secondary" @href="...">labore</Hds::Link::Inline> et dolore magna aliqua.

## Icon position

An Inline Link can include a leading or trailing icon. Avoid creating links with both leading and trailing icons.

!!! Insight

There is no straight-forward method to add an icon within a block of text in Figma. Include this information in the engineering hand-off if intending to use an Inline Link with an icon.

!!!

### Trailing

In most cases, use trailing icons as this breaks up the text block less and has a smaller impact on the readability of the link within a block of text.

Lorem ipsum <Hds::Link::Inline @color="primary" @icon="external-link" @iconPosition="trailing" @href="...">dolor</Hds::Link::Inline> sit amet.

### Leading

Lorem ipsum <Hds::Link::Inline @color="primary" @icon="external-link" @iconPosition="leading" @href="...">dolor</Hds::Link::Inline> sit amet.

## Content

!!! Do

Highlight the most relevant word or short phrase as it relates to the target of the link. For example:

Learn more about deploying a Vault Cluster on HCP in the HashiCorp Developer <Hds::Link::Inline @color="primary" @icon="external-link" @iconPosition="trailing" @href="...">tutorial library</Hds::Link::Inline>.

!!!

!!! Dont

Don't wrap an entire sentence or text block in a link.

<Hds::Link::Inline @color="primary" @icon="external-link" @iconPosition="trailing" @href="...">Learn more about deploying a Vault Cluster on HCP in the HashiCorp Developer tutorial library</Hds::Link::Inline>.

!!!