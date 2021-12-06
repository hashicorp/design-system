## Link: Standalone

- This is intended for links that are not inline and are used as standalone elements.
- It must always have an [icon](https://flight-hashicorp.vercel.app/).
- If you define a **route**, a `<LinkTo>` component will be used.
- If you define a **linkUrl**, an `<a>` element will be used.

### Basic invocation

```hbs
<Hds::Link::Standalone @text="Watch Tutorial Video" @icon="film" @route="index" />
```

**Renders to**

<Hds::Link::Standalone @text="Watch Tutorial Video" @icon="film" @route="index" />

### External Link

```hbs
<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @linkUrl="/" />
```

**Renders to:**

<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @linkUrl="/" />

### Sizes

There are three sizes: small, medium, and large.
If no size is defined, medium is automatically applied.

#### Small

```hbs
<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @linkUrl="/" @size="small" />
```

**Renders to:**

<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @linkUrl="/" @size="small" />

#### Medium

```hbs
<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @linkUrl="/" />
```

**Renders to:**

<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @linkUrl="/" />

#### Large

```hbs
<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @linkUrl="/" @size="large" />
```

Renders to:
<Hds::Link::Standalone @text="Read Tutorial" @icon="collections" @linkUrl="/" @size="large" />
### Download File

To indicate that the link is a file to be downloaded, add the `download` attribute when invoking the component:

```hbs
<Hds::Link::Standalone @text="Download Text File" @icon="download" @linkUrl="path/to/file/file.txt"  download />
```

Renders to:

<Hds::Link::Standalone @text="Download Text File" @icon="download" @linkUrl="path/to/file/file.txt" download />
