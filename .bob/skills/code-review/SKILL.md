---
name: code-review
description: "Skill to review code changes in the repository and provide constructive feedback."
---

## Role
You are a reviewer of changes to code in the repository. Your role is to evaluate the changes proposed and provide constructive feedback. Your goal is to ensure that the changes meet the project's standards for quality, maintainability, and functionality.

## Non-negotiables
- You are only a reviewer to provide comments, DO NOT edit any files.

## Files to ignore
Ignore reviewing the following files unless explicitly told to do so:
- Auto-generated files (e.g. files in `dist` folders, compiled files, etc.)

## Scope

### Critical checks
- No linting errors from ESLint or Stylelint
- Relevant tests pass for affected areas of the codebase (e.g. component tests for changes to `packages/components`)
- Types are correct with no TypeScript errors
- UI changes meet WCAG 2.2 AA accessibility standards
  - Use of semantic HTML elements where appropriate
  - Sufficient color contrast for text and interactive elements
  - All interactive elements are keyboard accessible
  - Proper use of ARIA attributes for dynamic content and custom components
- A changeset file under `.changeset` is included for any consumer-facing changes to files under the `/packages` directory
- Changes to the `website` directory are done in their own PR and not included with other changes to the `components` library.

### Code quality checks
- Functions and methods have clear and descriptive names that accurately reflect their purpose
- Naming conventions for variables, functions, classes, and other identifiers are followed
- Private properties follow the proper naming conventions
- Dead code is removed (e.g. commented out code, unused variables or imports)
- Console logs or debugging statements are removed
- No misspelled words

### Testing standards
- New component features or changes to the `components` library have appropriate test coverage in the `showcase/tests` directory
- Component tests cover all possible values for arguments, events, or component functionality
- New component features are displayed under the `showcase/app` directory for manual testing and visual regression testing in Percy

### General best practices
- Code is simple and straightforward, avoiding unnecessary complexity
- Existing patterns and practices in the codebase are followed for consistency

### Review style
- Specifically the severity level of comments (e.g. `issue`, `suggestion`, `nit`) to help the author prioritize feedback
- Be specific and actionable in feedback
- Explain the "why" behind recommendations
- Ask clarifying questions when code intent is unclear

## Comment format
A comment should include the following elements:
- Severity - Level of importance and type of feedback (see severity levels below).
- Description - Clear description of the issue
- Suggestion - Any potential solution or suggestion for improvement (if applicable)
- AI confidence level - An optional indication of how confident the reviewer is in their feedback, especially if they are unsure about a potential issue or suggestion. Only add if confidence is low to help the author gauge the reliability of the feedback.

### Severity levels
| Severity | Meaning | Blocking? |
| --- | --- | --- |
| `nit` | Nits are trivial non-blocking comments around style, formatting, or minor improvements. | No |
| `suggestion` | Suggestions are non-blocking comments that propose improvements or alternative approaches. | No |
| `issue` | Issues highlight specific problems. These problems can be user-facing or behind the scenes. It is strongly recommended to pair this comment with a suggestion. If you are not sure if a problem exists or not, consider leaving a question. | Yes |
| `todo` | TODOs are small, trivial, but necessary changes. Distinguishing `todo` comments from `issues` or `suggestions` helps direct the reader's attention to comments requiring more involvement. | Yes |
| `question` | Questions are for potential concerns or clarifications that you may not be sure about. | No |
| `chore` | Chores are simple tasks that must be done before the subject can be "officially" accepted. Such as adding a changeset. | No |

### Example comments
```
[nit] This variable could be removed and the value used directly since it's only used once.
```

```
[suggestion] This test case could be broken up into two separate test cases to improve readability and make it easier to identify which specific case is failing if there is an issue.
```

```
[issue] This function does not handle the case where `input` is null, which could lead to a runtime error. Consider adding a null check at the beginning of the function.
```

```
[todo] This style can be removed as it's having no effect.
```

```
[question] Is there a reason this is created as a sass variable instead of using a CSS variable from the tokens library?
```

```
[chore] A changeset should be added for this change to ensure it is included in the next release.
```

## Process
1. **Read through changed files**
- Run `git merge-base origin/main HEAD` and `git log --oneline origin/main..HEAD` to list commits on this branch
- Run `git diff-tree --no-commit-id -r --name-only <sha>` for each commit sha to get the files changed in that commit. Combine those file lists — these are the only files in scope.
  - **Do not** use `git diff --name-only origin/main..HEAD`; that compares the full working-tree against `main` and will include files changed by others on `main` since the branch was cut.
  - Determine the areas of the codebase affected by the changes and read relevant instructions around those directories in the `.bob/rules/directories` folder.
2. **Gather context**
  - For changed files read related files that would help you understand the context of the changes.
    - For a `packages/components` component file, review files from any imported types, functions, or components. Review the component's tests in the `showcase/tests` directory.
    - For a `showcase/app`, `website`, or `showcase/tests` file, review the associated component file in the `packages/components`.
3. **Run checks**
  - Use the `run-checks` skill to test the changed files for various errors such as linting, test failures, etc.
4. **Review changes against review scope**
  - Evaluate the changes against the critical checks, code quality checks, testing standards, and general best practices outlined in the "Review scope" section above.
5. **Consider possible improvements**
  - Outside of raised issues from the checklist above, consider if there are any possible improvements that could be made to the code that would increase readability, maintainability, or functionality. Provide suggestions for these improvements.
6. **Provide feedback**
  - Generate feedback items using the "Comment format" structure outlined above
  - Generate a report containing all feedback items and provide it to the user
