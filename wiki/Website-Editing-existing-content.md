# Website / Editing existing content (playbook)

- [Website / Editing existing content (playbook)](#website--editing-existing-content-playbook)
  - [Frontmatter](#frontmatter)
  - [Sections/tabs](#sections-tabs)
    - [Guidelines](#guidelines)
    - [Code](#code)
    - [Specifications](#specifications)
    - [Accessibility](#accessibility)
  - [Markdown content](#markdown-content)
  - [Steps to getting started](#steps-to-getting-started)
  - [Content improvement tips](#content-improvement-tips)
  - [Terminology cheat sheet](#terminology-cheat-sheet)
  - [Review (What to expect)](#reviews-what-to-expect)

---

Below you can find a list of things to do when working on the content of an existing documentation page.

## Frontmatter
Check that the correct frontmatter attributes are in place. Technically, only the `title` is required, but depending on the page other attributes may be needed as well. Please refer to [the "Frontmatter" documentation](./Website-Doc-folder.md#frontmatter) for details about what attributes are recognized and how to use them, or check in similar pages what attributes are used.

## Sections/tabs
Ensure consistent tab names and order. For components, we use: **Guidelines**, **Code**, **Specifications**, and **Accessibility**. If needing to add a section that is not listed above, speak with the HDS team. Note that not all sections may be necessary for all components. In that case, remove the section from `index.md`.

### Guidelines
Guidelines are used for design guidelines and general best practices for usage. Content should generally follow this order: 
- Overview description (no heading)
- Type (if multiple exists, see `Alert`)
- Usage
    - When to use
    - When not to use
    - Variant/property sections (in the order of likely use)
- Content
- Related

### Code
Code houses all engineering documentation. Content should generally follow this order: 
- How to use this component
- Component API
- Showcase

### Specifications
Specifications are used for more tactical, technical details about the structure of the component (eg. anatomy, token specs, interactive states, etc). Content should generally follow this order: 
- Anatomy (image, then table)
- Interactive states
- Any token-related content (this likely doesn't exist yet)

### Accessibility
Accessibility houses content related to the built-in accessibility features we provide, gotchas, and best practices for implementing the component, compliance ratings, and known issues. Content should generally follow this order: 
- Conformance rating
    - Rating badge
    - Details
- Best practices (typically found throughout the docs)
- Applicable WCAG Success Criteria

## Markdown content
A large portion of the content in the new documentation website has been ported over automatically, from the old "scrappy" documentation website, or manually from the design guidelines in Figma. This means that, unless it's already been reviewed and updated, it will require **a lot** of love and editing.

To see how to write markdown and which syntax to use, refer to [the specific Markdown documentation](./Website-Markdown.md).

## Steps to getting started
At any time, you can check out the `components/template` folder to get an idea of how the sections and files should be structured, but here's a list of specific steps to take when updating the documentation for an existing component. 

1. Rename `design-guidelines.md` to `guidelines.md` and move it to `/guidelines`. 
2. Within `guidelines.md`, find the "Anatomy" section and move that into a new file called `anatomy.md`. This new file should live in `/specifications`. Remove that content from `guidelines.md`.
3. Within `guidelines.md`, find the "Accessibility" section (if available) and move that into `/accessibility/accessibility.md`. Remove that content from `guidelines.md`.
4. Update `index.md` according to the change above.
5. Within `index.md`, update the order of content for the "Code" section to be: 
    - how-to-use.md
    - component-api.md
    - showcase.md
6. Remove the old `design guidelines` image and Figma link, if they still exist.
    1. Make sure the associated images are also removed from the `public` folder.
7. Update mentions of "HashiCorp Design System" to "Helios" (in rare cases "Helios Design System") and "the design systems team" to "Helios team". 
8. Replace temporary `Do/Dont` blocks in the design guidelines with [the new "Do/Dont" syntax](./Website-Markdown.md#dodont).
9. Replace content that needs to go in a `Banner` block using [the new specific "Banner" syntax](./Website-Markdown.md#banner).
10. Update the anatomy assets to use the new website colors. This can be done in the [Website Assets file](https://www.figma.com/file/42LK10XbP5IERhzzgMOiI2/Website-assets?node-id=66%3A6622&t=WpqvfoziubA4azgP-0), see [the "Media" documentation](./Website-Media.md) for more details on exporting assets.
11. Check that code snippets work as expected. Speak with Alex Jurubita, if something looks incorrect.
12. Check and update links, as necessary.
    1. If they are **internal/cross-page** links (eg. `/components/alert/`) fix them with the correct route/model.
    2. If they are **external** links (eg. `https://hashicorp.com`) make sure they have `target="blank" rel="noopener noreferrer"`.
    3. If you are not sure what to do, speak with Brian Runnells.

⚠️ **Important**: Leave the **Showcase** section as is, for now. If it breaks the page, try to resolve the issue. We will reconsider this section more holistically in January.


## Content improvement tips
- Check that all headings are in sequential order and that they accurately represent the content within the paragraph.
- Check for and remove extra filler language.
- Look for inaccuracies and misused terminology (eg. if we use the word "description" for the main body text of the `alert`, update "alert message" to "alert description").
- Consider if all banners in the current documentation should really be housed in an alert or if it can be a normal paragraph. 
- Re-organize content into logical chunks. 
    - If it feels like a new topic has started but is a continuation of a paragraph, consider creating a new paragraph for that topic. Bonus points if you can add a meaningful heading above it. 
    - Conversely, if a topic feels related to a prior topic, consider merging them into one section.
- Remove directionality language, such as "see below". This is not inclusive language, nor is it very scalable.
- Check that assets represent what they're meant to.
    - If you need to add/remove assets, see [the "Media" documentation](./Website-Media.md).
- Ensure complete sentences and periods are on the `caption` and `description`.
- Include "(Internal only)" on links that go to internal resources.
- Remove any reference to "Flight" when talking about Icons.

For more information and best practices around content writing, see [the HDS Writing Guidelines](https://docs.google.com/document/d/1WyoJVpWFVgWbCnZ28WW0gRJwJlj-qV5oY0ExhDR2obs/edit?usp=sharing).

## Terminology cheat sheet
- Avoid overusing "Helios Design System" and "the design system", consider "we" or "our" instead (eg. "the design system components" to "our components").
- Never use "a design system", use "the design system", as "a" is impersonal.
- "Use" instead of "utilize" (and other large word swaps in favor of more simple terms). 
- Use contractions when it feels natural. If you'd say "don't" in a conversation use "don't" instead of "do not" in the documentation.
- Use "application" instead of "website".
- Use "product team" when referring to an entire consuming team, instead of "application team".
- Use "consumer" when referring to folks who use the design system.

---

## Reviews (What to expect)
When reviewing documentation, we check for: 
- accuracy
- spelling and grammar
- consistency in voice, tone, and terminology
- instructional design (content hierarchy, how the content flows, can it be easily scanned)

You can expect a few to a few dozen copy edits to update grammar and spelling. It is completely normal to have dozens of copy edit suggestions. You may also receive instructional design recommendations, such as reordering content or adding additional explanations.

### Automated spell checking

When content is updated or added with a pull request spelling is checked automatically in a CI job. Any words that the automated checker (`cspell`) perceives as mispelled will be returned as errors in the job and merging will be blocked.

These errors should be fixed on your local branch prior to merging and can be accomplished by:

1. Running the `cspell` script from the `/website` directory with `yarn lint:spell:docs`.
2. This script will check all markdown files within the `/docs` directory and return any words that it perceives as errors.
3. If an error is returned for a word that you believe is spelled correctly, or is specific to the website project, considering adding it to the `/project-words.txt` file.
    - This file acts as a custom dictionary with relevant brand words (Consul, Helios, HashiCorp) and commonly used documentation language.
    - Double check your spelling using a different resource prior to adding a word the custom dictionary. While rare, `cspell` sometimes throws errors for commonly used words that may be more recent additions to a dictionary or slang terms.
4. Once the errors have been resolved in your local branch add a commit for them and any additions to the custom dictionary and push the changes to your PR.

#### Additional configuration notes

- More documentation on `cspell` can be found [here](https://cspell.org/). This implementation is mostly "out of the box" with very little custom configuration.
- This script currently only checks **markdown** (`.md` files) using a glob in the `/docs` directory, but can easily be extended to check other areas of the application if necessary. Run `yarn cspell "[custom path here]"` to check a specific file or directory.
    - For example: `yarn cspell "/app/templates/about.hbs"` will check the about handlebars template.
- `cspell` configuration can be found in `/cspell.json`
