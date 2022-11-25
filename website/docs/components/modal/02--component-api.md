---
title: Modal
category: components
component: modal
section: component-api
---

Here is the API for the component:

<Doc::ComponentApi as |C|><C.Property @name="size" @type="enum" @value="small medium large" @default="medium">Sets the width of the modal.</C.Property><C.Property @name="color" @type="enum" @value="neutral warning critical" @default="neutral">Sets the color scheme for the modal header elements: icon, tagline and title.</C.Property><C.Property @name="onOpen" @type="function" @value="–">Callback function invoked when the modal is opened.</C.Property><C.Property @name="onClose" @type="function" @value="–">Callback function invoked when the modal is closed.</C.Property><C.Property @name="isDismissDisabled" @type="boolean" @value="–">Set this boolean to `true` if you want to prevent the modal from being closed (for instance, to avoid accidental data loss in an unsubmitted form). Make sure you communicate to users the reason why the modal is still open, and what they need to do to resolve the problem that is preventing the modal from being closed.</C.Property><C.Property @name="...attributes" @type="–" @value="–">`...attributes` spreading is supported on this component.</C.Property></Doc::ComponentApi>

#### Contextual components

The title, the content of the modal dialog, and the actions are passed into the modal as yielded components, using the `Header`, `Body`, `Footer` keys.

##### Modal::Header

It is a container that yields its content as the title of the modal dialog.

<Doc::ComponentApi as |C|><C.Property @name="icon" @type="string" @value="–">[Flight](https://flight-hashicorp.vercel.app/) icon name.</C.Property><C.Property @name="tagline" @type="string" @value="–">A string that helps the user maintain context when a modal dialog is open. (Note: this is NOT the title text, but a small piece of text above the title text.)</C.Property><C.Property @name="...attributes" @type="–" @value="–">`...attributes` spreading is supported on this component.</C.Property></Doc::ComponentApi>

##### Modal::Body

It is an unstyled, generic container that yields as the main content of the modal dialog.

This container gets a scrollbar when the yielded content exceeds the available space.

`...attributes` spreading is supported on this component.

##### Modal::Footer

It is a container that yields its content as the footer of the modal dialog.

We recommend using it exclusively for actions using the [`ButtonSet`](/components/button-set/01_overview/) component. If a tertiary action is presented, it will always be aligned at the end of the row.

<Doc::ComponentApi as |C|><C.Property @name="close" @type="function" @value="–">–</C.Property><C.Property @name="...attributes" @type="–" @value="–">`...attributes` spreading is supported on this component.</C.Property></Doc::ComponentApi>