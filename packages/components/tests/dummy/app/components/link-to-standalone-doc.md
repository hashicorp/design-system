<h4 class="dummy-h4">Basic invocation</h4>

```hbs
<Hds::LinkTo::Standalone @text="Watch Tutorial Video" @icon="film" @route="index" />
```

**Renders to**

<Hds::LinkTo::Standalone @text="Watch Tutorial Video" @icon="film" @route="index" />

<h4 class="dummy-h4">Sizes</h4>

There are three sizes: small, medium, and large.
If no size is defined, medium is automatically applied.

<h5 class="dummy-h5">Small</h5>

```hbs
<Hds::LinkTo::Standalone @text="Read Tutorial" @icon="collections" @route="index" @size="small" />
```

**Renders to:**

<Hds::LinkTo::Standalone @text="Read Tutorial" @icon="collections" @route="index" @size="small" />

<h5 class="dummy-h5">Medium</h5>

```hbs
<Hds::LinkTo::Standalone @text="Read Tutorial" @icon="collections" @route="index" />
```

**Renders to:**

<Hds::LinkTo::Standalone @text="Read Tutorial" @icon="collections" @route="index" />

<h5 class="dummy-h5">Large</h5>

```hbs
<Hds::LinkTo::Standalone @text="Read Tutorial" @icon="collections" @route="index" @size="large" />
```

**Renders to:**

<Hds::LinkTo::Standalone @text="Read Tutorial" @icon="collections" @route="index" @size="large" />
