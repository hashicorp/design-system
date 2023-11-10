# Website / Infrastructure

- [Website / Infrastructure](#website--infrastructure)
  - [`Website` folder](#website-folder)
  - [`field-guide`](#field-guide)
  - [Markdown to HTML](#markdown-to-html)
  - [Build-time parsing functions](#build-time-parsing-functions)
  - [Run-time parsing functions](#run-time-parsing-functions)
    - [Showdown library (Markdown to HTML)](#showdown-library-markdown-to-html)
      - [Showdown configuration and extensions](#showdown-configuration-and-extensions)
        - [Why we're using PHP/ASP tags in the extensions](#why-were-using-phpasp-tags-in-the-extensions)
  - [The `Docs` folder](#the-docs-folder)
  - [`show` route/controller/template](#show-routecontrollertemplate)
    - [`DynamicTemplate` component](#dynamictemplate-component)
  - [Routing](#routing)
  - [TOC generation](#toc-generation)
  - [Markdown structure and conventions](#markdown-structure-and-conventions)
  - [Media files](#media-files)
  - [Server side rendering and fastboot](#server-side-rendering-and-fastboot)

---

## `Website` folder

The `website` folder in the monorepo contains all the code related to the new documentation website. It's an Ember application, so you should expect the classic folder structure of an Ember app.

The `website-html-to-markdown` folder is a temporary collection of Node.js scripts and codemods that were used to automate the migration of existing content from the old "dummy" website to the new documentation format in markdown. This folder will be removed/archived once the new website is launched and the old documentation deprecated.

The `wiki` folder is where we collect all the internal documentation for the team. In this folder you can find also documentation about the website.

## `field-guide`

After an evaluation phase of different options for the infrastructure underlying the website (see [the RFC document DS-044](https://docs.google.com/document/d/1V5e81Z1p6dQfKikF5RRLesNRttGr60rkqBH9E976Gdw/edit#)) we decided to use [`field-guide`](https://github.com/empress/field-guide) for its capability to use markdown as source format for the documentation and generate output HTML pages organized and routed according to their filesystem structure, making it intuitive and simple enough to use for our documentation "editors/maintainers" (not only team members, but also consumers of the design system).

After starting to use `field-guide` for the initial implementation of the website, we realized that the solution (taken as it was) had a lot of limitations and in some cases bugs, that could hinder our efforts in delivering certain features that we considered strong requirements. After a call with [Chris Manson](https://github.com/mansona), main maintainer of `filed-guide` (and well-known contributor in the Ember ecosystem) we agreed that it would not represent a problem if we had to fork the solution to match our needs (given also the fact that we had a strict deadline to meet for the launch of the website).

After a few more experiments, we came to the conclusion that the more pragmatic way forward for us was not only to fork the project, but also to embed it in our mono-repo directly as addon for the `website` application. This opened the doors to an almost complete refactoring, that saw the breaking down of the package in its own basic elements, the stripping of the parts that we didn't need, and the reassembling of the building blocks in a custom "build" pipeline, entirely contained into our `website` application code.

So, while respecting the underlying philosophy of `field-guide` in terms of general approach, we ended up with a full custom solution for our website infrastructure, on which we have 100% control, visibility and internal knowledge.

This effort was mainly led by Cristiano Rastelli and Brian Runnells, so speak with one of them for any questions about this specific part of the website infrastructure.

## Markdown to HTML

The general idea behind the `field-guide` solution, and consequently our custom implementation, is to have a documentation website based on markdown files that are then pre-processed, parsed, and converted to a website in which the web pages and the navigation are automatically generated.

This entire process of automatic generation of single pages and overall navigation is split into two key moments:

At **build time** the markdown files are processed and
  - converted to JSON format and stored in the `dist` folder according to their filesystem structure
  - pre-processed to generate a TOC ("table of contents") JSON file, also stored in the `dist` folder
This pre-processing is done via specific functions/modules plugged into the Ember build system for the `website` application.
In this step there is no HTML involved, only data (their frontmatter, their markdown content, their organization in the folder).

At **run time** the JSON files are accessed by the web application to:
- build the website navigation using the TOC file generated at runtime
- render the web pages using the JSON file as source, associating the URL with its position in the filesystem
This post-processing is done via [Showdown](https://showdownjs.com/), an open-source JavaScript library that converts markdown code to HTML.
In this step the frontmatter data and the markdown content is actually converted to HTML (and Handlebars/Ember code) and rendered in the browser as web pages.

_Note: the reason to leave the conversion from markdown to HTML at runtime, instead of doing everything in a single pass at build time, is to leave the doors open for a possible future integration with the *Developer* platform, similar to the way https://developer.hashicorp.com/ works today._

## Build-time parsing functions

You can find the main logic for the build-time processing in the  `website/lib/markdown` folder.

🚧 TODO

    - general overview of what we have understood of the broccoli thing and how we avoided needing an `addon` folder
    - `markdown-process-includes`
    - `markdown-to-jsonapi`
    - `table-of-contents`

_Note: this folder contains `package.json` file so it can be used as "ember-addon" (see the `keywords` in the file) by the Ember application, without the need to have a separate `addon` folder in the monorepo._

## Run-time parsing functions

The actual conversion from markdown to HTML (and Handlebars/Ember) code happens in the `show.js` controller:
https://github.com/hashicorp/design-system/blob/main/website/app/controllers/show.js#L74-L75

```js
// this creates a new instance of the Showdown converter
const converter = new showdown.Converter(showdownConfig);
// this converts the markdown content (stored in the `show` model) to HTML (and returns it inside the `get renderedContent()` getter)
return converter.makeHtml(this.model.content);
```

For details about Showdown and how it works see the section below.

### Showdown library (Markdown to HTML)

[Showdown](https://showdownjs.com/) is one of many open-source JavaScript libraries that are used to convert markdown content to HTML. We are using this specific library because is the one used by `field-guide` and, after an initial steep learning curve, we now know how to "wrestle" to do what we want/need. There is an idea to evaluate alternative solutions post-launch, but this is something we will have to consider later.

It doesn't use ATS transformations, but regular expressions to do the conversion, which means it's much more complex and brittle to do manipulations/transformations of the generated output.

#### Showdown configuration and extensions

The `showdownConfig` configuration is located in the `shared/showdown-config` folder.

The settings are commented in the file, so refer to it for more details: https://github.com/hashicorp/design-system/blob/main/website/app/shared/showdown-config.js

The Showdown parser is extended using the `extensions` option. It contains three main custom extensions:
- `elementsToClassNames` ([source code](https://github.com/hashicorp/design-system/blob/main/website/app/shared/showdown-extensions/elements-to-classnames.js)) is technically an array of custom extensions that add specific class names to every HTML element generated from markdown (eg. `doc-markdown-h1` for `<h1>` elements, `doc-markdown-p` for `<p>` elements, `doc-markdown-img` for `<img>` elements, etc.); these classes are then used to style the HTML tags in a very specific and targeted way, without the risk of CSS styles leaking to other elements.
- `contentBlocks` ([source code](https://github.com/hashicorp/design-system/blob/main/website/app/shared/showdown-extensions/content-blocks.js)) is used to implement the custom "content blocks" syntax for the `Banner` and `DoDont` components (see ["code block" syntax in markdown](./Website-Markdown.md#code-block)).

##### Why we're using PHP/ASP tags in the extensions

We're using the special tags `<?php ?>` and `<?asp ?>` as passthrough tags to avoid Showdown altering the content of the tags (eg. stripping them) and forcing it to parse as markdown the content of these tags. Unfortunately this is the only way we could find to avoid aggressive behaviour of Showdown on HTML tags beyond the `<div>` element (see ).

The idea underlying this approach is the following;
- Showdown has [two types of extensions](https://github.com/showdownjs/showdown/wiki/extensions#type-propertyrequired):
  - `lang` - "Language" extensions add new markdown syntax to showdown / They run before all the transformations
  - `output` - "Output" extensions alter the HTML output generated by showdown / They run after all the transformations
- Plugging in the actual markdown-to-html phase is not possible (and even if it is, it's very unpredictable)
- So the only solution we have found was to use the special `<?php ?>` and `<?asp ?>` (the idea came when looking at [these lines of code in the Showdown source](https://github.com/showdownjs/showdown/blob/master/src/subParsers/makehtml/hashHTMLBlocks.js#L93-L95)) as a way to temporarily convert "patterns" in the markdown (identifiable via regex) to one of these PHP/ASP tags in the `lang` phase, and convert back the code after the markdown-to-html conversion, to a custom format that needed, using again the special PHP/ASP tags (also identifiable via regex) as opening/closing elements of a special block of content.

## The `Docs` folder

The docs folder plays a fundamental role in the website infrastructure. It's the folder where the markdown files are stored and organized, its filesystem structure is used to define the routes and navigation for the application, and has very specific conventions on how the files should be organized (and what types are expected).

For details about this folder see [the specific "Doc" documentation](./Website-Doc-folder.md).

## `show` route/controller/template

One thing we have "inherited" from `field-guide` and left almost untouched (because is brilliant, credit to [Chris Manson](https://github.com/mansona) for this!) is how the markdown files are processed and made available using a special `show` entity, made of a router, a controller and a template. Technically I think it should be considered a "page" but this can be misleading, so we prefer to continue to call it `show`.

How this `show` works is based upon these three classic Ember entities:
- a `show.js` route ([source](https://github.com/hashicorp/design-system/blob/wiki/website/app/routes/show.js)) that acts as catch-all for all the non-standard pages (see [Routing](#routing) below)
  - this route is responsible to fetches the JSON file associated with the URL (based on the convention that the path in the URL is the path in the `docs` folder), and returning the content of the JSON data (frontmatter attributes + markdown content) inside the `@model` of the page.
- a `show.js` controller ([source](https://github.com/hashicorp/design-system/blob/wiki/website/app/controllers/show.js)) that is responsible for taking the data from the model, processing it if needed, and converting the markdown content to HTML; it's also responsible for adding "Tabs" and "Sidecar" elements to the page (see [TOC generation](#toc-generation)) and their user interaction
- a `show.hbs` template ([source](https://github.com/hashicorp/design-system/blob/wiki/website/app/templates/show.hbs)) that injects the converted HTML (plus the page-related navigational elements) in the main content area using a special `DynamicTemplate` component (see [Dynamic template](#dynamictemplate)).

While at first sight this `show` logic appears quite complex, once you get the idea that is "just another page, only with a dynamic content provided at runtime by the route + controller via `@model`, things start to appear much more clear and the whole flow more comprehensible.

### `DynamicTemplate` component

The `DynamicTemplate` component is a special "component" that can inject at runtime **in memory** a component into the Ember app, using a special syntax provided by Ember (also this brilliant solution has been ported as-is from `field-guide`).
There is not much to know about it, apart from the fact that it works. If you need to change it (in which case make sure you know exactly the implications of what you're doing) or you just to know a bit more about how it works, look at the source code ([template](https://github.com/hashicorp/design-system/blob/wiki/website/app/components/dynamic-template.hbs) + [controller](https://github.com/hashicorp/design-system/blob/wiki/website/app/components/dynamic-template.js)).

One **very important thing** to know, though, is this one: when the markdown files are parsed and processed at build time, there is one special value - the `ID` [see this comment](https://github.com/hashicorp/design-system/blob/wiki/website/lib/markdown/markdown-to-jsonapi.js#L65-L69) - that at first sight looks innocuous to change: it's just an ID at the end, no? In reality it plays an important role in how the `DynamicTemplate` works: it's what allows us to create an Ember component on-the-fly at runtime, because it's used to get the correct backing class for the markdown "component" (which is expected to be found in the same folder as the markdown file, with the exact same name). This ID is spread in the `route` class on the page model for "show" (`id: res.data.id`) and this becomes the "component" ID (eg. markdown relativePath = 'components/alert/index.md' –> id = 'components/alert/index').

There is also a `DynamicError` component, that is used to catch errors and show a nice page to the user when the template compilation triggers an error.

## Routing

As mentioned above, the way in which the `show` page works is through a catch-all route declared in the router of the application:
https://github.com/hashicorp/design-system/blob/wiki/website/app/router.js

```
 this.route('show', { path: '*path' });
```

This declaration, at the end of the `Router` list of routes, gets hit when none of the normal routes (declared above) are hit, thanks to the `*path` special value.

So from the routing perspective, there are three categories to keep in mind:
- **standard routes** (custom pages, from the perspective of the documentation - eg. `about`, `foundations`, `support`, etc.) which are mainly used as landing/index pages for the top-level categories
- **error route** which is used when an error occurs in the Ember app, and shows [a special page template](https://github.com/hashicorp/design-system/blob/wiki/website/app/templates/error.hbs) to the user.
- **`show` route** which catches everything else and tries to render a page loading a content JSON file at the exact same path as the one matched by the `*path` wildcard ([see the Ember documentation on this](https://guides.emberjs.com/release/routing/defining-your-routes/#toc_wildcard--globbing-routes)).

## TOC generation

There are two different TOC ("table of contents") in the application
- the global TOC, which is generated at build time by the `table-of-contents.js` module ([see "Build time parsing functions"](#build-time-parsing-functions)) and saved as `toc.json` in the `dist` folder; this file is then retrieved at runtime and used to build the **sidebar navigation** used by the user to navigate across different pages of the website (the visible navigation items are a subset filtered on the base of the current top-level category).
- the page-level TOC which is generated (in memory) at runtime by the application, looking for all the `<h2>` and `<h3>` headings in the **current page**, and added to the **sidecar element** in the page; if the page is split into sections (and hence tabs), when the user selects a tab, automatically the corresponding TOC for that section is shown to the user.

## Markdown structure and conventions

In [the `Doc folder` document](./Website-Doc-folder.md) you can find a detailed explanation about the expected `Doc` folder and its conventions.
In [the `Markdown` document](./Website-Markdown.md) you can find a detailed explanation about the Markdown syntax that can be used for our documentation.

## Media files

In [the `Media` document](./Website-Media.md) you can find a detailed explanation about how to handle media files for the website.

### Fingerprinting

Our fingerprinting strategy largely follows the [default ember-cli setup](https://cli.emberjs.com/release/advanced-use/asset-compilation/#fingerprintingandcdnurls) with the addition of the `'json'` file type added to `extensions` in [ember-cli-build.js](../website/ember-cli-build.js) so that processed markdown files are fingerprinted.

We did encounter a problem with fingerprinting of a specific image markdown syntax for specifying image dimensions (` =112x112`) which was resolved by utilizing `yarn patch` to adjust the underlying fingerprinting logic. More details can be found in [#826](https://github.com/hashicorp/design-system/pull/826).

## Server side rendering and fastboot

The website uses a combination of [ember-cli-fasboot](https://github.com/ember-fastboot/ember-cli-fastboot) and [prember](https://github.com/ef4/prember) to pre-render static versions of routes at build time. 

Fastboot is meant to allow us to serve the site to users without JavaScript enabled. However, using the site without JavaScript enabled is currently unsupported, as there is some functionality in the site that requires JavaScript. We do still attempt to leverage the [fastboot service](https://github.com/ember-fastboot/ember-cli-fastboot#fastboot-service) to place guards around logic we know to only work outside the Fastboot context.

Fastboot is enabled by default for local development, however prember is not. Use the command `yarn start:prember` to temporarily enable pre-rendering, but note that this is much slower and not recommended for normal development.

Our configuration mirrors what is outlined in each project's readme, with the only notable local configuration being done in [website/lib/markdown/index.js](../website/lib/markdown/index.js). This file has a `urlsForPrember()` function which tells prember which routes we want it to pre-render. This logic resides here as this is the point where we know the dynamically generated list of component/foundation URLs

Additionally, we use [prember-sitemap-generator](https://github.com/shipshapecode/prember-sitemap-generator) to generate a sitemap based on the same prember config we use for pre-rendering static pages. Configuration for this lives in the website's [ember-cli-build.js](../website/ember-cli-build.js)