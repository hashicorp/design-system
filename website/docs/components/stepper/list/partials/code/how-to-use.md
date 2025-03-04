## How to use this component

```handlebars
<Hds::Stepper::List as |S|>
  <S.Step>
    <:title>One</:title>
  </S.Step>
  <S.Step>
    <:title>Two</:title>
  </S.Step>
  <S.Step>
    <:title>Three</:title>
  </S.Step>
</Hds::Stepper::List>
```

### Indicating status

To change the status of a Step, set the `@status` argument in the `[S].Step` contextual component. The default status value is `incomplete`.

```handlebars
<Hds::Stepper::List as |S|>
  <S.Step @status="complete">
    <:title>Completed step</:title>
  </S.Step>
  <S.Step @status="progress">
    <:title>Current step</:title>
  </S.Step>
  <S.Step>
    <:title>Upcoming step</:title>
  </S.Step>
</Hds::Stepper::List>
```

A `processing` status is used instead of `progress` to indicate an ongoing process in the background, such as a user's data being submitted.

```handlebars
<Hds::Stepper::List as |S|>
  <S.Step @status="complete">
    <:title>Completed step</:title>
  </S.Step>
  <S.Step @status="processing">
    <:title>Current step</:title>
  </S.Step>
  <S.Step>
    <:title>Upcoming step</:title>
  </S.Step>
</Hds::Stepper::List>
```


### Additional information

Using the named `<:title>` block is required. Additional information for a step is added through the named blocks `<:description>` and `<:content>`.


```handlebars
<Hds::Stepper::List as |S|>
  <S.Step @status="complete">
    <:title>Completed step</:title>
    <:description>Step description</:description>
  </S.Step>
  <S.Step @status="progress">
    <:title>Current step</:title>
    <:description>Step description</:description>
    <:content>
      <Hds::Button @text="Do step action" />
    </:content>
  </S.Step>
  <S.Step>
    <:title>Upcoming step</:title>
    <:description>Step description</:description>
  </S.Step>
</Hds::Stepper::List>
```
