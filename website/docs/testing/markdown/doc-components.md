---
title: DOC Components
---

## Doc::Badge

<Doc::Badge @type="neutral">Spacebar</Doc::Badge>

## Doc::Banner

<Doc::Banner @type="info"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultrices, sapien vel rutrum tristique, dolor quam convallis sapien, dignissim tincidunt libero turpis sit amet urna.</p></Doc::Banner>

## Doc::Card

- <Doc::Cards::Card @image={{this.card.image}} @title={{this.card.title}} @caption={{this.card.caption}} @route={{this.card.route}} @model={{this.card.model}} @href={{this.card.href}} @layout="horizontal" {{doc-track-event eventName=(concat "Related - " @componentTitle " - " this.card.title)}} />

## Doc::ColorCard

<Doc::ColorCard @color={{this.colorCard}}></Doc::ColorCard>

## Doc::ColorSwatch

<!-- algolia-ignore-start -->
<div>
  {{#each this.colors.semantic.focus as |color|}}
    <Doc::ColorSwatch @color={{color}} />
  {{else}}
    <p>No tokens found for “semantic/focus” colors.</p>
  {{/each}}
</div>
<!-- algolia-ignore-end -->

## Doc::ComponentApi

<Doc::ComponentApi as |C|>
<C.Property @name="<:toggle>" @type="named block">
A named block that works as “toggle” for the `AccordionItem`.
</C.Property>
<C.Property @name="type" @required="true" @type="enum" @values={{array "page" "inline" "compact"}}>
Sets the type of alert.
</C.Property>
<C.Property @name="color" @type="enum" @values={{array "neutral" "highlight" "success" "warning" "critical"}} @default="neutral">
Sets the color scheme for `background`, `border`, `title`, and `description`, which **cannot** be overridden.<br/><br/>`color` results in a default `icon`, which **can** be overridden.
</C.Property>
<C.Property @name="...attributes">
This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
</C.Property>
<C.Property @name="<[G].Error>" @type="yielded component">
Container that yields its content inside the “error” block at group level. The content can be a simple string or a more complex/structured string, in which case it inherits the text style. For details about its API check the [`Form::Error`](/components/form/primitives) component.
<br/><br/>
The `id` attribute of the `Error` element is automatically generated.
<Doc::ComponentApi as |C|>
<C.Property @name="<[E].Message>" @type="yielded component">
If the error is made of multiple messages, you can iterate over a collection of error messages yielding individual items using `Error.Message`.
</C.Property>
</Doc::ComponentApi>
</C.Property>
</Doc::ComponentApi>

## Doc::Content

<Doc::Content::HdsPrinciples />

## Doc::CopyButton

For components that are inline elements we can add to an exclusion array in 'website/app/shared/showdown-extensions/remove-auto-p-tags.js' so that the default showdown wrapping p is not omitted.

<Doc::CopyButton @textToCopy="Yay!" @type="solid" />

If we omit a line return after our markdowon paragraph text the inline element will roll-up into our paragraph like so.
<Doc::CopyButton @textToCopy="Yay!" @type="solid" />

<!-- Header included in component, so omit here so  that it is not indexed twice -->

<Doc::RelatedComponents @cards={{this.relatedComponents}} @componentTitle={{this.title}} />

<!-- Header included in component, so omit here so  that it is not indexed twice -->

<Doc::A11ySupport />

## Doc::DoDont

<Doc::DoDont @type="do">Do this</Doc::DoDont>
<Doc::DoDont @type="dont">Do NOT do this</Doc::DoDont>

## Doc::FontHelpersList

<Doc::FontHelpersList @items={{this.fontHelpers.styles}} />

## Doc::Form::Filter

<Doc::Form::Filter
@isCompact={{true}}
@filterQuery={{this.filterQuery}}
@placeholder="Filter sidebar"
autocomplete="off"
autocorrect="off"
autocapitalize="none"
spellcheck="false"
@onInput={{this.filterPageTree}}
/>

## Doc::IconsList

<Doc::IconsList
@groupedIcons={{this.icons}}
@onSelectGroupType={{this.selectGroupType}}
@selectedGroupType={{this.selectedGroupType}}
@onSelectIconSize={{this.selectIconSize}}
@selectedIconSize={{this.selectedIconSize}}
@searchQuery={{this.searchQuery}}
@searchIcons={{this.icons}}
/>

## Doc::Layout

<Doc::Layout @spacing="16px"><div>block 1</div><div>block 2</div><div>block 3</div></Doc::Layout>

## Doc::LinkWithIcon

Link with Icon component has been added to the excludedInlineElements array inside the remove-auto-p-tags showdown extension as it renders an inline link or button

<Doc::LinkWithIcon
@route="show"
@model="whats-new/release-notes"
@label="Link with Icon"
@icon="arrow-right"
@isAnimated={{true}}
@eventName="Link - With Icon"
/>

If you omit a line return the Link with Icon button or link will be rolled up into your paragraph text like this <Doc::LinkWithIcon
@route="show"
@model="whats-new/release-notes"
@label="Link with Icon"
@icon="arrow-right"
@isAnimated={{true}}
@eventName="Link - With Icon"
/>

## Doc::Placeholder

<Doc::Placeholder @text="some generic content" @height="50" @background="#eee" />

## Doc::TokenPreview

<Doc::TokenPreview @token={{this.token}} />

## Doc::TokensList

<!-- algolia-ignore-start -->

<Doc::TokensList @groupedTokens={{this.tokens}} />

<!-- algolia-ignore-end -->

## Doc::VarsList

<!-- algolia-ignore-start -->

<Doc::VarsList @items={{this.cssHelpers.elevations}} />

<!-- algolia-ignore-end -->

## Doc::WcagList

<Doc::WcagList @criteriaList={{array "1.1.1" "1.2.3"}} />
