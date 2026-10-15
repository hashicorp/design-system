## Interactive states

The HDS classic theme uses changes in elevation level to indicate interactivity in the Card. However, in Carbon themes there is no elevation styling. Thus, the `@level`, `@levelHover`, and `@levelActive` arguments have no effect on the visual interaction of the Card.

On Carbon themes, the background color of the card changes on hover to indicate interaction. No visual changes occur on `active`.

<Doc::Carbonization::ComparisonGroup @display="flex" as |CG|>
  {{#each (array "default" "light" "dark") as |context|}}
    <CG.Item @context={{context}}>
      <div class="doc-card-interactive-demo">
        <Hds::Card::Container @level="mid" @levelHover="high" @levelActive="mid">
          <a href="#">
            [Your static content here]
          </a>
        </Hds::Card::Container>
      </div>
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>

## Border

In Carbon themes, cards do not contain borders so the `@hasBorder` argument has no effect.

<Doc::Carbonization::ComparisonGroup @display="flex" as |CG|>
  {{#each (array "default" "light" "dark") as |context|}}
    <CG.Item @context={{context}}>
      <Hds::Layout::Flex @gap="16" class="doc-card-list-demo">
        <Hds::Card::Container @hasBorder={{false}} class="doc-card-list-demo__item">
          Without border
        </Hds::Card::Container>
        <Hds::Card::Container @hasBorder={{true}} class="doc-card-list-demo__item">
          With border
        </Hds::Card::Container>
      </Hds::Layout::Flex>
    </CG.Item>
  {{/each}}
</Doc::Carbonization::ComparisonGroup>