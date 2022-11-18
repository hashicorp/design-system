---
category: components
group: form
component: textarea
section: how-to-use
---

# Form::Textarea Component - How to use

Note: depending on how you're going to process the user input upon submission (eg. server-side via form `POST` or client-side using JavaScript) you will need to provide a `name` attribute or a custom `ID` attribute to the field. Since the decision on how to process the input data is left to the consumers, in the examples provided we will omit these specific arguments, for sake of simplicity.

As mentioned above, there are two possible ways to use the `Form::Textarea` component: using the "base" variant (essentially just the control itself) or using the "field" variant (the control plus label, helper text and error).

The "field" one is the one that you will likely want to use, because it provides – for free and out of the box – a lot of accessibility-related functionalities. The "base" one is to be used if and when you need to achieve custom layouts or have special use cases not covered by the "field" variant.

{{! ================= }} {{! ===== FIELD ===== }} {{! ================= }}

#### Form::Textarea::Field

##### Basic use

The simplest way to invoke a "textarea" field is using something like this:

```handlebars
<Hds::Form::Textarea::Field as |F|>
  <F.Label>Short description</F.Label>
</Hds::Form::Textarea::Field>
```

Renders to:

Short description

This "field" component creates:

*   a `<label>` element with a `for` attribute automatically associated with the textarea `ID` attribute
*   a `<textarea>` control with an automatically generated `ID` attribute

##### Textarea value

You can pre-populate the textarea passing to it a `@value` argument:

```handlebars
<Hds::Form::Textarea::Field @value="This is my description" as |F|>
  <F.Label>Short description</F.Label>
</Hds::Form::Textarea::Field>
```

Renders to:

Short description

##### Helper text

You can add extra information to the field using an "helper" text:

```handlebars
<Hds::Form::Textarea::Field @value="This is my description" as |F|>
  <F.Label>Short description</F.Label>
  <F.HelperText>Add a short description about the workspace you are creating.</F.HelperText>
</Hds::Form::Textarea::Field>
```

Renders to:

Short description Add a short description about the workspace you are creating.

When the "helper" text is added, the component automatically adds an `aria-describedby` attribute to the textarea control, associating it with the automatically generated `ID` of the helper text element.

##### Extra content in label and helper text

The `Label` and `HelperText` contextual components used in the "field" are yielding their content: this means you can pass not just plain text, but also structured content. For example:

```handlebars
<Hds::Form::Textarea::Field as |F|>
  <F.Label>Short description <Hds::Badge @size="small" @text="Beta" /></F.Label>
  <F.HelperText>This is an experimental feature (<Hds::Link::Inline @href="#">read more</Hds::Link::Inline>).</F.HelperText>
</Hds::Form::Textarea::Field>
```

Renders to:

Short description This is an experimental feature (read more).

_Notice: If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. Interactive elements in text (associated with the textarea through aria-describedby) will not be read out as interactive elements to users with screen readers; only the text itself will be read. As such, it is recommended to have a screen reader-only message that informs the user that some help text includes link, and additional keyboard exploration may be required. As such, it is generally preferable to avoid links within help/error text or labels; however, we understand that this may not be avoidable in some cases. Please use sparingly until a good known alternative approach is determined._

##### Required / Optional

It's possible to add a visual indication if a field is "required" or is "optional" using the `@isRequired` and `@isOptional` arguments:

```handlebars
<Hds::Form::Textarea::Field @isRequired={{true}} as |F|>
  <F.Label>Short description</F.Label>
  <F.HelperText>Add a short description about the workspace you are creating.</F.HelperText>
</Hds::Form::Textarea::Field>
<br />
<Hds::Form::Textarea::Field @isOptional={{true}} as |F|>
  <F.Label>Short description</F.Label>
  <F.HelperText>Add a short description about the workspace you are creating.</F.HelperText>
</Hds::Form::Textarea::Field>
```

Renders to:

Short description Add a short description about the workspace you are creating.  
Short description Add a short description about the workspace you are creating.

_Notice: for complex forms we suggest to indicate **required** fields, since this is the most explicit and transparent method and ensures users don’t have to make assumptions. For shorter, simpler forms (ie. login/signup and feedback requests) we suggest to indicate **optional** fields._

##### Validation

Notice: the validation of the form fields is entirely delegated to the "consumer" of the HDS components. What we provide is the visual representation of an invalid state of the field at UI level. When and how to provide this visual feedback to the user is responsibility left to the developer.

To show the user that their input is not valid, you have to do two things: declare that the field is "invalid" (using the `@isInvalid`) argument and provide an error message (using the `Error` contextual component):

```handlebars
<Hds::Form::Textarea::Field @value="A" @isInvalid={{true}} as |F|>
  <F.Label>Short description</F.Label>
  <F.Error>Error: the description text is too short.</F.Error>
</Hds::Form::Textarea::Field>
```

Renders to:

Short description Error: the description text is too short.

It's possible to provide more than one error message using the more specific `Message` contextual component:

```handlebars
<Hds::Form::Textarea::Field @value="&lt;a&gt;" @isInvalid={{true}} as |F|>
  <F.Label>Short description</F.Label>
  <F.Error as |E|>
    <E.Message>Length should be at least 12 characters</E.Message>
    <E.Message>Can not contain HTML</E.Message>
    <E.Message>B</E.Message>
  </F.Error>
</Hds::Form::Textarea::Field>
```

Renders to:

Short description Length should be at least 12 characters Can not contain HTML

##### Custom control ID

In case it's necessary to have custom ID for the control, instead of the one automatically generated by the component (eg. because it needs to be referenced in the code for other reasons), you just need to pass a `@id` argument to the "field":

```handlebars
<Hds::Form::Textarea::Field @id="my-control" as |F|>
  <F.Label>Short description</F.Label>
  <F.HelperText>Add a short description about the workspace you are creating.</F.HelperText>
</Hds::Form::Textarea::Field>
```

_Notice: in this case all the internal references (`id/for/aria-describedby`) between the different parts of the field are still automatically generated, only they will use the custom ID provided._

##### Extra "aria-describedby"

If you want to connect one or more extra elements describing the field to the control, it's possible to provide extra ID values to the `aria-describedby` attribute of the control, in addition to the ones automatically generated by the component, passing a `@extraAriaDescribedBy` argument to the "field":

```handlebars
<Hds::Form::Textarea::Field @extraAriaDescribedBy="my-extra-element-ID" as |F|>
  <F.Label>Short description</F.Label>
  <F.HelperText>Add a short description about the workspace you are creating.</F.HelperText>
</Hds::Form::Textarea::Field>
```

##### HTML native attributes

As explained above in the [Component API](#component-api) section, the textarea "field" supports the `...attributes` spreading of HTML attributes over the `<textarea>` element. This means you can use all the standard HTML attributes of the `<textarea>` element.

```handlebars
<Hds::Form::Textarea::Field name="description" placeholder="Workspace description" minlength="4" maxlength="1024" as |F|>
  <F.Label>Short description</F.Label>
</Hds::Form::Textarea::Field>
```

Renders to:

Short description

This can be useful in case you want to add specific native behaviors to the field, that are not exposed directly by the component (eg. providing a `name` for the control, or adding `min` `max` `minlength` `maxlength` `pattern` attributes to it)

##### Events handling

Thanks to the `...attributes` spreading over the `<textarea>` element, you can use as well all the usual Ember techniques for event handling, validation, etc.

```handlebars
<Hds::Form::Textarea::Field placeholder="Workspace description" {{on "blur" myAction}} as |F|>
  <F.Label>Email</F.Label>
</Hds::Form::Textarea::Field>
```

Renders to:

Email

You can use different events, depending on your context/need (eg. `input`, `blur`, `change`).

##### Custom width

By default the textarea control width is set to fill the parent container. It's possible to pass a custom width for the control using the `@width` argument:

```handlebars
<Hds::Form::Textarea::Field @width="200px" as |F|>
  <F.Label>Short description</F.Label>
</Hds::Form::Textarea::Field>
```

Renders to:

Short description {{! ================= }} {{! ===== BASE ===== }} {{! ================= }}

#### Form::Textarea::Base

As mentioned above, the "base" element is intended **only** for those rare cases where the "field" variant can't be used, and a custom implementation needs to be done. For this reason we will not go too much in detail on how to use it: most of the explanations above apply also to the "base" variant of the component, and for further details refer to the [Component API](#component-api) section on this page, or speak with one of the design system team members.

Notice: when the "base" textarea is used, the developer is completely responsible for the correct implementation of the form control, including its accessibility conformance.

To give just an example, this could be an invocation of the "base" component you would use:

```handlebars
<Hds::Form::Textarea::Base
  @value="My workspace"
  aria-label="Short description"
  placeholder="Workspace description"
  @isRequired={{true}}
  {{on "blur" myAction}}
/>
```

Renders to:

This "base" component creates just the `<textarea>` control with an automatically generated `ID` attribute.