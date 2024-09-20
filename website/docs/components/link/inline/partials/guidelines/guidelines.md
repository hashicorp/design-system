## Usage

### When to use

- To navigate to a new destination, either internally or externally.
- Within a block of body text or other text element.

### When not to use

- As a standalone element, consider [Standalone Link](/components/link/standalone).
- To trigger an action or event, like a form submission, consider [Button](/components/button).

## Usage in Figma

The Inline Link is only published as a component in Ember, there is no corresponding Figma component. To achieve the same results:

1. Apply a **text** and **color** style to a block of text from the [Foundations library](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?type=design&node-id=2130%3A2&t=6XBReWOxMRTiW1Iv-1) under **Text styles** > `Body` or `Code`.
2. Select the word or phrase that is intended to be a link and apply either the `Primary` or `Secondary` color from `Components / Link inline / Foreground`.
3. Change the text decoration of the intended link to "Underline".

## Color

### Primary

We recommend using the `primary` variant as the default and for more important links.

![Primary inline link example](/assets/components/link/inline/link-inline-primary.png)

### Secondary

Use the `secondary` variant for less important links or when the primary link can’t be used.

![Secondary inline link example](/assets/components/link/inline/link-inline-secondary.png)

!!! Dont

Don’t mix `primary` and `secondary` links within a block of text or adjacent blocks of text. This can lead to confusion about the hierarchy of the links and their relative importance.

![Different types of links in a block of text](/assets/components/link/inline/link-inline-dont-mix.png)
!!!

## Icon position

An Inline Link can include a leading or trailing icon in the Ember component. Avoid creating links with both leading and trailing icons.

!!! Info

There is no straight-forward method to add an icon within a block of text in Figma. Some strategies to consider are:

- Manually positioning the icon next to a link.
- Wrapping the text and link in multiple nested auto-layout containers.
- Excluding the icon visually but communicating the intended usage in the engineering hand-off.

!!!

### Trailing

In most cases, use trailing icons as this breaks up the text less and has a smaller impact on the readability of the link within a block of text.

<span class="hds-typography-body-300">Lorem ipsum <Hds::Link::Inline @color="primary" @icon="external-link" @iconPosition="trailing" @href="#">dolor</Hds::Link::Inline> sit amet.</span>

### Leading

Use a leading icon when using service icons (e.g., GitHub).

<span class="hds-typography-body-300">Edit this page on <Hds::Link::Inline @color="primary" @icon="github" @iconPosition="leading" @href="#">GitHub</Hds::Link::Inline>.</span>

## Content

!!! Do

Highlight the most relevant word or short phrase as it relates to the target of the link. For example:

<span class="hds-typography-body-300">Learn more about deploying a Vault Cluster on HCP in the <Hds::Link::Inline @color="primary" @icon="external-link" @iconPosition="trailing" @href="#">HashiCorp Developer tutorial library</Hds::Link::Inline>.</span>

!!!

!!! Dont

Don’t wrap an entire sentence or text block in a link.

<span class="hds-typography-body-300"><Hds::Link::Inline @color="primary" @icon="external-link" @iconPosition="trailing" @href="#">Learn more about deploying a Vault Cluster on HCP in the HashiCorp Developer tutorial library</Hds::Link::Inline>.</span>

!!!

### Display sizes

We don't recommend using links within `Display` sizes as these are generally reserved for titles and headlines.

If an Inline Link inside of `Display` text is required, the Ember component will inherit the font size and weight. The style in Figma will need to be overridden with an underline as we do not publish link styles for `Display` sizes at this time.

!!! Do

Highlight actions paired with a `Display` headline using the [Standalone Link](/components/link/standalone) and associate it with the headline in the layout.

<Doc::Layout @direction="vertical" @spacing="1rem">
<span class="hds-typography-display-400 hds-font-family-sans-display hds-font-weight-bold">Headline</span>
<Hds::Link::Standalone @icon="arrow-right" @iconPosition="trailing" @href="#" @color="primary" @text="Link to relevant content" />
</Doc::Layout>
!!!
