# Test with complex content

This is a test using `ember-cli-markdown-it-templates` and markdown that contains nested Ember components and markdown

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

<!-- THIS DOES NOT WORK AS INTENTED -->
<doc-do-dont>
  Do this:
  - this
  - and this
</doc-do-dont>

<!-- THIS GENERATES A DIV WITHOUT A <p> WRAPPER -->
<div>
Do this:
- this
- and this
</div>