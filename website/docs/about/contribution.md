---
title: Contribution
description: How to collaborate with the Design Systems Team and contribute to the Helios Design System.
navigation:
  order: 104
---

!!! Info

We’re currently accepting collaborations only from HashiCorp employees. Some resources and links on this page are only available to HashiCorp employees.

!!!

Thank you for your interest in contributing to the Helios Design System. We think of contributions as an opportunity for **collaboration across teams** and are open to various forms of collaboration, even direct contribution, as long as they follow our [collaborative process](/about/contribution/#our-collaborative-process). 

## Collaboration types

Possible forms of collaboration include, but are not limited to: 

- [Direct contributions](/about/contribution/#direct-contributions), such as bug fixes, documentation improvements, small enhancements to existing artifacts, etc.
- New artifacts, such as icons, components, patterns, etc.
- Obtaining support, feedback, and usage guidance from the Design Systems Team.

## Direct contributions

We support a small number of autonomous but coordinated direct contributions. These include bug fixes in the code, new icons, documentation improvements, and small enhancements to existing components.

### Contribute a new icon in Figma

If you’d like to add a new icon to the [icon library](/icons/library), follow the steps in the [Figma library README](https://www.figma.com/file/MYiw4kiVpunIMMw0sBkE1t/%E2%9C%8F%EF%B8%8F-Flight-Development?node-id=566%3A1129&t=Bbflj3UUaWVyhamn-4).

### Contribute in code

To work in one of the Helios code packages, consult the corresponding `CONTRIBUTING.md` file for [Tokens](https://github.com/hashicorp/design-system/blob/main/packages/tokens/CONTRIBUTING.md), [Ember Flight Icons](https://github.com/hashicorp/design-system/blob/main/packages/ember-flight-icons/CONTRIBUTING.md), and [Components](https://github.com/hashicorp/design-system/blob/main/packages/components/CONTRIBUTING.md).

Review the [Engineering Checklist for new components](https://github.com/hashicorp/design-system/blob/main/packages/components/NEW-COMPONENT-CHECKLIST.md#engineering-checklist) if you’re working on a new component.

If you need to test the component in one of our consumers’ codebases, review the [instructions for testing a component in Cloud UI](https://github.com/hashicorp/design-system/blob/main/packages/components/HOW-TO-TEST-A-COMPONENT-IN-CLOUD-UI.md).

### Why large direct contributions are not currently accepted

Adding new components or patterns to Helios takes significant time and consideration of use cases across all our products. As a team, we also strive to maintain a high bar for consistency in implementation and delivery across both design and code to ensure a systematic and high-quality experience for our consumers when using Helios in their work. This combination of factors means that large direct contributions are not pragmatic for us to support at this time, however, we've developed the collaboration process outlined here to help enable teams to work directly with us to support their needs.  
 
## Our collaborative process

Our collaborative process is intended to be a guideline, not a playbook. Each collaboration may be different depending on the complexity of the proposal. This process generally works best for larger collaboration projects, but we’ll help define the necessary steps based on your project type during the kickoff.

### Submit a new request

Before submitting a new request, check that the issue doesn’t already exist in our [backlog](https://go.hashi.co/hds-rollout). If no request exists, create a new issue using our [intake form](https://go.hashi.co/hds-support). Creating an issue allows us to track and prioritize all requests in one central location easily.

Alternatively, if you just have a question or you’re not sure your project is right for collaboration, reach out to the Design Systems Team in [#team-design-systems](https://hashicorp.slack.com/archives/C7KTUHNUS).

### Evaluation of the request

The Design Systems Team will then evaluate each incoming request and provide the Requestor with a decision. 

#### How we evaluate requests

We evaluate requests based on the following criteria:

- Reusability across multiple products
- Relevance and added value for the design system as a whole
- Integration with existing foundations, components, and features of the system
- Impact on existing components, especially in the case of breaking changes
- Expected effort, possible complexities, and unknowns involved
- Availability of resources on the Design Systems Team
- Prioritization in relation to other initiatives already undertaken and/or planned

#### Possible outcomes

Based on the evaluation criteria, there are different possible outcomes:

- We start or plan to **dedicate time and resources to the project**. We plan a kickoff with the requestor to further discuss the project.
- We believe there’s an **opportunity for future collaboration**, but don’t have time or resources to dedicate to it now. We’ll continue to monitor interest in the request and re-evaluate it in the (near) future.
- We **can’t support this request**. We’ll provide guidance and suggestions on how to move forward, but the final decision on how to proceed with the work will be left to the requestor.

### Kickoff meeting

We’ll organize a kickoff meeting with the requestor (and any necessary stakeholders) for projects to which we can dedicate time and resources. In this kickoff meeting, we aim to define the following:

- What resources from each team will be allocated to the project, and what each individual’s role is
- What the scope of the project is (or if more discovery is necessary), and if the project can be delivered incrementally
- What the timeline for the project is, and if there’s a deadline that needs to be met
- What the open questions, risks, or unknowns are for this project
- Who the stakeholders are, what their involvement is, and whose approval is required
- What the first actionable steps and milestones are
- How the team plans to communicate about the project

### Collaborative execution

The dedicated resources from each team will work together to complete the project according to the scope and timeline defined in the kickoff. This process is variable, depending on the project’s complexity, and it can be quite intensive for larger collaborations given the high bar for quality required. The project will need to go through thorough reviews with key stakeholders, as defined in the kickoff.

To get an idea of what this process could look like, please refer to [the process followed by the Design Systems Team when building a net-new component](https://github.com/hashicorp/design-system/blob/main/packages/components/NEW-COMPONENT-CHECKLIST.md).

### Implementation and release

Once reviewed and approved, the feature can be implemented and released in Helios. 

- The Design Systems Team will:
    - Document these artifacts on the Helios website
    - Release the artifacts that were created/ported/updated in collaboration with the product team
    - Publicize the release of these new artifacts, as well as the fact that they were the result of of a joint collaboration with the product team
- The product team will:
    - Follow the guidance provided by the Design Systems Team in the follow-up work related to the collaboration effort
    - Have a clear plan to adopt the artifacts produced during the collaboration

## Resources

Learn how the [Collaboration Model for the Helios Design System](https://go.hashi.co/rfc/ds-059) took shape.
