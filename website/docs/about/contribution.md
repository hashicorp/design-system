---
title: Contribution
description: How to collaborate with the HashiCorp Design Systems (HDS) team to contribute back to the system.
navigation:
  order: 104
---

!!! Info

At this time **we are not accepting external contributions from non-HashiCorp employees**.<br/>
Many resources and links on this page are only available to HashiCorp employees.

!!!

## From “Contribution” to “Collaboration” Model

Introducing a contribution model for a design system may not be as easy at it seems. There are structural factors that can undermine a team’s effort to set up a contribution model (even more, one that actually works). Here are just some of them:

- Contributions often cover only small low-level parts of the design system; large contributions are complex by nature, multi-disciplinary and time-consuming, and so they are beyond the contributors’ possibilities in terms of time/availability, knowledge or skills.
- Contributions need to be kept to the same standards of quality as the other artifacts produced by the design system team: this means that contributors need to adhere to the same rigorous process that a system team uses to get work done. This can be extremely tedious, for someone who (most of the time) just needs to have something done to unblock their work.
- Contributors will need some help and support from the design system anyway: be it because contributors are designers or developers, not both (so the design system team needs to do the missing part themselves) or because the contributors are unfamiliar with the process followed by the design system team, so the design system team needs to guide, shepherd and steer the contribution (and step in when necessary) to follow the quality criteria and expectations that the system’s features require.
- Contributors are led to think that if a design system accepts contributions, it means that the design system is open to any contribution, which is not the case given the premises described above: the alternative would be to not have any gatekeeper, and the result would be “too many components, components built for the same purpose, lack of documentation” ([cit.](https://www.namahn.com/protected-design-systems-systems-design-and-the-wonderful-world-in-between-part-ii/)) and this would slowly but surely destroy the design system.

On top of this, there’s another consideration to take into account: an _open_ contribution model works (better) for design systems with loose visual design languages, code standards and patterns. In our case, on the contrary, the design system (and its team) has been created with the explicit purpose to give our products a strong and cohesive visual identity, to amend some of the negative effects of the previous attempt to have a “less strict” design system.

On the another hand, in the last two years **we’ve observed many cases of successful “contributions” to the system**, in many different (and at times unpredicted) ways. Some of them were organic and spontaneous, others came out of requests for support. Some were small and fast, others required weeks of work, if not more. Some were code-only, others involved only designers, and others were a mix of both.

But all of them had a common trait: they were based on **a strong collaboration between the HDS team and the consumers** (product designers and/or developers of the product teams). A collaboration in which each one was bringing to the table their own specific knowledge and skills, their field of expertise, making the whole process smoother, more efficient and effective.

_For a list of examples of successful collaborations, and the reasons why we think they worked so well, see the [Successful collaborations](#examples-of-successful-collaborations) section  below._

This made us realize that we should move away from a generic “contribution model”, in the [classic sense](https://medium.com/eightshapes-llc/defining-design-system-contributions-eb48e00e8898), in favor of a different model: a model that would suit better our context, our needs. **A collaboration model.**

## Forms of collaboration

As a design system team, we are open to different forms of collaboration (even direct contribution) as long as they take the form of **joint efforts that follow the collaborative process** described below.

Here is a (non exhaustive) list of possible **forms of collaboration**:

- Collaborate together to build an entirely new artifact (icon, component, pattern, etc.) on the consumers’ side (details of how this collaboration will happen in practice will be defined at the project’s kickoff) with the intent that, once the artifact has been battle-tested in production, it will be brought back into the design system as an official icon/component/pattern, adapting it to follow the HDS standards and patterns.
- Small autonomous (but coordinated) contributions like implementing bug fixes, improving existing documentation, introducing small enhancements to existing components, etc.
- Support the product team/developers/designers on a specific task they're busy working on, to facilitate the usage of existing HDS foundations and components (or evaluate the extension of existing ones, or consider the implementation of net new ones) with the end goal of reducing their overall time-to-production.

To see some examples of successful collaborations that already happened, see the [section below](#examples-of-successful-collaborations).

## Collaboration process

Below we outline a collaboration process that we think should fit well with the context in which the Helios Design System and the product teams operate. It’s intended as a guideline (but not a playbook) to drive the initial phase of collaboration, and provide a framework that consumer teams can follow during this collaboration.

It’s not a strict model though: it’s likely that each collaboration will be handled differently, on a case-by-case basis. This nimble approach gives us space to respond to the specific needs of consumers that will arise, and better suit their specific requirements (following two of [our principles](/about/principles): _“Design in context”_ and _“Rooted in reality”_).

!!! Info

This list of steps is intended for large kinds of contributions/collaborations. For small kinds of contributions, we can skip certain steps, or merge multiple steps together, but the general idea would be the same: we will always work in sync with the consumers; define resources, scope and timeline; and involve all the potential stakeholders.

!!!

### Request

The request of collaboration can come:

- from a consumer team or a single product designer/developer/manager, because they think there is an opportunity of contributing to the design system or [collaborating]((#forms-of-collaboration)) with the design system team.

!!! Insight

We offer [multiple contact points](/about/support) that can be used to initiate the conversation.

!!!

- from the HDS team, because we may see an opportunity to collaborate with a product team on a specific project to bring some of the work back into the design system

### Evaluation

The HDS team will evaluate the request from the consumers’ team (or the opportunity of re-using part of the consumers’ work) in terms of:

- Reusability across different, multiple products (the most important factor for us)
- Relevance and added value for the design system as a whole
- Integration with existing foundations/components/features of the system
- Impact on existing components (especially in case of breaking changes)
- Expected effort and possible complexities and unknowns involved
- Availability of resources in terms of HDS engineers and designers
- Prioritization in relation with other initiatives already undertaken and/or planned.

### Decision

There are different possible outcomes of the initial evaluation:
- The HDS team decides to start (or plans) to **dedicate time and resources to the work/collaboration**. In this case a kickoff meeting is organized to define the details of such collaboration (see below).
- The HDS team decides that there’s an **opportunity for collaboration in the future**, that it would add value to the system for all the consumers but in that specific moment doesn’t have time/resources to dedicate to it. In this case the HDS team adds a new task/epic to their backlog to re-evaluate this activity in the (near) future.
- The HDS team determines that they **can't support this request/work** (this can be for a variety of reasons, it's not possible to enumerate them all here). In this case the HDS team will provide guidance and suggestions on how to move forward, but the final decision on how to proceed with their own work will be left to the consumer team.

### Kickoff

In case the HDS team has decided to dedicate time and resources to this project it will organize a meeting with the consumers’ team and share the decision about the suggested/proposed collaboration, to define together:

- What resources will be allocated to the project (on both sides, HDS and consumer team) in terms of designers and engineers
- What will be the scope of the project (or if an initial discovery phase is necessary to better define this scope) and if the project can be delivered incrementally
- What is the timeline for the project, if the consumer team has a deadline to meet, if the effort needs to be timeboxed (this will be strictly related with the definition of its scope)
- What are the open questions, risks or unknowns for this project
- What are the stakeholders that need to be involved or whose approval is required
- What are the first actionable steps and milestones (if they are already known)
- How the team plans to communicate about the project

### Execution

The designers and/or developers from the HDS and consumer teams will work together, according to the scope and timeline defined first in the kickoff, and then reviewed during the implementation (not unusual, due to gained knowledge of the problem space).
It’s not possible to describe here and/or generalize what this phase will look like, because it depends on too many factors. You can have an idea of what kind of work can be executed by looking at some of the examples of previous collaborations under the [Successful collaborations section](#examples-of-successful-collaborations). You can also look at [the process followed by the HDS team when building a net new component](https://github.com/hashicorp/design-system/blob/main/packages/components/NEW-COMPONENT-CHECKLIST.md) as reference of the typical work that is involved.

### Conclusion

At the end of the process:
- The HDS team will (if applicable):
    - Release the artifacts created/ported/updated in collaboration with the consumer team
    - Document these artifacts in Figma and/or on the Helios website
    - Publicize the release of these new artifacts, as well as the fact that they were the result of of a joint collaboration with the consumer team
- The consumer team will:
    - Follow the guidance provided by the HDS team in the follow-up work related to the collaboration effort
    - Have a clear plan to adopt the artifacts produced during the collaboration and published as official HDS resources (foundations, components, etc)

---

## Examples of successful collaborations

We list below some examples of successfull collaborations with our consumers, happened in the last year or so. They are not only “success stories” but also as examples of “what went well”, to be used as a reference of what makes a collaboration successful for both parties.

### Dark mode for HashiCorp Developer

The marketing team was given the goal to launch a “dark mode” version of the [HashiCorp Developer website](https://developer.hashicorp.com/). This task necessarily required the involvement of the HDS team, since there was no official support of “modes” in the design system's foundational color palette. After an initial evaluation of the effort required to introduce such support in the current system, and considered the short timeframe, we decided to take a slightly different approach: instead of the Developer team having to wait for the HDS team to come up with a color palette for the “dark” mode, the two teams would worked together on the problem, in a timeboxed spike, with the goal to create a “dark” mode palette **for the Developer website**, not for the design system.

#### Outcomes

In a relatively short time frame, the new color palette was ready and fully tested (in Figma), adopted by the developers in their code, and finally launched in production in perfect time.

HDS came out of the joint effort with a very solid baseline/foundation that can be fully leveraged for when we will decide to introduce modes-support in our design system.

#### What worked well

- There was a clear business goal (launching “dark” mode on Developer).
- A lean process, a tight collaboration, and like-mindedness between the two designers: all these factors led to quick iterations and feedback cycles.

### Sidebar Navigation

The [Unified Cloud Navigation project](https://docs.google.com/document/d/1y-jS_MkUYYkhWivJPdkDhDn8WeYrwb4iycsrN9nNPYo/edit) introduced a new sidebar navigation in Terraform Cloud (TFC), based on the [existing designs](https://www.figma.com/file/FpiRw0N8XTV7AVdJAaFHTD/Unified-Cloud-Navigation?node-id=3796%3A41706) for HashiCorp Cloud Platform (HCP/Cloud UI), and built on top of the Helios foundational styles and icons.

In anticipation of a possible future re-use across products (e.g., Vault needed to implement a similar navigation) the Cloud UI engineering team extracted their existing side navigation into a standalone component (as an addon) in the Cloud UI codebase first, and in a dedicated repository later.

#### Outcomes

Based on this visual design unification, the HDS team then implemented an official [SideNav component](components/sidenav), based on the work already done by the TFC and HCP designers and developers, taking full ownership of the maintanance (and future evolution) of this is component.

It took some time to bring the existing implementation to the standards and patterns followed for the HDS components, but the effort paid off: the `SideNav` component is now successfully used in many of our products.

#### What worked well

- The product teams did the bulk of work in discovering, designing, implementing and testing what they wanted/needed in terms of component UI/UX and functionality/behavior.
- The HDS designers were heavily consulted and involved during the design process.
- The component was entirely built on top of existing HDS foundations and components, with almost no deviation or customization.
- Once the component was fully adopted, tweaked and tested in production, it became much easier for the HDS team to take in the existing artifacts (in Figma and in code), refactor them to be in line with the HDS standards and patterns, and release it as an official HDS component.

### Text component

The introduction of a typographic Text component in HDS has been in discussion for years, with different failed attempts and proposals, but no tangible result or even only a general agreement on what this component should “look like” and how it should work. After all this time, some patterns in how the typographic styles were consumed in the Cloud UI codebase started to emerge (in particular around the use of a `&lt;Typography&gt;` component). This was an opportunity to re-open the discussion, with a more direct involvment of the consumers. A dedicated working group was formed, including different developers from the consumers' teams, that were interested to contribute/collaborate on this effort.

#### Outcome

The [`Text` component](/components/text) has been (finally!) officially released as part of the design system, and is in the process of being adopted in the consumers' codebases.

#### What worked well

- A small working group with a clear focus and goal, made of experienced and passionate engineers with a good knowledge of how the typography works in the system, and how it’s used in their codebases.
- A well-prepared and extensive kickoff meeting, followed by a series of asynchronous conversations in a dedicated Slack channel, plus an RFC document where to collect the decisions taken along the process.

### `datetime-local` contribution

An engineer from a consumer's team asked in the HDS internal channel if the [`TextInput` component](/components/form/text-input) could support the `datetime-local` type, and suggested they could open a PR to extend the existing component. After a quick check on our side, we agreed that this was easily achievable, so we created and assigned to them [a Jira ticket](https://hashicorp.atlassian.net/browse/HDS-2235), in which we briefly described the list of steps to follow to set up a local development environment.


#### Outcome

In no time the developer was able to [open a PR](https://github.com/hashicorp/design-system/pull/1494/) that we promptly reviewed and approved. The developer was also able to test their implementation straight away in their code, while waiting for the component update to be officially released as NPM package.

#### What worked well

- The developer had a good knowledge of how the component works in terms of its APIs, and how to implement the missing feature in the HDS codebase.
- The change was very specific and limited in scope, with no “systemic” side-effects that needed to be considered.

---

## Resources

### Design collaboration

If you are collaborating on adding a new icon to the [Flight icon library](/icons/library), get familiar with the process described in the [contribution workflow](https://www.figma.com/file/MYiw4kiVpunIMMw0sBkE1t/%E2%9C%8F%EF%B8%8F-Flight-Development?node-id=566%3A1129&t=Bbflj3UUaWVyhamn-4) for creating a new icon.

### Engineering collaboration

If your collaboration involves working with one of the HDS code packages, consult the corresponding `CONTRIBUTING.md` file for [Tokens](https://github.com/hashicorp/design-system/blob/main/packages/tokens/CONTRIBUTING.md), [Ember Flight Icons](https://github.com/hashicorp/design-system/blob/main/packages/ember-flight-icons/CONTRIBUTING.md), and [Components](https://github.com/hashicorp/design-system/blob/main/packages/components/CONTRIBUTING.md).

If you're working on a new component, it's also important to get familiar with the process described in the [Engineering Checklist for new components](https://github.com/hashicorp/design-system/blob/main/packages/components/NEW-COMPONENT-CHECKLIST.md#engineering-checklist).

If you need to test the component in one of our consumers' codebases here you can find [instructions on how to test a component in Cloud UI](https://github.com/hashicorp/design-system/blob/main/packages/components/HOW-TO-TEST-A-COMPONENT-IN-CLOUD-UI.md).
