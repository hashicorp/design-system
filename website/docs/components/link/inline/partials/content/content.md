## General recommendations

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