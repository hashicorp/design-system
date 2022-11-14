# Breadcrumb

## When to use

- To display the hierarchy and location of the current page.
- While not required for every page, a breadcrumb is highly encouraged for the majority of our pages with the exception of high-level overviews and dedicated workflows.

## When not to use

- As links outside of the page header.
  - Within a body of text, use [InlineLink](/components/link/inline/overview)
  - As a standaloneelement or within a Button Set, use a [StandaloneLink](/components/link/standalone/overview)

_Banner (informational):_ The last item in the breadcrumb should always be the current page.

---

_Item_

## Anatomy

![Anatomy of a breadcrumb item](/assets/components/breadcrumb/breadcrumb-item_anatomy.png)

#### Text

Required (unless using a truncated item)

#### Leading Icon

Optional – color and size of the icon is pre-defined.

If a truncated item, the leading icon must be a "more-horizontal" icon.

#### Focus Ring

Focus state only

_Breadcrumb_

## Anatomy

![Anatomy of a breadcrumb component](/assets/components/breadcrumb/breadcrumb-anatomy.png)

#### Item

Items can utilize the layout combinations below.

#### Separator

A separator is required for all breadcrumb items except the last item.

#### Current Page

The last item in the breadcrumb should always be the current page, not interactive, and styled with **Foreground / Strong** for the text color to meet accessibility requirements.

---

## Combinations

### Text only

<section>
  <Hds::Breadcrumb::Item @text="Level" />
</section>

### With icon

<section>
  <Hds::Breadcrumb::Item @text="Level" @icon="org" />
</section>

### Truncated

<section>
  <Hds::Breadcrumb::Truncation>
    <Hds::Breadcrumb::Item @text="Level" @icon="org" />
  </Hds::Breadcrumb::Truncation>
</section>

---

## States

Default

![Default state of the breadcrumb component](/assets/components/breadcrumb/breadcrumb-state-default.png)

Hover

![Hover state of the breadcrumb component](/assets/components/breadcrumb/breadcrumb-state-hover.png)

Active

![Active state of the breadcrumb component](/assets/components/breadcrumb/breadcrumb-state-active.png)

Focus

![Focus state of the breadcrumb component](/assets/components/breadcrumb/breadcrumb-state-focus.png)

---

## Icons

<section>
  <Hds::Breadcrumb>
    <Hds::Breadcrumb::Item @text="Level one" @icon="org" />
    <Hds::Breadcrumb::Item @text="Level two" @icon="folder" />
    <Hds::Breadcrumb::Item @text="Level three" @icon="org" />
    <Hds::Breadcrumb::Item @text="Level four" />
    <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
  </Hds::Breadcrumb>
</section>

- Icons should only be added to the first three levels to avoid unnecessary visual noise.
- Icon usage should be inherited and not randomly added to a level (if a higher level uses an icon, the level just under it can also use one).

---

## Truncation

If truncation is needed due to depth or lack of space, use one of the following options. Breadcrumbs will truncate using truncate middle if there are more than five items to display. Truncate middle is recommended unless space is an issue.

### Truncate middle

<section>
  <Hds::Breadcrumb>
    <Hds::Breadcrumb::Item @text="Level one" />
    <Hds::Breadcrumb::Item @text="Level two" />
    <Hds::Breadcrumb::Truncation>
      <Hds::Breadcrumb::Item @text="Level three" />
    </Hds::Breadcrumb::Truncation>
    <Hds::Breadcrumb::Item @text="Level four" />
    <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
  </Hds::Breadcrumb>
</section>

### Truncate squeeze

<section>
  <Hds::Breadcrumb>
    <Hds::Breadcrumb::Item @text="Level one" />
    <Hds::Breadcrumb::Truncation>
      <Hds::Breadcrumb::Item @text="Level two"/>
    </Hds::Breadcrumb::Truncation>
    <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
  </Hds::Breadcrumb>
</section>

Each text-based item can truncate using a pixel-based max-width at the discretion of each team. This option should be reserved for instances when items have long text strings.

### Width-based

<section>
  <Hds::Breadcrumb @itemsCanWrap={{false}}>
    <Hds::Breadcrumb::Item @text="Level one" />
    <Hds::Breadcrumb::Item @text="Level two" />
    <Hds::Breadcrumb::Item @text="Level three truncation" @maxWidth="120px" />
    <Hds::Breadcrumb::Item @text="Level four" />
    <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
  </Hds::Breadcrumb>
</section>

### Width-based (Hover)

<!-- I don't think this functionality actually exists on this component -->

<section>
  <Hds::Breadcrumb @itemsCanWrap={{false}}>
    <Hds::Breadcrumb::Item @text="Level one" />
    <Hds::Breadcrumb::Item @text="Level two" />
    <Hds::Breadcrumb::Item @text="Level three truncation" @maxWidth="120px" />
    <Hds::Breadcrumb::Item @text="Level four" />
    <Hds::Breadcrumb::Item @text="Current" @current={{true}} />
  </Hds::Breadcrumb>
</section>

_Banner (informational):_ The tooltip will appear on hover with a mouse or on focus.

---

## Dropdowns

For truncated breadcrumb items, clicking or hitting enter or spacebar will open the truncated dropdown. The truncated dropdown will align to the left side of the breadcrumb item and will be placed 4px below the breadcrumb item.

Truncated dropdowns will include all of the hierarchal layers that have been hidden.

### Truncated dropdown

![Example of the spacing of used in a truncated dropdown](/assets/components/breadcrumb/breadcrumb-truncated-dropdown.png)
