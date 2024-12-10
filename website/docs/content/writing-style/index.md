---
title: Writing style
caption: Best practices for writing style, grammar, and formatting.
description: Best practices for writing style, grammar, and formatting.
previewImage: assets/illustrations/content/writing-style.jpg
---

Generally, HashiCorp follows the [2020 AP Stylebook](https://www.apstylebook.com/ap_stylebook) rules and guidelines, unless HashiCorp specific style is indicated.

## Capitalization

### Headings and labels

Use sentence case for titles, headings, labels, links, and buttons. Use title case for proper nouns and when referring to products (e.g., Nomad).

!!! Do

![Title with text "Sync secrets to Terraform"](/assets/content/writing-style/writing-style-capitlization-header-do.png)

![An input with the label "Maximum TTL".](/assets/content/writing-style/writing-style-capitlization-input-do.png)

![Link with text "Edit encryption key"](/assets/content/writing-style/writing-style-capitlization-link-do.png)

!!!

!!! Dont

![Title with text "Sync Secrets to Terraform"](/assets/content/writing-style/writing-style-capitlization-header-dont.png)

![An input with label "MAXIMUM TTL".](/assets/content/writing-style/writing-style-capitlization-input-dont.png)

![A link with text "Edit Encryption Key".](/assets/content/writing-style/writing-style-capitlization-link-dont.png)

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

### Capitalization for direction

When referring to specific UI elements or sections within the application, use the same capitalization of the element itself.

!!! Do

You can set up module sharing from the Site Administration area of a Terraform Enterprise instance. The Registry subsection allows an organization to be chosen to which your current organization’s private module registry will be shared.

!!!

#### Exceptions for feature names

The following terms should always use title case:

- Terraform Registry
- Terraform Stacks
- Raft Algorithm
- Vault Agent
- Vault Proxy
- Boundary Client Agent / Client Agent (when referring to the Boundary Client Agent)
- Terraform Plugin Framework
- Nomad Autoscaler
- The Infrastructure Cloud
- Infrastructure Lifecycle Management
- Security Lifecycle Management

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

Use active voice whenever possible. An active voice is when we communicate a subject performs an action on an object, instead of the subject being acted upon:

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

Run the command `foo`.

!!!

!!! Dont

You will be running the command `foo`.

!!!

### Uncommon acronyms

The first time an acronym or abbreviation is used, include the abbreviated word in parentheses. Subsequent mentions can use the acronym by itself. This does not apply to common acronyms like ID, IP, or API.

!!! Do

This will set the Subject Alternate Name (SAN) on the certification. The SAN is used to tell clients...

!!!

!!! Dont

This will set the SAN on the certification. The SAN is used to tell clients...

!!!

### Consistent terminology

Use a verb followed by a noun when labeling actions. 

#### Common actions

When possible, add an icon to action labels. Typically, the icon should represent the action (verb), but sometimes, it can represent the object (noun).

![Three buttons, one labeled "Invite user" with a leading user icon, one labeled "Add dependency" with a leading plus icon and one labeled "Delete project" with a leading trash icon.](/assets/content/writing-style/writing-style-consistent-termonology-action-object.png)

##### Create and Delete

Use when a new entity is produced or destroyed in the system, e.g., "Create a project" or "Delete a project", where the project didn't exist before or will no longer exist.

!!! Do

![Two buttons, one labeled "create project" with a leading plus icon, and one labled "delete project" with a leading trash icon](/assets/content/writing-style/writing-style-consistent-termonology-CTA-create-delete-do.png)

!!!

##### Add and Remove

Use when a new relationship or dependency between existing objects is produced or destroyed, e.g., "Add a user" (to a project), "Remove a user" (from a project), where both the user and the project already existed and will continue to exist, but the relationship itself is established or dissolved.

!!! Do

![Two buttons, one labeled "Add user" with a leading user icon and the other labeled "Remove user" with a leading trash icon.](/assets/content/writing-style/writing-style-consistent-termonology-CTA-add-remove-do.png)

!!!

##### Edit and View

Use when editing or viewing an entity, e.g. "Edit project" or "View project," where the project will be modified for accuracy or previewed for quality assurance.

!!! Do

![A menu with the actions "Edit project" paired with a pencil icon and "View project" paired with an eye icon.](/assets/content/writing-style/writing-style-consistent-termonology-menu-actions-do.png)

!!!

!!! Dont

This is missing the object (noun) the user is doing via the action (verb). What is the user going to "View"?

![A menu with the actions "Edit name" and "View" and no icons.](/assets/content/writing-style/writing-style-consistent-termonology-menu-actions-dont.png)

!!!

When editing an object, use "Save" for the action label. When applying another action, use an imperative, present-tense verb.

!!! Do

![A modal that has a form to edit an organization. The title is "Edit organization name" and the save button is "Save organization".](/assets/content/writing-style/writing-style-consistent-termonology-CTA-save-do.png)

![A form to invite users by inputting their emails. The title is "Invite users" and the submit button is "Invite users".](/assets/content/writing-style/writing-style-consistent-termonology-CTA-invite-do.png)

!!!

!!! Dont

![A form to edit a service principal. The title is "Edit service principal" and the save button is "Apply changes".](/assets/content/writing-style/writing-style-consistent-termonology-CTA-apply-dont.png)

!!!

## Punctuation

### Serial/Oxford comma

Use the [serial (“Oxford”) comma](https://www.grammarly.com/blog/punctuation-capitalization/what-is-the-oxford-comma/) in lists.

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

Use the % symbol instead of writing “percent,” e.g., “50%.”

![A card showing usage data, alongside its status and name. It includes the text “12%” and an up arrow icon to inform users the requests have increased.](/assets/content/writing-style/writing-style-punctuation-percentage.png)

### Dashes

Use an en dash (–) to indicate a range or span of numbers.

![Event dates Sep 20–Sep 24, 2020](/assets/content/writing-style/writing-style-punctuation-en-dashes.png)

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