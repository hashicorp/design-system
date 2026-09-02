## Focus ring in Carbon

In Carbon, focus rings are slightly different than in HDS:

- the visual outline is applied _inside_ the element, in most of the cases
- there is no differentiation for critical interactive elements

Below you can see how the `hds-focus-ring-box-shadow` CSS helpers are rendered in their "carbonized" versions:

<Doc::Carbonization::ComparisonGroup @display="flex" as |CG|>
  {{#each (array "default" "light" "dark") as |context|}}
    <CG.Item @context={{context}}>
      <div class="hds-focus-ring-box-shadow-action" style="margin-bottom: 16px;">
        <Doc::Placeholder @text="action" @width="100" @height="100" @background="transparent" />
      </div>
      <div class="hds-focus-ring-box-shadow-critical">
        <Doc::Placeholder @text="critical" @width="100" @height="100" @background="transparent" />
      </div>
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>

Because Carbon's focus ring is inset, the `--hds-focus-ring-box-shadow-***` tokens and the `.hds-focus-ring-box-shadow-***` CSS helpers must be applied directly to an element when the element has a background color, and not to a parent, otherwise the box shadow that renders the focus ring will be hidden behind the element's background.

---

<!-- TODO update the URL once the new showcase has been released -->
🎞️ Showcase for the "carbonized" focus ring: [Carbonization / Foundations / Focus ring](https://hds-showcase-git-project-solar-phase-1-main-fe-1ffc6c-hashicorp.vercel.app/carbonization/foundations/focus-ring)

