---
title: Alert
category: components
component: alert
section: overview
---

An Alert is an element intended for **system-generated messages**. It is a live region with important, usually time-sensitive information. The use of this alert component will cause immediate notifications for users with assistive technology. Since alerts are not required to receive focus, it should not be required that the user close the alert.

For messages that are the result of a user's actions see the [Toast](/components/toast/01_overview/) component.

Typically it displays a brief, important message in a way that attracts the user's attention, without interrupting the user's task.

There are three types of alerts, each slightly different one from another.

#### Page

It is rectangular (without a radius) and a visible border only at the bottom. Typically only has adjacent whitespace to the bottom of it, meaning it's usually flush to the parent container.

It can have an **icon** (optional), a **title** and/or **description** (required to have at least one of the two), some **actions** (optional) and a **dismiss/close** button (optional).

#### Inline

It has a border on all sides and a radius. Typically it has adjacent whitespace on all four sides.

It can have an **icon** (optional), a **title** and/or **description** (required to have at least one of the two), some **actions** (optional) and a **dismiss/close** button (optional).

_Notice: the "inline" alert is used to build the [Toast](/components/toast/01_overview/) component._

#### Compact

It's without border or internal padding, and so it has smaller proportions than the others.

It only contains an **icon** and **description** (hence they are both required for this type of alert).

The default icon is also slightly different from the other alert types: it's filled instead of outlined.