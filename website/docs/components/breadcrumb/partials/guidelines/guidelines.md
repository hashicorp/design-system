## Usage

### When to use

- To display the hierarchy and location of the current page.
- While not required for every page, a breadcrumb is highly encouraged for the majority of pages with the exception of high-level overviews and dedicated workflows.

### When not to use

- As links outside of the page header.
  - Within a body of text, use [InlineLink](/components/link/inline/overview)
  - As a standaloneelement or within a Button Set, use a [StandaloneLink](/components/link/standalone/overview)

!!! Info

The last item in a the breadcrumb should always be the current page, and it should not be interactive.

!!!

## Item types

### Text only

<div>
	<Hds::Breadcrumb>
  	<Hds::Breadcrumb::Item @text="Level 1" />
  	<Hds::Breadcrumb::Item @text="Level 2" />
  	<Hds::Breadcrumb::Item @text="Level 3" />
  </Hds::Breadcrumb>
</div>

### With icon

<div>
	<Hds::Breadcrumb>
  	<Hds::Breadcrumb::Item @text="Level 1" @icon="org" />
  	<Hds::Breadcrumb::Item @text="Level 2" @icon="folder" />
  	<Hds::Breadcrumb::Item @text="Level 3" @icon="user" />
  </Hds::Breadcrumb>
</div>

### Truncated

<div>
	<Hds::Breadcrumb>
		<Hds::Breadcrumb::Item @text="Level 1" />
		<Hds::Breadcrumb::Truncation>
			<Hds::Breadcrumb::Item @text="Level 2" @icon="org" />
		</Hds::Breadcrumb::Truncation>
		<Hds::Breadcrumb::Item @text="Level 3" />
	</Hds::Breadcrumb>
</div>

## Icons

<Hds::Breadcrumb>
  <Hds::Breadcrumb::Item @text="Level one" @icon="org" />
  <Hds::Breadcrumb::Item @text="Level two" @icon="folder" />
  <Hds::Breadcrumb::Item @text="Level three" @icon="org" />
  <Hds::Breadcrumb::Item @text="Level four" />
  <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
</Hds::Breadcrumb>

- Icons should only be added to the first three levels to avoid unnecessary visual noise.
- Icon usage should be inherited and not randomly added to a level (if a higher level uses an icon, the level just under it can also use one).

## Truncation

If truncation is needed due to depth or lack of space, use one of the following options. Breadcrumbs will truncate using **truncate middle** if there are more than five items to display. Truncate middle is recommended unless space is an issue.

### Truncate middle

<Hds::Breadcrumb>
  <Hds::Breadcrumb::Item @text="Level one" />
  <Hds::Breadcrumb::Item @text="Level two" />
  <Hds::Breadcrumb::Truncation>
  <Hds::Breadcrumb::Item @text="Level three" />
  </Hds::Breadcrumb::Truncation>
  <Hds::Breadcrumb::Item @text="Level four" />
  <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
</Hds::Breadcrumb>

### Truncate squeeze

<Hds::Breadcrumb>
  <Hds::Breadcrumb::Item @text="Level one" />
  <Hds::Breadcrumb::Truncation>
  <Hds::Breadcrumb::Item @text="Level two"/>
  </Hds::Breadcrumb::Truncation>
  <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
</Hds::Breadcrumb>

Each text-based item can truncate using a pixel-based max-width at the discretion users discretion. This option should be reserved for instances when items have long text strings.

### Width-based

<Hds::Breadcrumb @itemsCanWrap={{false}}>
  <Hds::Breadcrumb::Item @text="Level one" />
  <Hds::Breadcrumb::Item @text="Level two" />
  <Hds::Breadcrumb::Item @text="Level three truncation" @maxWidth="120px" />
  <Hds::Breadcrumb::Item @text="Level four" />
  <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
</Hds::Breadcrumb>

### Width-based (Hover)

<!-- I don’t think this functionality actually exists on this component -->

<Hds::Breadcrumb @itemsCanWrap={{false}}>
  <Hds::Breadcrumb::Item @text="Level one" />
  <Hds::Breadcrumb::Item @text="Level two" />
  <Hds::Breadcrumb::Item @text="Level three truncation" @maxWidth="120px" />
  <Hds::Breadcrumb::Item @text="Level four" />
  <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
</Hds::Breadcrumb>

!!! Info

The tooltip will appear on hover with a mouse or on focus.

!!!

## Dropdowns

For truncated breadcrumb items, clicking, pressing enter, or pressing spacebar will open the truncated dropdown. The truncated dropdown will align to the left side of the breadcrumb item and will be placed 4px below the breadcrumb item.

Truncated dropdowns will include all of the hierarchal layers that have been hidden.

### Truncated dropdown

![Example of the spacing of used in a truncated dropdown](/assets/components/breadcrumb/breadcrumb-truncated-dropdown.png)
