<h4 class="dummy-h4">Basic invocation</h4>

```hbs
<Hds::Link::Standalone @text="Watch Tutorial Video" @icon="film" @route="index" />
```

**Renders to**

<Hds::Link::Standalone @text="Watch Tutorial Video" @icon="film" @route="index" />

<h4 class="dummy-h4">External Link</h4>

```hbs
<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @href="/" />
```

**Renders to:**

<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @href="/" />

<h4 class="dummy-h4">Sizes</h4>

There are three sizes: small, medium, and large.
If no size is defined, medium is automatically applied.

<h5 class="dummy-h5">Small</h5>

```hbs
<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @route="index" @size="small" />
```

**Renders to:**

<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @route="index" @size="small" />

<h5 class="dummy-h5">Medium</h5>

```hbs
<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @route="index" />
```

**Renders to:**

<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @route="index" />

<h5 class="dummy-h5">Large</h5>

```hbs
<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @route="index" @size="large" />
```

**Renders to:**

<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @route="index" @size="large" />

<h4 class="dummy-h4">Download File</h4>

To indicate that the link is a file to be downloaded, use the `@href` and add the `download` attribute when invoking the component:

```hbs
<Hds::Link::Standalone @text="Download Text File" @icon="download" @href="path/to/file/file.txt"  download />
```

**Renders to:**

<Hds::Link::Standalone @text="Download Text File" @icon="download" @href="path/to/file/file.txt" download />

<h4 class="dummy-h4">External Links</h4>

