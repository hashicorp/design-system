- Prettier https://github.com/hashicorp/design-system/pull/2206
    rebased & merged Prettier 3 update for all repos
- Hds-1366 [ Prevent showdown auto p tag around block elements ]
    https://github.com/hashicorp/design-system/tree/HDS-1366-Prevent-showdown-wrapping-everthing-in-a-p-tag
    - Created a showdown extension to prevent wrapping everything in a p tag https://github.com/hashicorp/design-system/commit/5a86f914d52491b91d19e834076c779a146bed55
    - Added an inline exclusion array for excluding the p tag removal from elements we want to be encapsulated in a p tag https://github.com/hashicorp/design-system/commit/cd99b9795a4525205a11ad92aebfe6a008e885ac
    - Create a new test page to ensure that all  <Doc:: and <Hds:: components have the auto p tag removal applied and excluded elements are encapsulated in a p tag https://github.com/hashicorp/design-system/commit/045864d668ac0d39adb1edb47cbd3b7db95c3123
    - Added a talking point to tomorrow's Engineering sync to get feedback on new showdown extension


Meetings & Trainings:
Design System Sync
PLC Commit gate process onboarding training
What to expect onboarding prep work
What to expect onboarding training

Development:
Will gather any preliminary feedback  from showdown auto p removal proposed  solution before tomorrow's engineering sync.
Will continue building out test page with all Doc Components and create an additional test page of Hds components to validate code.