---
title: Writing Style
caption: How HashiCorp structures writing, in a clear concise manner.
description: How HashiCorp structures writing, in a clear concise manner.
previewImage: assets/illustrations/content/writing-guidelines.jpg
---

Generally, HashiCorp follows the [2020 AP Stylebook](https://www.apstylebook.com/ap_stylebook) rules and guidelines, unless HashiCorp specific style is indicated.

## Capitalization

### Headings and labels

Use sentence-case for titles, headings, labels, links, and buttons. Use title case for proper nouns and when referring to products (e.g., Nomad).

!!! Do

![Showing a title with sentence-case](/assets/content/writing-style/writing-style-capitlization-header-do.png)

![Showing an input with a label using sentence-case and title case for a proper noun](/assets/content/writing-style/writing-style-capitlization-input-do.png)

![Showing a link using sentence-case](/assets/content/writing-style/writing-style-capitlization-link-do.png)

!!!

!!! Dont

![Showing a title with capital-case](/assets/content/writing-style/writing-style-capitlization-header-dont.png)

![Showing an input with a label using title case](/assets/content/writing-style/writing-style-capitlization-input-dont.png)

![Showing a link using sentence-case](/assets/content/writing-style/writing-style-capitlization-link-dont.png)

!!!

### Feature names

Avoid capitalizing feature names or internal constructs as proper nouns.

!!! Do

Terraform Cloud includes a private module registry.

A plan represents the execution plan of a run.

Enable a Secrets Engine in Vault

We’ll use the Vault namespaces feature.

!!!

!!! Dont

Terraform Cloud includes a Private Module Registry.

A Plan represents the execution plan of a Run.

Enable a secrets engine in Vault

We’ll use the Vault Namespaces feature.

!!!

**Capitalization rules for UI elements**

Typically you will want to capitalize site or UI elements or sections when referring to them in content if they are capitalized in the UI:

“You can set up module sharing from the Site Administration area of a Terraform Enterprise instance. The Registry subsection allows an organization to be chosen to which your current organization’s private module registry will be shared.”

**Exceptions**: Some terms may seem like they wouldn’t be capitalized, but the Education team has given reasoning for their capitalization:

- Terraform Registry
- Terraform Stacks
- Raft algorithm
- Vault Agent
- Vault Proxy
- Boundary Client Agent / Client Agent (when referring to the Boundary Client Agent)
- Terraform Plugin Framework
- Nomad Autoscaler
- The Infrastructure Cloud
- Infrastructure Lifecycle Management
- Security Lifecycle Management

The general capitalization guidance (feature names should not be capitalized unless it can be used as a stand alone product) applies when writing content about new features as well.

## Grammar

### Use “you” for the user

Directly addressing the user as "you" conveys the content in a more personal and informal way.

!!! Do

Terraform Cloud’s API lets you create workspaces without a VCS connection.

!!!

!!! Dont

Terraform Cloud’s API allows one to create workspaces without a VCS connection.

!!!


### Use “we” for HashiCorp

Use “we” to describe recommendations by HashiCorp. Our language should never try to hedge or evade responsibility for the guidance we’re providing.

!!! Do

We recommend enabling SSO to...

!!!

!!! Dont

It is a recommendation to enable SSO to...

!!!

### Active voice

Use active voice whenever possible.

!!! Do

Terraform has a provider framework to leverage this behavior.

We recommend configuring VCS access when first setting up an organization.

Terraform has a provider framework to leverage this behavior.

Next, Kubernetes will register the service.

!!!

!!! Dont

To hook into this behavior, a provider framework has been built into Terraform.

It is recommended to configure VCS access when first setting up an organization.

To hook into this behavior, a provider framework has been built into Terraform.

Next, the service will be registered.

!!!

### Use simple present tense

Don't avoid the imperative if you're telling someone to do something.

!!! Do

Run the command `foo.`

!!!

!!! Dont

You will be running the command `foo.`

!!!

### Uncommon acronyms

The first time you use an acronym or abbreviation, include the abbreviated word in parentheses. Subsequent mentions can use the acronym by itself. This does not apply to common acronyms like ID, IP, or API.

!!! Do

This will set the Subject Alternate Name (SAN) on the certification. The SAN is used to tell clients...

!!!

!!! Dont

This will set the SAN on the certification. The SAN is used to tell clients...

!!!

### Consistent terminology

When labeling buttons, use the format [Verb + Noun] wherever possible. For example:  Add cluster, etc. “Add” and “Create” are frequently used. The general guidelines for their use are as follows:

- **Create/Delete**: Used when a new entity is produced or destroyed in the system. Example create/delete a project (the project didn’t exist before/will no longer exist).
- **Add/Remove**: Used when a new relationship or dependency between existing objects is produced or destroyed. Example: Add/Remove a user to/from a project (both the user and the project already existed and will continue to exist, but the relationship itself is established or dissolved).

!!! Do

“Create cluster” or “Delete cluster”

Add user to organization

!!!

!!! Dont

“Create cluster” on a button and “Deploy cluster” on the resulting dialog

Using “remove” and “delete” or “create” and “add” interchangeably

!!!

For actions within an object, use the icon (when possible), the verb and the noun that will be affected.

!!! Do

“Edit project” or “View Project”

![A menu with two actions in it with icons](/assets/content/writing-style/writing-style-consistent-termonology-menu-actions-do.png)

!!!

!!! Dont

Miss the object that the user is doing the action. View what?

![A menu with two actions in it, with no icons](/assets/content/writing-style/writing-style-consistent-termonology-menu-actions-dont.png)

!!!

When editing an object, use “Save” for the action on the page. When applying another action, use an imperative, present tense verb.

!!! Do

E.g. Edit organization. Action: Save organization

![A modal that has a form to edit an organization](/assets/content/writing-style/writing-style-consistent-termonology-CTA-save-do.png)

E.g. Invite users. Action: Invite users.

![A form to invite users by inputting their emails](/assets/content/writing-style/writing-style-consistent-termonology-CTA-save-do.png)

!!!

!!! Dont

E.g. Edit service principal. Action: Apply changes 

![A form to edit a service principal with the wrong label in the primary button](/assets/content/writing-style/writing-style-consistent-termonology-CTA-apply-dont.png)

!!!

## Punctuation

### Serial/Oxford comma

Use the serial (“Oxford”) comma in lists.

!!! Do

Choose your cluster tier, size, and network.

!!!

!!! Dont

Choose your cluster tier, size and network.

!!!

### Exclamation points

Avoid using exclamation points. Only use it if you’re connecting with understood, strong reader emotion. 

!!! Do

Achieving this centralization is a huge improvement in security posture, but it’s not the end of the journey. This is because applications don't keep secrets! It turns out, most applications do a worse job keeping secrets than our close friends.

!!!

!!! Dont

We are excited to announce Vault 1.3!

!!!

### Percentages

Use the % symbol instead of spelling out "percent."  Correct: 50%

### Ranges and spans

Use a hyphen (-) to indicate a range or span of numbers.

- It takes 20-30 days.

## Spelling

Use American English to help promote consistency across our products.

!!! Do

The system has canceled the process.

Users belong to an organization...

!!!

!!! Dont

The system has cancelled the process.

Users belong to an organisation...

!!!