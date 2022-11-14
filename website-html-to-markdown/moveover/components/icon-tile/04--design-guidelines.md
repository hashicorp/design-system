# IconTile - Design Guidelines

## When to use

- Use when display an object, or as part of a page title.

## When not to use

- Do not use the IconTile inline in a string of text, such as a paragrph where an object is referred or linked to.

---

## Anatomy

![IconTile anatomy](/assets/components/icon-tile/icon_tile-anatomy.png)

#### Container

Required

#### Icon

Required

#### Secondary Icon

Optional

---

## Color

<section>
  <Hds::IconTile @color="neutral" @icon="dashboard" />
</section>

Use **Neutral** if the object or page is not a feature of a specific product, but is something universal.

For example:

- For a 'Dashboard' or 'User' page

<section>
  <Hds::IconTile @color="consul" @icon="server-cluster" />
</section>

Use a **product-specific color** for objects or pages that are directly related to a product.

For example:

- For a page showing a 'Consul cluster'
- In a card or table row that represents a 'Consul cluster'

### Examples

<section>
  <Hds::IconTile @color="neutral" @icon="user" />
</section>

Users

<section>
  <Hds::IconTile @color="boundary" @icon="crosshair" />
</section>

Target

<section>
  <Hds::IconTile @color="consul" @icon="server-cluster" />
</section>

Cluster

<section>
  <Hds::IconTile @color="nomad" @icon="briefcase" />
</section>

Job

<section>
  <Hds::IconTile @color="packer" @icon="layers" />
</section>

Image

<section>
  <Hds::IconTile @color="terraform" @icon="grid" />
</section>

Workspace

<section>
  <Hds::IconTile @color="vagrant" @icon="box" />
</section>

Box

<section>
  <Hds::IconTile @color="vault" @icon="key" />
</section>

Secret

<section>
  <Hds::IconTile @color="waypoint" @icon="cloud-upload" />
</section>

---

## Size

Medium is the default size, but use the size that best fits any supporting text or UI.

For example:

- Don't use large IconTiles in tables

<section>
  <Hds::IconTile @color="neutral" @icon="dashboard" @size="large" />
</section>

Large

<section>
  <Hds::IconTile @color="neutral" @icon="dashboard" @size="medium" />
</section>

Medium

<section>
  <Hds::IconTile @color="neutral" @icon="dashboard" @size="small" />
</section>

Small

---

## Secondary icon

A secondary icon can be added to provide additional context.

For example:

- For an 'Add user' pag,e the 'plus' icon indicates the action.

<section>
  <Hds::IconTile @color="neutral" @icon="user" @size="large" @iconSecondary="plus"/>
</section>

<section>
  <Hds::IconTile @color="neutral" @icon="user" @size="medium" @iconSecondary="plus"/>
</section>

<section>
  <Hds::IconTile @color="neutral" @icon="user" @size="small" @iconSecondary="plus"/>
</section>

---

## Using with content

IconTiles should not appear without accompanying content. They should be presented alongside a text label for the object or page they are being used to represent. Think of them as an accessory.

---

## Accessibility

IconTiles should be hidden from screen readers.

![Accessibility example of an IconTile](/assets/components/icon-tile/icon_tile-accessibility_example.png)
