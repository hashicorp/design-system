# Test "do/dont" component

This is a test using the `Doc::DoDont` component

<!-- THIS DOES NOT WORK AS INTENTED -->
<Doc::DoDont as |dd|>
  <dd.Do>
    Do this:
    - this
    - and this
  </dd.Do>
  <dd.Dont>
    But don't do this:
    - not this
    - and expecially not this
    > this should be a block quote
  </dd.Dont>
</Doc::DoDont>

<!-- THIS DOES NOT WORK AT ALL (IT CRASHES THE APP) -->
<!--
<Doc::DoDont as |dd|>
<dd.Do>
Do this:
- this
- and this
</dd.Do>
<dd.Dont>
But don't do this:
- not this
- and expecially not this
> this should be a block quote
</dd.Dont>
</Doc::DoDont>
-->

<!-- THIS DOES NOT WORK AT ALL (IT CRASHES THE APP) -->
<!--
<doc-do-dont>
  Do this:
  - this
  - and this
</doc-do-dont>
-->

<!-- THIS GENERATES A DIV WITHOUT A <p> WRAPPER -->
<div>
Do this:
- this
- and this
</div>