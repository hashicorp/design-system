---
title: Remove auto p playground
---

## Doc::Badge

<Doc::Badge @type="neutral">Spacebar</Doc::Badge>

### Doc::Banner

!!! Info

Lorem ipsum

<Hds::Button @text="Dolor" />

!!!


### Test inline with heading <Doc::Badge @type="neutral">Spacebar</Doc::Badge>

Test inline with paragraph <Doc::Badge @type="neutral">Spacebar</Doc::Badge>

- <Doc::Badge @type="neutral">Spacebar</Doc::Badge>
- Test inline within a list item <Doc::Badge @type="neutral">Spacebar</Doc::Badge>

## Doc::ComponentApi

<Doc::ComponentApi as |C|>
<C.Property @name="test">Lorem</C.Property>
</Doc::ComponentApi>

## Doc::Content

<Doc::Content::HdsPrinciples />

### Doc::DoDont

!!! Do

Lorem ipsum

<Hds::Button @text="Dolor" />

!!!

!!! Dont

Sit amet

<Hds::Button @text="Consectetur" />

!!!

### Doc::A11ySupport

<Doc::A11ySupport />

## Doc::FontHelpersList

<Doc::FontHelpersList @items={{this.fontHelpersDemo}} />

## Doc::Layout

<Doc::Layout @spacing="16px"><div>block 1</div><div>block 2</div><div>block 3</div></Doc::Layout>

## Doc::TokensList

<Doc::TokensList @groupedTokens={{this.tokensDemo}} />

## Doc::VarsList

<Doc::VarsList @items={{this.varsListDemo}} />

## Doc::WcagList

<Doc::WcagList @criteriaList={{array "1.1.1" "1.2.3"}} />
