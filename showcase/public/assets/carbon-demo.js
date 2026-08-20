/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// Simple form interaction logic
document.addEventListener('DOMContentLoaded', function () {
  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const previewBtn = document.getElementById('preview-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const modal = document.getElementById('preview-modal');
  const modalBackBtn = document.getElementById('modal-back-btn');
  const modalConfirmBtn = document.getElementById('modal-confirm-btn');
  const sideNav = document.querySelector('cds-side-nav');

  // Expand side nav by default after component loads
  if (sideNav) {
    // Wait for the component to be fully defined
    customElements.whenDefined('cds-side-nav').then(() => {
      // Small delay to ensure component is ready
      setTimeout(() => {
        sideNav.expanded = true;
      }, 100);
    });
  }

  // Preview button click
  previewBtn.addEventListener('click', function () {
    const nameValue = nameInput.value || '';
    const emailValue = emailInput.value || '';

    if (!nameValue || !emailValue) {
      alert('Please fill out all required fields.');
      return;
    }

    // Update modal content
    document.getElementById('modal-name').textContent = nameValue;
    document.getElementById('modal-email').textContent = emailValue;

    // Open modal
    modal.setAttribute('open', '');
  });

  // Cancel button click
  cancelBtn.addEventListener('click', function () {
    if (confirm('Are you sure you want to cancel? All data will be lost.')) {
      nameInput.value = '';
      emailInput.value = '';
    }
  });

  // Modal back button
  modalBackBtn.addEventListener('click', function () {
    modal.removeAttribute('open');
  });

  // Modal confirm button
  modalConfirmBtn.addEventListener('click', function () {
    const nameValue = nameInput.value;
    const emailValue = emailInput.value;

    alert(`Form submitted!\nName: ${nameValue}\nEmail: ${emailValue}`);

    // Reset form and close modal
    nameInput.value = '';
    emailInput.value = '';
    modal.removeAttribute('open');
  });

  // Close modal on backdrop click
  modal.addEventListener('cds-modal-closed', function () {
    modal.removeAttribute('open');
  });
});
