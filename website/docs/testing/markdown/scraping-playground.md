---
title: Scraping playground
---

# DOC Components>

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
