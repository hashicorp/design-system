---
title: Writing for UI Copy
caption: Applications should be usable and accessible for all users of differing abilities.
description: Applications should be usable and accessible for all users of differing abilities.
previewImage: assets/illustrations/foundations/accessibility.jpg
---

## General guidelines

### Use American-English spelling

This helps promote consistency across our products and other written materials.

!!! Do

The system has canceled the process.

Users belong to an organization...

!!!

!!! Dont

The system has cancelled the process.

Users belong to an organisation...

!!!

### Use the serial (“Oxford”) comma in lists 

!!! Do

Choose your cluster tier, size, and network.

!!!

!!! Dont

Choose your cluster tier, size and network.

!!!

### Avoid using contractions in instructions or for emphasis

!!! Do

Now that you read and wrote a secret, you may delete it.	

!!!

!!! Dont

Now that you've learned how to read and write a secret, go ahead and delete it.

!!!

### Capitalization

Use sentence-case for titles, headings, labels, links, and buttons. Use title case for proper nouns and when referring to products (e.g., Nomad).

!!! Do

// images here

!!!

!!! Dont

// images here

!!!

Avoid capitalizing feature names or internal constructs as proper nouns.

!!! Do

Terraform Cloud includes a private module registry.

A plan represents the execution plan of a run.

Enable a Secrets Engine in Vault

!!!

!!! Dont

Terraform Cloud includes a Private Module Registry.

A Plan represents the execution plan of a Run.

Enable a secrets engine in Vault

!!!

### Use the grammatical person “you” when referring to the user

Directly addressing the user as "you" conveys the content in a more personal and informal way.

!!! Do

Terraform Cloud’s API lets you create workspaces without a VCS connection.

!!!

!!! Dont

Terraform Cloud’s API allows one to create workspaces without a VCS connection.

!!!

### Use “we” to describe a recommendation by HashiCorp

Our language should never try to hedge or evade responsibility for the guidance we’re providing.

!!! Do

We recommend enabling SSO to…

!!!

!!! Dont 

You should enable SSO to…

!!!

### Use active voice whenever possible

!!! Do

Terraform has a provider framework to leverage this behavior.

!!!

!!! Dont

To hook into this behavior, a provider framework has been built into Terraform.

!!!

### Use a simple present tense whenever practical

Don't avoid the imperative if you're telling someone to do something.

!!! Do

Run the command `foo.`

!!!

!!! Dont

You will be running the command `foo.`

!!!

### Explain uncommon acronyms before use

The first time you use an acronym or abbreviation, include the abbreviated word in parentheses alongside the full compound term. Subsequent mentions can use the acronym by itself. This does not apply to common acronyms like ID, IP, or API.

!!! Do

This will set the Subject Alternate Name (SAN) on the certification. The SAN is used to tell clients…

!!!

!!! Dont

This will set the SAN on the certification. The SAN is used to tell clients…

!!!

### Be consistent with commonly used terminology

When labeling buttons, use the format [Verb + Noun] wherever possible. For example:  Add cluster, etc. “Add” and “Create” are frequently used. The general guidelines for their use are as follows:

- **Create/Delete:** Used when a new entity is produced or destroyed in the system. Example create/delete a project (the project didn’t exist before/will no longer exist)
- **Add/Remove:** Used when a new relationship or dependency between existing objects is produced or destroyed. Example: Add/Remove a user to/from a project (both the user and the project already existed and will continue to exist, but the relationship itself is established or dissolved) 

!!! Do

“Create cluster” or “Delete cluster”

Add user to organization

!!!

!!! Dont

“Create cluster” on a button and “Deploy cluster” on the resulting dialog.

Using “remove” and “delete” or “create” and “add” interchangeably

!!!

For actions within an object, use the icon (when possible), the verb and the noun that will be affected.

!!! Do

“Edit project” or “View Project”

// image here

!!!

!!! Dont

Miss the object that the user is doing the action. View what?

// image here

!!!

When editing an object, use “Save” for the action on the page. When applying another action, use an imperative, present tense verb.

!!! Do

E.g. Edit organization, project. Action: Save project

//image here
//image here

E.g. Invite user. Action: Invite.

//image here

!!!

### Provide descriptive link content

Employing descriptive link text improves the readability and scannability of the page content, increases the target size for mouse users, and provides the relevant context for links to users who rely on assistive technology. Phrases like “Click here to learn more” don’t provide good information scents for users to take advantage of, while terms like “click” aren’t inclusive or necessarily accurate — users may be using a keyboard, their finger, a stylus, or assistive technologies such as screen readers, voice controls, or switch controls.

!!! Do

“Follow our <ins>tutorial on how to deploy your first service mesh</ins>”

!!!

!!! Dont

“Click the link below to learn more”

!!!

### Avoid directional language

When explaining to users how to complete a task, avoid directional language by describing interface elements in terms of the sequence they need to be completed rather than where they are located on the page. By avoiding using terminology like “below”, “above”, “to the left“, etc. we can:

- **Improve accessibility:** People with visual impairments or who rely on assistive technologies may run into issues — being zoomed in may reflow content such that written directions are no longer accurate, or the user may be blind and unable to know if something is to the left or right. Additionally, it may help avoid confusion for people with learning disabilities who find it challenging to understand directional language.
- **Design defensively:** Updating designs or reflowing of content due to responsive layouts may result in the language no longer being accurate (e.g., what was previously to the left is now above) — avoiding directional language can cultivate more robust experiences.

#### Techniques for avoiding directional language

- Use alternative terms:
    - “First”, “next”, and “finally” could replace “above”, “below”, or “at the bottom” when you’re referring to a sequence of steps on a page rather than their “physical” location
    - “In the navigation” can help all users understand how to use the app’s navigation area rather than say “to the left”
    - “Following” and “previous” can help explain sequence by using directional language like “above” or “below”
- Consider whether you need the copy at all:
    - For example, if the only item on the page is a form, you could say “Complete the following form”. However, it may be obvious that the user should complete the form, in which case the text can be removed.

!!! Do

“First, select a provider.”

“Use the ‘Terraform’ link in the navigation to go to Terraform Cloud.”

“The instructions will walk you through the process of setting up your first cluster.”

!!!

!!! Dont 

“Select a provider below.”

“Click on the ‘Terraform’ link over to the left to navigate to Terraform Cloud”

“The instructions above will walk you through the process of setting up your first cluster.”

!!!

### Avoid ableist language

Kindness is at the core of our culture, and our language should reflect that. Ableist terminology should not be used.

!!! Do

Consul prints the list of services

This is useful because…

In the next example…

!!!

!!! Dont

Look at the list of services

This is crazy useful

As you can see in the example below…

!!!

## Date and time display

Present dates and times in a clear and consistent format to enhance usability across products.

### Usage

Follow these formatting options to display dates and times in a way that aligns with user needs: 

- **Relative Date:** Displays time in relative terms (e.g., "3 hours ago" or "in 2 days"). This format is recommended for recent events, particularly within the past or upcoming week, as it simplifies recognition of time-sensitive actions.
- **Friendly Date:** Provides a user-friendly date, optionally paired with a relative indicator (e.g., "Sep 5, 2018, 3:30 PM EST"). Ideal for longer time frames where the exact date offers clear context. Limit time to the minute.
- **Friendly Local Date:** Converts the date to the user’s local timezone for added clarity (e.g., "Sep 2, 2024, 3:30 PM EST"). Limit time to the minute.
- **Date Range:** Presents a range by specifying a start and end date (e.g., "Sep 2–Sep 9, 2024").
- **Precise time:** Displays date and time in a UTC format for a log stream or where human readability is not necessary (e.g., “2024-09-05T23:15:17345Z”).

### Relative Dates

Relative dates work well for periods from one minute up to one week. For added accuracy, a tooltip can display the exact timestamp, including seconds and the local timezone (e.g., "Sep 5, 2018, 4:07:32 PM PST"). This feature helps users who need precise information without manually converting from UTC.

![Example of time and tooltip](/assets/components/time/time-tooltip.png)

- Omit "about" in phrases like "about 3 hours ago" since the approximation is implied.
- To improve readability, show only the most significant unit, e.g., "3 days ago" instead of "3 days, 4 hours ago."