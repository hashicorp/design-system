/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';

export default class CodeEditorController extends Controller {
  demoCode = `function greetUser(username) {
    // Get the current hour of the day
    const currentHour = new Date().getHours();
    let greeting;

    // Determine the greeting based on the time of day
    if (currentHour < 12) {
        greeting = "Good morning";
    } else if (currentHour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    // Create a personalized message
    const message = \`\${greeting}, \${username}! Welcome to our site.\`;

    // Create a new HTML element to display the message
    const greetingElement = document.createElement("div");
    greetingElement.textContent = message;
    greetingElement.style.fontSize = "20px";
    greetingElement.style.fontWeight = "bold";
    greetingElement.style.marginTop = "20px";

    // Add the greeting element to the document body
    document.body.appendChild(greetingElement);
  }`;
}
