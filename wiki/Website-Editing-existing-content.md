# Website / Editing existing content (playbook)

- [Website / Editing existing content (playbook)](#website--editing-existing-content-playbook)
  - [Frontmatter](#frontmatter)
  - [Markdown content](#markdown-content)
  - [Things to check/fix:](#things-to-checkfix)

---

🚨 To be extended/integrated with the work @Heather Larsen is doing. 🚨

Below you can find a ;ist of things to do when working on the content of an existing documentation page.

## Frontmatter
Check that the correct frontmatter attributes are in place. Technically, only the `title` is required, but depending on the page other attributes may be needed as well. Please refer to [the "Frontmatter" documentation](./Website-Doc-folder.md#frontmatter) for details about what attributes are recognized and how to use them, or check in similar pages what attributes are used.

## Markdown content
Large portion of the content in the new documentation website has been ported or automatically, from the old "scrappy" documentation website, or manually from the design guidelines in Figma. This means that, unless it's already been reviewed an updated, it will require **a lot** of love and editing.

🚧 Heather not sure how to fit your content in this section or otherwise how to reorganize the entire content of this document file. I'll leave it to you to figure out 😀

To see how to write markdown and which syntax to use, refer to [the specific Markdown documentation](./Website-Markdown.md).

## Things to check/fix:

- Check all the headings in the page (titles and levels)
- Replace temporary `Do/Dont` blocks in the design guidelines with [the new "Do/Dont" syntax](./Website-Markdown.md#dodont)
- Replace content that needs to go in a `Banner` block using [the new specific "Banner" syntax](./Website-Markdown.md#banner)
- Check that code snippets work as expected (if not, speak with Alex Jurubita)
- Remove content related to the old `design guidelines` (preview image + link to Figma file) if still exist
    - Make sure the associated images are removed from the `public` folder too
- Check all the links
    - If they are **internal/cross-page** links (eg. `/components/alert/`) fix them with the correct route/model
    - If they are **external** links (eg. `https://hashicorp.com`) make sure they have `target="blank" rel="noopener noreferrer"`
    - If you are not sure what to do, speak with Brian Runnells
- Assets
    - Check that what they represent is still correct
    - If you need to add/remove assets, see [the "Media" documentation](./Website-Media.md).
- "Showcase" section
    - Leave it as is for now, (unless it breaks the page) as we will re-consider the "Showcase" holistically in January (we have to understand how to use it in the context of the new documentation format).

