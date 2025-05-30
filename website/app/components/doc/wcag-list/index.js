/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
const CRITERIA = [
  {
    type: 'success-criteria',
    id: 'wcag-1-1-1',
    title: 'Non-text Content (Level A)',
    number: '1.1.1',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html',
    level: 'A',
    description:
      'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-2-1',
    title: 'Audio-only and Video-only (Prerecorded) (Level A)',
    number: '1.2.1',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html',
    level: 'A',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-2-2',
    title: 'Prerecorded Captions (Level A)',
    number: '1.2.2',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html',
    level: 'A',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-2-3',
    title: 'Audio Description or Media Alternative (Level A)',
    number: '1.2.3',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded.html',
    level: 'A',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-2-4',
    title: 'Live Captions (Level AA)',
    number: '1.2.4',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/captions-live.html',
    level: 'AA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-2-5',
    title: 'Prerecorded Media Audio Description (Level AA)',
    number: '1.2.5',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-description-prerecorded.html',
    level: 'AA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-2-6',

    title: 'Prerecorded Media Sign Language (Level AAA)',
    number: '1.2.6',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/sign-language-prerecorded.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-2-7',
    title: 'Prerecorded Media Extended Audio Description (Level AAA)',
    number: '1.2.7',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/extended-audio-description-prerecorded.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-2-8',
    title: 'Prerecorded Media Alternative (Level AAA)',
    number: '1.2.8',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/media-alternative-prerecorded.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-2-9',
    title: 'Live Media Audio Only (Level AAA)',
    number: '1.2.9',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-only-live.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-3-1',
    title: 'Info and Relationships (Level A)',
    number: '1.3.1',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html',
    level: 'A',
    description:
      'Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-3-2',
    title: 'Meaningful Sequence (Level A)',
    number: '1.3.2',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html',
    level: 'A',
    description:
      'When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-3-3',
    title: 'Sensory Characteristics (Level A)',
    number: '1.3.3',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html',
    level: 'A',
    description:
      'Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, color, size, visual location, orientation, or sound.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-3-4',
    title: 'Orientation (Level AA)',
    number: '1.3.4',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/orientation.html',
    level: 'AA',
    description:
      'Content does not restrict its view and operation to a single display orientation, such as portrait or landscape.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-3-5',
    title: 'Identify Input Purpose (Level AA)',
    number: '1.3.5',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html',
    level: 'AA',
    description:
      'The purpose of each input field collecting information about the user can be programmatically determined when the input field serves a purpose identified in the Input Purposes for User Interface Components section; and the content is implemented using technologies with support for identifying the expected meaning for form input data.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-3-6',
    title: 'Identify Purpose (Level AAA)',
    number: '1.3.6',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/identify-purpose.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-4-1',
    title: 'Use of Color (Level A)',
    number: '1.4.1',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
    level: 'A',
    description:
      'Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-4-10',
    title: 'Reflow (Level AA)',
    number: '1.4.10',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/reflow.html',
    level: 'AA',
    description:
      'Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-4-11',
    title: 'Non-text Contrast (Level AA)',
    number: '1.4.11',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html',
    level: 'AA',
    description:
      'The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s): user interface components; graphical objects.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-4-12',
    title: 'Text Spacing (Level AA)',
    number: '1.4.12',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html',
    level: 'AA',
    description:
      'No loss of content or functionality occurs by setting all of the following and by changing no other style property: line height set to 1.5; spacing following paragraphs set to at least 2x the font size; letter-spacing set at least 0.12x of the font size, word spacing set to at least 0.16 times the font size.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-4-13',
    title: 'Content on Hover or Focus (Level AA)',
    number: '1.4.13',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html',
    level: 'AA',
    description:
      'Where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true: dismissible, hoverable, persistent (see link).',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-4-2',
    title: 'Audio Control (Level A)',
    number: '1.4.2',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html',
    level: 'A',
    description:
      'If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-4-3',
    title: 'Minimum Contrast (Level AA)',
    number: '1.4.3',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html',
    level: 'AA',
    description:
      'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-4-4',
    title: 'Resize Text (Level AA)',
    number: '1.4.4',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html',
    level: 'AA',
    description:
      'Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-4-5',
    title: 'Images of Text (Level AA)',
    number: '1.4.5',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html',
    level: 'AA',
    description:
      'This is old. Don’t do this. Use text. Also a logo is not an image of text, so that’s fine.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-4-6',
    title: 'Enhanced Contrast (Level AAA)',
    number: '1.4.6',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-4-7',
    title: 'Low or No Background Audio (Level AAA)',
    number: '1.4.7',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-4-8',
    title: 'Visual Presentation (Level AAA)',
    number: '1.4.8',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-1-4-9',
    title: 'Images of Text (Level AAA)',
    number: '1.4.9',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/images-of-text-no-exception.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-1-1',
    title: 'Keyboard (Level A)',
    number: '2.1.1',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html',
    level: 'A',
    description:
      'All functionality of the content is operable through a keyboard interface.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-1-2',
    title: 'No Keyboard Trap (Level A)',
    number: '2.1.2',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html',
    level: 'A',
    description:
      'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-1-3',
    title: 'Keyboard (Level AAA)',
    number: '2.1.3',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/keyboard-no-exception.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-1-4',
    title: 'Character Key Shortcuts (Level A)',
    number: '2.1.4',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html',
    level: 'A',
    description:
      'If a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then it should be able to be turned off, remapped, or active only on focus.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-2-1',
    title: 'Timing Adjustable (Level A)',
    number: '2.2.1',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html',
    level: 'A',
    description:
      'If there are time limitations set by the content, one of the following should be true: turn off, adjust, extend, real-time exception, essential exception, 20 hour exception.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-2-2',
    title: 'Pause, Stop, Hide (Level A)',
    number: '2.2.2',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html',
    level: 'A',
    description:
      'If you have moving, blinking, scrolling or auto-updating information, read the guidance because there are a lot of details.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-2-3',
    title: 'No Timing (Level AAA)',
    number: '2.2.3',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/no-timing.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-2-4',
    title: 'Interruptions (Level AAA)',
    number: '2.2.4',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/interruptions.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-2-5',
    title: 'Re-authenticating (Level AAA)',
    number: '2.2.5',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/re-authenticating.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-2-6',
    title: 'Timeouts (Level AAA)',
    number: '2.2.6',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/timeouts.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-3-1',
    title: 'Three Flashes or Below Threshold (Level A)',
    number: '2.3.1',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html',
    level: 'A',
    description:
      'Web pages do not contain anything that flashes more than three times in any one second period.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-3-2',
    title: 'Three Flashes (Level AAA)',
    number: '2.3.2',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/three-flashes.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-3-3',
    title: 'Animation from Interactions (Level AAA)',
    number: '2.3.3',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-4-1',
    title: 'Bypass Blocks (Level A)',
    number: '2.4.1',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html',
    level: 'A',
    description:
      'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-4-10',
    title: 'Section Headings (Level AAA)',
    number: '2.4.10',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/section-headings.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-4-2',
    title: 'Page Titled (Level A)',
    number: '2.4.2',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html',
    level: 'A',
    description: 'Web pages have titles that describe topic or purpose.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-4-3',
    title: 'Focus Order (Level A)',
    number: '2.4.3',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html',
    level: 'A',
    description:
      'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-4-4',
    title: 'Link Purpose In Context (Level A)',
    number: '2.4.4',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html',
    level: 'A',
    description:
      'The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-4-5',
    title: 'Multiple Ways (Level AA)',
    number: '2.4.5',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways.html',
    level: 'AA',
    description:
      'More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-4-6',
    title: 'Headings and Labels (Level AA)',
    number: '2.4.6',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html',
    level: 'AA',
    description: 'Headings and labels describe topic or purpose.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-4-7',
    title: 'Focus Visible (Level AA)',
    number: '2.4.7',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html',
    level: 'AA',
    description:
      'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-4-8',
    title: 'Location (Level AAA)',
    number: '2.4.8',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/location.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-4-9',
    title: 'Link Purpose, Link Only (Level AAA)',
    number: '2.4.9',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-4-11',
    title: 'Focus Not Obscured (Minimum) (Level AA)',
    number: '2.4.11',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html',
    level: 'AA',
    description:
      'When a user interface component receives keyboard focus, the component is not entirely hidden due to author-created content.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-4-12',
    title: 'Focus Not Obscured (Enhanced) (Level AAA)',
    number: '2.4.12',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html',
    level: 'AAA',
    description:
      'When a user interface component receives keyboard focus, no part of the component is hidden by author-created content.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-4-13',
    title: 'Focus Appearance (Level AAA)',
    number: '2.4.13',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html',
    level: 'AAA',
    description:
      'When the keyboard focus indicator is visible, an area of the focus indicator meets all requirements.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-5-1',
    title: 'Pointer Gestures (Level A)',
    number: '2.5.1',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html',
    level: 'A',
    description:
      'All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-5-2',
    title: 'Pointer Cancellation (Level A)',
    number: '2.5.2',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html',
    level: 'A',
    description:
      'For functionality that can be operated using a single pointer, at least one of these is true: there is no down-event, there is a mechanism to abort or undo the function, the up-event reverses any outcome of the preceding down-event, or completing the function on the down-event is essential.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-5-3',
    title: 'Label in Name (Level A)',
    number: '2.5.3',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html',
    level: 'A',
    description:
      'For user interface components with labels that include text or images of text, the name contains the text that is presented visually.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-5-4',
    title: 'Motion Actuation (Level A)',
    number: '2.5.4',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html',
    level: 'A',
    description:
      'Functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-5-5',
    title: 'Target Size (Level AAA)',
    number: '2.5.5',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-5-6',
    title: 'Concurrent Input Mechanisms',
    number: '2.5.6',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/concurrent-input-mechanisms.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-5-7',
    title: 'Dragging Movements (Level AA)',
    number: '2.5.7',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html',
    level: 'AA',
    description:
      'All functionality that uses a dragging movement for operation can be achieved by a single pointer without dragging, unless dragging is essential or the functionality is determined by the user agent and not modified by the author.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-2-5-8',
    title: 'Target Size Minimum (Level AA)',
    number: '2.5.8',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html',
    level: 'AA',
    description:
      'The size of the target for pointer inputs is at least 24 by 24 CSS pixels, with a few exceptions.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-1-1',
    title: 'Language of Page (Level A)',
    number: '3.1.1',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html',
    level: 'A',
    description:
      'The default human language of each Web page can be programmatically determined.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-1-2',
    title: 'Language of Parts (Level AA)',
    number: '3.1.2',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html',
    level: 'AA',
    description:
      'The human language of each passage or phrase in the content can be programmatically determined.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-1-3',
    title: 'Unusual Words (Level AAA)',
    number: '3.1.3',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/unusual-words.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-1-4',
    title: 'Abbreviations (Level AAA)',
    number: '3.1.4',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/abbreviations.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-1-5',
    title: 'Reading Level (Level AAA)',
    number: '3.1.5',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-1-6',
    title: 'Pronunciation (Level AAA)',
    number: '3.1.6',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/pronunciation.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-2-1',
    title: 'On Focus (Level A)',
    number: '3.2.1',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html',
    level: 'A',
    description:
      'When any user interface component receives focus, it does not initiate a change of context.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-2-2',
    title: 'On Input (Level A)',
    number: '3.2.2',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/on-input.html',
    level: 'A',
    description:
      'Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-2-3',
    title: 'Consistent Navigation (Level AA)',
    number: '3.2.3',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html',
    level: 'A',
    description:
      'Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages occur in the same relative order each time they are repeated.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-2-4',
    title: 'Consistent Identification (Level AA)',
    number: '3.2.4',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html',
    level: 'AA',
    description:
      'Components that have the same functionality within a set of Web pages are identified consistently.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-2-5',
    title: 'Change on Request (Level AAA)',
    number: '3.2.5',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/change-on-request.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-2-6',
    title: 'Consistent Help (Level A)',
    number: '3.2.6',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html',
    level: 'A',
    description:
      'If a web page contains help mechanisms, and those help mechanisms are repeated on multiple web pages, the help mechanisms are consistent.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-3-1',
    title: 'Error Identification (Level A)',
    number: '3.3.1',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html',
    level: 'A',
    description:
      'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-3-2',
    title: 'Labels or Instructions (Level A)',
    number: '3.3.2',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html',
    level: 'A',
    description:
      'Labels or instructions are provided when content requires user input.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-3-3',
    title: 'Error Suggestion (Level AA)',
    number: '3.3.3',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html',
    level: 'AA',
    description:
      'If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-3-4',
    title: 'Error Prevention (Legal, Financial, Data) (Level AA)',
    number: '3.3.4',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html',
    level: 'AA',
    description:
      'For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true: submissions are reversible, data is checked and user is provided an opportunity to correct them, a mechanism is available for reviewing, confirming and correcting the information before finalizing the submission.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-3-5',
    title: 'Help (Level AAA)',
    number: '3.3.5',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/help.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-3-6',
    title: 'Error Prevention (All) (Level AAA)',
    number: '3.3.6',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-all.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-3-7',
    title: 'Redundant Entry (Level A)',
    number: '3.3.7',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html',
    level: 'A',
    description:
      'Information previously entered by or provided to the user that is required to be entered again in the same process is either auto-populated or available for the user to select',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-3-8',
    title: 'Accessible Authentication (Minimum) (Level AA)',
    number: '3.3.8',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html',
    level: 'AA',
    description:
      'A cognitive function test (such as remembering a password or solving a puzzle) is not required for any step in an authentication process (with some exceptions).',
  },
  {
    type: 'success-criteria',
    id: 'wcag-3-3-9',
    title: 'Accessible Authentication (Enhanced) (Level AAA)',
    number: '3.3.9',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html',
    level: 'AAA',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-4-1-2',
    title: 'Name, Role, Value (Level A)',
    number: '4.1.2',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html',
    level: 'A',
    description:
      'For all user interface components, the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-4-1-3',
    title: 'Status Messages (Level AA)',
    number: '4.1.3',
    url: 'https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html',
    level: 'AA',
    description:
      'In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.',
  },
  {
    type: 'success-criteria',
    id: 'wcag-5-2-1',
    title: 'Conformance Level',
    number: '5.2.1',
    url: 'https://www.w3.org/TR/WCAG22/#cc1',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-5-2-2',
    title: 'Full pages',
    number: '5.2.2',
    url: 'https://www.w3.org/TR/WCAG22/#cc2',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-5-2-3',
    title: 'Complete processes',
    number: '5.2.3',
    url: 'https://www.w3.org/TR/WCAG22/#cc3',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-5-2-4',
    title: 'Only Accessibility-Supported Ways of Using Technologies',
    number: '5.2.4',
    url: 'https://www.w3.org/TR/WCAG22/#cc4',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-5-2-5',
    title: 'Non-Interference',
    number: '5.2.5',
    url: 'https://www.w3.org/TR/WCAG22/#cc5',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-5-3-1',
    title: 'Required Components of a Conformance Claim',
    number: '5.3.1',
    url: 'https://www.w3.org/TR/WCAG22/#conformance-required',
    description: '',
  },
  {
    type: 'success-criteria',
    id: 'wcag-5-3-2',
    title: 'Optional Components of a Conformance Claim',
    number: '5.3.2',
    url: 'https://www.w3.org/TR/WCAG22/#conformance-optional',
    description: '',
  },
];
export default class DocWcagListIndexComponent extends Component {
  get filteredCriteria() {
    return CRITERIA.filter((criterion) =>
      this.args.criteriaList.includes(criterion.number),
    );
  }

  get classNames() {
    let classes = ['doc-wcag-list'];

    // add a class based on the @xxx argument
    // classes.push(`doc-wcag-list--xxx-${this.xxx}`);

    return classes.join(' ');
  }
}
