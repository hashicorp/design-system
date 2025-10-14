/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { eq } from 'ember-truth-helpers';
import style from 'ember-style-modifier';

import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwLabel from 'showcase/components/shw/label';

export interface CodeFragmentWithDemoInstructionsSignature {
  Args: {
    demo?: 'dynamic-inputs' | 'validation-and-limit';
  };
  Element: HTMLDivElement;
}

const CodeFragmentWithDemoInstructions: TemplateOnlyComponent<CodeFragmentWithDemoInstructionsSignature> =
  <template>
    <ShwTextH4 @tag="h3">Instructions</ShwTextH4>
    <ShwLabel {{style margin-bottom="32px"}}>
      You can use this example to test a few different things:
      <ul {{style line-height="1.5"}}>
        {{#if (eq @demo "validation-and-limit")}}
          <li>Try to submit the form when all the fields are empty → Validation
            errors should appear on the "Name" and "List of tags" fields</li>
          <li>Fill in the "Name" and "Description" fields and submit →
            Validation errors should now only be on the "List of tags" field</li>
          <li>Fill in the first "Tag" row and submit → The form should be
            submitted (emulated with an alert)</li>
          <li>Add a second "Tag" and fill its "Tag name" field using a different
            name and submit → The form should be submitted</li>
          <li>Add a third "Tag" and fill its "Tag name" field with the same
            value as the first tag and submit → A validation error should appear
            below the two duplicate "Tag name" fields</li>
          <li>Delete one of the duplicate tags and submit → The form should be
            submitted</li>
          <li>Delete the remaining rows → The "delete button" should disappear
            when there is only one remaining row</li>
          <li>Try to addd/delete rows → See how the "delete button"
            appears/disappears</li>
          <li>Click the "Reset" button → The entire content of the form should
            return to its initial state</li>
          <li>Now toggle the "Always show delete button on first row" → The
            "delete button" on the first row will always be visible</li>
          <li>You can now repeat the previous steps about adding/deleting rows →
            See how the "delete button" works for the different rows, including
            when the last row has content and the tag fields are filled in that
            row</li>
        {{else}}
          <li>Try to submit the form when all the fields are empty → Validation
            error should appear on the "Name" field</li>
          <li>Fill in the "Name" and "Description" fields and submit → The form
            should be submitted (emulated with an alert)</li>
          <li>Fill in the first "Key Value Pair" row and submit → The form
            should be submitted (you can see the submitted data in the alert)</li>
          <li>Add a second "Key Value Pair" and and use a different type of key
            and submit → The form should be submitted</li>
          <li>Add a third "Key Value Pair" and and submit → The form should be
            submitted</li>
          <li>Delete the remaining rows → The "delete button" should disappear
            when there is only one remaining row</li>
          <li>Try to add/delete rows → See how the "delete button"
            appears/disappears</li>
          <li>Click the "Reset" button → The entire content of the form should
            return to its initial state</li>
          <li>Now toggle the "Always show delete button on first row" → The
            "delete button" on the first row will always be visible</li>
          <li>You can now repeat the previous steps about adding/deleting rows →
            See how the "delete button" works for the different rows, including
            when the last row has content and the "Key Value Pair" fields are
            filled in that row</li>
        {{/if}}
      </ul>
    </ShwLabel>
  </template>;

export default CodeFragmentWithDemoInstructions;
