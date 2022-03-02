<h4 class="dummy-h4">Basic invocation</h4>

```hbs
<Hds::Link::Standalone @text="Watch tutorial video" @icon="film" href="/" />
```

**Renders to:**

<Hds::Link::Standalone @text="Watch tutorial video" @icon="film" href="/" />


<h4 class="dummy-h4">Sizes</h4>

There are three sizes: small, medium, and large.
If no size is defined, medium is automatically applied.

<h5 class="dummy-h5">Small</h5>

```hbs
<Hds::Link::Standalone @text="Read tutorial" @icon="collections" href="/" @size="small" />
```

**Renders to:**

<Hds::Link::Standalone @text="Read tutorial" @icon="collections" href="/" @size="small" />

<h5 class="dummy-h5">Medium</h5>

```hbs
<Hds::Link::Standalone @text="Read tutorial" @icon="collections" href="/" />
```

**Renders to:**

<Hds::Link::Standalone @text="Read tutorial" @icon="collections" href="/" />

<h5 class="dummy-h5">Large</h5>

```hbs
<Hds::Link::Standalone @text="Read tutorial" @icon="collections" href="/" @size="large" />
```

**Renders to:**

<Hds::Link::Standalone @text="Read tutorial" @icon="collections" href="/" @size="large" />
