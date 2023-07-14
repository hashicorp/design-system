## Usage

### When to use

- To navigate to a new destination, either internally or externally.
- Within a block of body text or other text element.

### When not to use

- As a standalone element, consider [Standalone Link](/components/link/standalone).
- To trigger an action or event, like a form submission, consider [Button](/components/button).

## Usage in Figma

The Inline Link is only published as a component in Ember, there is no corresponding component in Figma. To achieve the same results, apply **text** and **color** styles from the [Foundations library](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?type=design&node-id=2130%3A2&t=6XBReWOxMRTiW1Iv-1) to your text.

The Ember component inherits the styles of the text around it, ensure that the font weight defined in Figma is the same as the body text it is contained within.

- Text styles can be found under text styles `Body` or `Code`.
- Color styles:
    - `Components / Link inline / Foreground / Primary`
    - `Components / Link inline / Foreground / Secondary`

## Color

### Primary

We recommend using the `primary` variant as the default and for more important links.

#### Primary example

<span class="hds-typography-body-300">Lorem ipsum <Hds::Link::Inline @color="primary" @href="...">dolor</Hds::Link::Inline> sit amet, consectetur adipiscing elit.</span>

### Secondary

Use the secondary variant for less important links, when the primary link can’t be used, or when there are multiple links in a block of text.

#### Secondary example

<span class="hds-typography-body-300">Lorem ipsum <Hds::Link::Inline @color="secondary" @href="...">dolor</Hds::Link::Inline> sit amet, consectetur adipiscing elit, sed do <Hds::Link::Inline @color="secondary" @href="...">eiusmod</Hds::Link::Inline> tempor incididunt ut <Hds::Link::Inline @color="secondary" @href="...">labore</Hds::Link::Inline> et dolore magna aliqua.</span>

## Icon position

An Inline Link can include a leading or trailing icon. Avoid creating links with both leading and trailing icons.

!!! Insight

There is no straight-forward method to add an icon within a block of text in Figma. Include this information in the engineering hand-off if intending to use an Inline Link with an icon.

!!!

### Trailing

In most cases, use trailing icons as this breaks up the text less and has a smaller impact on the readability of the link within a block of text.

<span class="hds-typography-body-300">Lorem ipsum <Hds::Link::Inline @color="primary" @icon="external-link" @iconPosition="trailing" @href="...">dolor</Hds::Link::Inline> sit amet.</span>

### Leading

Use a leading icon when using service icons (e.g., GitHub).

<span class="hds-typography-body-300">Edit this page on <Hds::Link::Inline @color="primary" @icon="github" @iconPosition="leading" @href="...">GitHub</Hds::Link::Inline>.</span>

## Content

!!! Do

Highlight the most relevant word or short phrase as it relates to the target of the link. For example:

<span class="hds-typography-body-300">Learn more about deploying a Vault Cluster on HCP in the HashiCorp Developer <Hds::Link::Inline @color="primary" @icon="external-link" @iconPosition="trailing" @href="...">tutorial library</Hds::Link::Inline>.</span>

!!!

!!! Dont

Don’t wrap an entire sentence or text block in a link.

<span class="hds-typography-body-300"><Hds::Link::Inline @color="primary" @icon="external-link" @iconPosition="trailing" @href="...">Learn more about deploying a Vault Cluster on HCP in the HashiCorp Developer tutorial library</Hds::Link::Inline>.</span>

!!!

!!! Dont

Use links within `Display` sizes rarely as these are generally meant for titles and headlines.

<span class="hds-typography-display-400 hds-font-family-sans-display hds-font-weight-bold">Headline <Hds::Link::Inline @href="..." @color="primary">containing a link</Hds::Link::Inline></span>
!!!

!!! Do

Highlight actions paired with a `Display` headline using the [Standalone Link](/components/link/standalone) and associate it with the headline in the layout.

<Doc::Layout @direction="vertical" @spacing="1rem">
    <span class="hds-typography-display-400 hds-font-family-sans-display hds-font-weight-bold">Headline</span>
    <Hds::Link::Standalone @icon="arrow-right" @iconPosition="trailing" @href="..." @color="primary" @text="Link to relevant content" />
</Doc::Layout>
!!!