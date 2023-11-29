---
title: Scraping playground
---

# DOC Components

<Doc::WcagList @criteriaList={{array "1.1.1" "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.4.3" "2.4.6" "2.4.7" "2.5.3" "3.2.1" "3.2.4" "4.1.1" "4.1.2" }} />

<Doc::ComponentApi as |C|>
  <C.Property @name="<[G].Legend>" @type="yielded component">
    Optional container that yields its content inside the `<legend>` element. The content can be a simple string or a more complex/structured string, in which case it inherits the text style. For details about its API, check the [`Form::Legend`](/components/form/primitives) component.
  </C.Property>
  <C.Property @name="<[G].HelperText>" @type="yielded component">
    Container that yields its content inside the “helper text” block at group level. The content can be a simple string or a more complex/structured string, in which case it inherits the text style. For details about its API, check the [`Form::HelperText`](/components/form/primitives) component.
    <br/><br/>
    The `id` attribute of the element is automatically generated.
  </C.Property>
  <C.Property @name="<[G].Checkbox::Field>" @type="yielded component">
    Used to yield one or more fields inside the group. For details about its API, check the `Form::Checkbox::Field` API details.
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

<!-- content": "To add a logo to the \"header\" of the SideNav use the <div hds-side-nav-header-home-link>  sub-component.", -->

