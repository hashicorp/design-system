import Component from '@glimmer/component';

export default class DocWcagListComponent extends Component {
  criteria = [
    {
      type: 'success-criteria',
      id: 'wcag-1-1-1',
      attributes: {
        title: 'Non-text Content (Level A)',
        number: '1.1.1',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html',
        level: 'A',
        description:
          'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-2-1',
      attributes: {
        title: '',
        number: '1.2.1',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded.html',
        level: 'A',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-2-2',
      attributes: {
        title: 'Prerecorded Captions (Level A)',
        number: '1.2.2',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded.html',
        level: 'A',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-2-3',
      attributes: {
        title: 'Audio Description or Media Alternative (Level A)',
        number: '1.2.3',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-or-media-alternative-prerecorded.html',
        level: 'A',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-2-4',
      attributes: {
        html: '<p>Live Captions (Level AA)</p>',
        title: 'Live Captions (Level AA)',
        number: '1.2.4',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/captions-live.html',
        level: 'AA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-2-5',
      attributes: {
        html: '<p>Prerecorded Media Audio Description (Level AA)</p>',
        title: 'Prerecorded Media Audio Description (Level AA)',
        number: '1.2.5',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-prerecorded.html',
        level: 'AA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-2-6',
      attributes: {
        html: '<p>Prerecorded Media Sign Language (Level AAA)</p>',
        title: 'Prerecorded Media Sign Language (Level AAA)',
        number: '1.2.6',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/sign-language-prerecorded.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-2-7',
      attributes: {
        html: '<p>Prerecorded Media Extended Audio Description (Level AAA)</p>',
        title: 'Prerecorded Media Extended Audio Description (Level AAA)',
        number: '1.2.7',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/extended-audio-description-prerecorded.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-2-8',
      attributes: {
        html: '<p>Prerecorded Media Alternative (Level AAA)</p>',
        title: 'Prerecorded Media Alternative (Level AAA)',
        number: '1.2.8',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/media-alternative-prerecorded.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-2-9',
      attributes: {
        html: '<p>Live Media Audio Only (Level AAA)</p>',
        title: 'Live Media Audio Only (Level AAA)',
        number: '1.2.9',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-live.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-3-1',
      attributes: {
        html: '<p>Info and Relationships (Level A)</p>',
        title: 'Info and Relationships (Level A)',
        number: '1.3.1',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html',
        level: 'A',
        description:
          'Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-3-2',
      attributes: {
        html: '<p>Meaningful Sequence (Level A)</p>',
        title: 'Meaningful Sequence (Level A)',
        number: '1.3.2',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence.html',
        level: 'A',
        description:
          'When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-3-3',
      attributes: {
        html: '<p>Sensory Characteristics (Level A)</p>',
        title: 'Sensory Characteristics (Level A)',
        number: '1.3.3',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/sensory-characteristics.html',
        level: 'A',
        description:
          'Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, color, size, visual location, orientation, or sound.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-3-4',
      attributes: {
        html: '<p>Orientation (Level AA)</p>',
        title: 'Orientation (Level AA)',
        number: '1.3.4',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/orientation.html',
        level: 'AA',
        description:
          'Content does not restrict its view and operation to a single display orientation, such as portrait or landscape.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-3-5',
      attributes: {
        html: '<p>Identify Input Purpose (Level AA)</p>',
        title: 'Identify Input Purpose (Level AA)',
        number: '1.3.5',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html',
        level: 'AA',
        description:
          'The purpose of each input field collecting information about the user can be programmatically determined when the input field serves a purpose identified in the Input Purposes for User Interface Components section; and the content is implemented using technologies with support for identifying the expected meaning for form input data.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-3-6',
      attributes: {
        html: '<p>Identify Purpose (Level AAA)</p>',
        title: 'Identify Purpose (Level AAA)',
        number: '1.3.6',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/identify-purpose.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-4-1',
      attributes: {
        html: '<p>Use of Color (Level A)</p>',
        title: 'Use of Color (Level A)',
        number: '1.4.1',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html',
        level: 'A',
        description:
          'Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-4-10',
      attributes: {
        html: '<p>Reflow (Level AA)</p>',
        title: 'Reflow (Level AA)',
        number: '1.4.10',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/reflow.html',
        level: 'AA',
        description:
          'Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-4-11',
      attributes: {
        html: '<p>Non-text Contrast (Level AA)</p>',
        title: 'Non-text Contrast (Level AA)',
        number: '1.4.11',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html',
        level: 'AA',
        description:
          'The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s): user interface components; graphical objects.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-4-12',
      attributes: {
        html: '<p>Text Spacing (Level AA)</p>',
        title: 'Text Spacing (Level AA)',
        number: '1.4.12',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html',
        level: 'AA',
        description:
          'No loss of content or functionality occurs by setting all of the following and by changing no other style property: line height set to 1.5; spacing following paragraphs set to at least 2x the font size; letter-spacing set at least 0.12x of the font size, word spacing set to at least 0.16 times the font size.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-4-13',
      attributes: {
        html: '<p>Content on Hover or Focus (Level AA)</p>',
        title: 'Content on Hover or Focus (Level AA)',
        number: '1.4.13',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html',
        level: 'AA',
        description:
          'Where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true: dismissible, hoverable, persistent (see link).',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-4-2',
      attributes: {
        html: '<p>Audio Control (Level A)</p>',
        title: 'Audio Control (Level A)',
        number: '1.4.2',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-control.html',
        level: 'A',
        description:
          'If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-4-3',
      attributes: {
        html: '<p>Minimum Contrast (Level AA)</p>',
        title: 'Minimum Contrast (Level AA)',
        number: '1.4.3',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html',
        level: 'AA',
        description:
          'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-4-4',
      attributes: {
        html: '<p>Resize Text (Level AA)</p>',
        title: 'Resize Text (Level AA)',
        number: '1.4.4',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html',
        level: 'AA',
        description:
          'Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-4-5',
      attributes: {
        html: '<p>Images of Text (Level AA)</p>',
        title: 'Images of Text (Level AA)',
        number: '1.4.5',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/images-of-text.html',
        level: 'AA',
        description:
          'This is old. Don’t do this. Use text. Also a logo is not an image of text, so that’s fine.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-4-6',
      attributes: {
        html: '<p>Enhanced Contrast (Level AAA)</p>',
        title: 'Enhanced Contrast (Level AAA)',
        number: '1.4.6',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-4-7',
      attributes: {
        html: '<p>Low or No Background Audio (Level AAA)</p>',
        title: 'Low or No Background Audio (Level AAA)',
        number: '1.4.7',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/low-or-no-background-audio.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-4-8',
      attributes: {
        html: '<p>Visual Presentation (Level AAA)</p>',
        title: 'Visual Presentation (Level AAA)',
        number: '1.4.8',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-1-4-9',
      attributes: {
        html: '<p>Images of Text (Level AAA)</p>',
        title: 'Images of Text (Level AAA)',
        number: '1.4.9',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/images-of-text-no-exception.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-1-1',
      attributes: {
        html: '<p>Keyboard (Level A)</p>',
        title: 'Keyboard (Level A)',
        number: '2.1.1',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html',
        level: 'A',
        description:
          'All functionality of the content is operable through a keyboard interface.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-1-2',
      attributes: {
        html: '<p>No Keyboard Trap (Level A)</p>',
        title: 'No Keyboard Trap (Level A)',
        number: '2.1.2',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html',
        level: 'A',
        description:
          'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-1-3',
      attributes: {
        html: '<p>Keyboard (Level AAA)</p>',
        title: 'Keyboard (Level AAA)',
        number: '2.1.3',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard-no-exception.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-1-4',
      attributes: {
        html: '<p>Character Key Shortcuts (Level A)</p>',
        title: 'Character Key Shortcuts (Level A)',
        number: '2.1.4',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/character-key-shortcuts.html',
        level: 'A',
        description:
          'If a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then it should be able to be turned off, remapped, or active only on focus.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-2-1',
      attributes: {
        html: '<p>Timing Adjustable (Level A)</p>',
        title: 'Timing Adjustable (Level A)',
        number: '2.2.1',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html',
        level: 'A',
        description:
          'If there are time limitations set by the content, one of the following should be true: turn off, adjust, extend, real-time exception, essential exception, 20 hour exception.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-2-2',
      attributes: {
        html: '<p>Pause, Stop, Hide (Level A)</p>',
        title: 'Pause, Stop, Hide (Level A)',
        number: '2.2.2',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html',
        level: 'A',
        description:
          'If you have moving, blinking, scrolling or auto-updating information, read the guidance because there are a lot of details.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-2-3',
      attributes: {
        html: '<p>No Timing (Level AAA)</p>',
        title: 'No Timing (Level AAA)',
        number: '2.2.3',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/no-timing.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-2-4',
      attributes: {
        html: '<p>Interruptions (Level AAA)</p>',
        title: 'Interruptions (Level AAA)',
        number: '2.2.4',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/interruptions.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-2-5',
      attributes: {
        html: '<p>Re-authenticating (Level AAA)</p>',
        title: 'Re-authenticating (Level AAA)',
        number: '2.2.5',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/re-authenticating.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-2-6',
      attributes: {
        html: '<p>Timeouts (Level AAA)</p>',
        title: 'Timeouts (Level AAA)',
        number: '2.2.6',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/timeouts.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-3-1',
      attributes: {
        html: '<p>Three Flashes or Below Threshold (Level A)</p>',
        title: 'Three Flashes or Below Threshold (Level A)',
        number: '2.3.1',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html',
        level: 'A',
        description:
          'Web pages do not contain anything that flashes more than three times in any one second period.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-3-2',
      attributes: {
        html: '<p>Three Flashes (Level AAA)</p>',
        title: 'Three Flashes (Level AAA)',
        number: '2.3.2',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/three-flashes.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-3-3',
      attributes: {
        html: '<p>Animation from Interactions (Level AAA)</p>',
        title: 'Animation from Interactions (Level AAA)',
        number: '2.3.3',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-4-1',
      attributes: {
        html: '<p>Bypass Blocks</p>',
        title: 'Bypass Blocks',
        number: '2.4.1',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html',
        level: 'A',
        description:
          'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-4-10',
      attributes: {
        html: '<p>Section Headings (Level AAA)</p>',
        title: 'Section Headings (Level AAA)',
        number: '2.4.10',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/section-headings.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-4-2',
      attributes: {
        html: '<p>Page Titled (Level A)</p>',
        title: 'Page Titled (Level A)',
        number: '2.4.2',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html',
        level: 'A',
        description: 'Web pages have titles that describe topic or purpose.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-4-3',
      attributes: {
        html: '<p>Focus Order (Level A)</p>',
        title: 'Focus Order (Level A)',
        number: '2.4.3',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html',
        level: 'A',
        description:
          'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-4-4',
      attributes: {
        html: '<p>Link Purpose In Context (Level A)</p>',
        title: 'Link Purpose In Context (Level A)',
        number: '2.4.4',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html',
        level: 'A',
        description:
          'The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-4-5',
      attributes: {
        html: '<p>Multiple Ways (Level AA)</p>',
        title: 'Multiple Ways (Level AA)',
        number: '2.4.5',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/multiple-ways.html',
        level: 'AA',
        description:
          'More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-4-6',
      attributes: {
        html: '<p>Headings and Labels (Level AA)</p>',
        title: 'Headings and Labels (Level AA)',
        number: '2.4.6',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html',
        level: 'AA',
        description: 'Headings and labels describe topic or purpose.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-4-7',
      attributes: {
        html: '<p>Focus Visible (Level AA)</p>',
        title: 'Focus Visible (Level AA)',
        number: '2.4.7',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html',
        level: 'AA',
        description:
          'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-4-8',
      attributes: {
        html: '<p>Location (Level AAA)</p>',
        title: 'Location (Level AAA)',
        number: '2.4.8',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/location.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-4-9',
      attributes: {
        html: '<p>Link Purpose, Link Only (Level AAA)</p>',
        title: 'Link Purpose, Link Only (Level AAA)',
        number: '2.4.9',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-link-only.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-5-1',
      attributes: {
        html: '<p>Pointer Gestures (Level A)</p>',
        title: 'Pointer Gestures (Level A)',
        number: '2.5.1',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/pointer-gestures.html',
        level: 'A',
        description:
          'All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-5-2',
      attributes: {
        html: '<p>Pointer Gestures</p>',
        title: 'Pointer Gestures',
        number: '2.5.2',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/pointer-cancellation.html',
        level: 'A',
        description:
          'For functionality that can be operated using a single pointer, at least one of these is true: there is no down-event, there is a mechanism to abort or undo the function, the up-event reverses any outcome of the preceding down-event, or completing the function on the down-event is essential.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-5-3',
      attributes: {
        html: '<p>Label in Name</p>',
        title: 'Label in Name',
        number: '2.5.3',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html',
        level: 'A',
        description:
          'For user interface components with labels that include text or images of text, the name contains the text that is presented visually.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-5-4',
      attributes: {
        html: '<p>Motion Actuation</p>',
        title: 'Motion Actuation',
        number: '2.5.4',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/motion-actuation.html',
        level: 'A',
        description:
          'Functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-5-5',
      attributes: {
        html: '<p>Target Size</p>',
        title: 'Target Size',
        number: '2.5.5',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/target-size',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-2-5-6',
      attributes: {
        html: '<p>Concurrent Input Mechanisms</p>',
        title: 'Concurrent Input Mechanisms',
        number: '2.5.6',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/concurrent-input-mechanisms.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-1-1',
      attributes: {
        html: '<p>Language of Page (Level A)</p>',
        title: 'Language of Page (Level A)',
        number: '3.1.1',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html',
        level: 'A',
        description:
          'The default human language of each Web page can be programmatically determined.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-1-2',
      attributes: {
        html: '<p>Language of Parts (Level AA)</p>',
        title: 'Language of Parts (Level AA)',
        number: '3.1.2',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-parts.html',
        level: 'AA',
        description:
          'The human language of each passage or phrase in the content can be programmatically determined.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-1-3',
      attributes: {
        html: '<p>Unusual Words (Level AAA)</p>',
        title: 'Unusual Words (Level AAA)',
        number: '3.1.3',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/unusual-words.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-1-4',
      attributes: {
        html: '<p>Abbreviations (Level AAA)</p>',
        title: 'Abbreviations (Level AAA)',
        number: '3.1.4',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/abbreviations.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-1-5',
      attributes: {
        html: '<p>Reading Level (Level AAA)</p>',
        title: 'Reading Level (Level AAA)',
        number: '3.1.5',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/reading-level.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-1-6',
      attributes: {
        html: '<p>Pronunciation (Level AAA)</p>',
        title: 'Pronunciation (Level AAA)',
        number: '3.1.6',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/pronunciation.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-2-1',
      attributes: {
        html: '<p>On Focus (Level A)</p>',
        title: 'On Focus (Level A)',
        number: '3.2.1',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/on-focus.html',
        level: 'A',
        description:
          'When any user interface component receives focus, it does not initiate a change of context.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-2-2',
      attributes: {
        html: '<p>On Input (Level A)</p>',
        title: 'On Input (Level A)',
        number: '3.2.2',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/on-input.html',
        level: 'A',
        description:
          'Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-2-3',
      attributes: {
        html: '<p>Consistent Navigation (Level AA)</p>',
        title: 'Consistent Navigation (Level AA)',
        number: '3.2.3',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/consistent-navigation.html',
        level: 'A',
        description:
          'Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages occur in the same relative order each time they are repeated.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-2-4',
      attributes: {
        html: '<p>Consistent Identification (Level AA)</p>',
        title: 'Consistent Identification (Level AA)',
        number: '3.2.4',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/consistent-identification.html',
        level: 'AA',
        description:
          'Components that have the same functionality within a set of Web pages are identified consistently.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-2-5',
      attributes: {
        html: '<p>Change on Request (Level AAA)</p>',
        title: 'Change on Request (Level AAA)',
        number: '3.2.5',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/change-on-request.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-3-1',
      attributes: {
        html: '<p>Error Identification (Level A)</p>',
        title: 'Error Identification (Level A)',
        number: '3.3.1',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html',
        level: 'A',
        description:
          'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-3-2',
      attributes: {
        html: '<p>Labels or Instructions (Level A)</p>',
        title: 'Labels or Instructions (Level A)',
        number: '3.3.2',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html',
        level: 'A',
        description:
          'Labels or instructions are provided when content requires user input.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-3-3',
      attributes: {
        html: '<p>Error Suggestion (Level AA)</p>',
        title: 'Error Suggestion (Level AA)',
        number: '3.3.3',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html',
        level: 'AA',
        description:
          'If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-3-4',
      attributes: {
        html: '<p>Error Prevention (Legal, Financial, Data) (Level AA)</p>',
        title: 'Error Prevention (Legal, Financial, Data) (Level AA)',
        number: '3.3.4',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html',
        level: 'AA',
        description:
          'For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true: submissions are reversible, data is checked and user is provided an opportunity to correct them, a mechanism is available for reviewing, confirming and correcting the information before finalizing the submission.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-3-5',
      attributes: {
        html: '<p>Help (Level AAA)</p>',
        title: 'Help (Level AAA)',
        number: '3.3.5',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/help.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-3-3-6',
      attributes: {
        html: '<p>Error Prevention (All) (Level AAA)</p>',
        title: 'Error Prevention (All) (Level AAA)',
        number: '3.3.6',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-all.html',
        level: 'AAA',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-4-1-1',
      attributes: {
        html: '<p>Parsing (Level A)</p>',
        title: 'Parsing (Level A)',
        number: '4.1.1',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/parsing.html',
        level: 'A',
        description:
          'In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-4-1-2',
      attributes: {
        html: '<p>Name, Role, Value (Level A)</p>',
        title: 'Name, Role, Value (Level A)',
        number: '4.1.2',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
        level: 'A',
        description:
          'For all user interface components, the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-4-1-3',
      attributes: {
        html: '<p>Status Messages (Level AA)</p>',
        title: 'Status Messages (Level AA)',
        number: '4.1.3',
        url: 'https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html',
        level: 'AA',
        description:
          'In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-5-2-1',
      attributes: {
        html: '<p>Conformance Level</p>',
        title: 'Conformance Level',
        number: '5.2.1',
        url: 'https://www.w3.org/TR/WCAG21/#cc1',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-5-2-2',
      attributes: {
        html: '<p>Full pages</p>',
        title: 'Full pages',
        number: '5.2.2',
        url: 'https://www.w3.org/TR/WCAG21/#cc2',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-5-2-3',
      attributes: {
        html: '<p>Complete processes</p>',
        title: 'Complete processes',
        number: '5.2.3',
        url: 'https://www.w3.org/TR/WCAG21/#cc3',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-5-2-4',
      attributes: {
        html: '<p>Only Accessibility-Supported Ways of Using Technologies</p>',
        title: 'Only Accessibility-Supported Ways of Using Technologies',
        number: '5.2.4',
        url: 'https://www.w3.org/TR/WCAG21/#cc4',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-5-2-5',
      attributes: {
        html: '<p>Non-Interference</p>',
        title: 'Non-Interference',
        number: '5.2.5',
        url: 'https://www.w3.org/TR/WCAG21/#cc5',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-5-3-1',
      attributes: {
        html: '<p>Required Components of a Conformance Claim</p>',
        title: 'Required Components of a Conformance Claim',
        number: '5.3.1',
        url: 'https://www.w3.org/TR/WCAG21/#conformance-required',
        description: '',
      },
    },
    {
      type: 'success-criteria',
      id: 'wcag-5-3-2',
      attributes: {
        html: '<p>Optional Components of a Conformance Claim</p>',
        title: 'Optional Components of a Conformance Claim',
        number: '5.3.2',
        url: 'https://www.w3.org/TR/WCAG21/#conformance-optional',
        description: '',
      },
    },
  ];
}
