## General recommendations

Use language consistently within each product (e.g., if “Edit” is used on one page, use that same convention throughout, instead of a similar word such as "Change").

!!! Do

Highlight the most relevant word or short phrase as it relates to the target of the link. For example:

<span class="hds-typography-text-300">Learn more about deploying a Vault Cluster on HCP</span>

<Hds::Link::Standalone @color="primary" @icon="external-link" @iconPosition="trailing" @href="#" @size="large" @text="HashiCorp Developer tutorial library" />

!!!

!!! Dont

Don’t wrap an entire sentence or text block in a link.

<Hds::Link::Standalone @color="primary" @size="large" @icon="external-link" @text="Learn more about deploying a Vault Cluster on HCP in the HashiCorp Developer tutorial library" @iconPosition="trailing" @href="#" />

!!!