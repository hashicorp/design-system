/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

document.addEventListener('DOMContentLoaded', function () {
  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const previewBtn = document.getElementById('preview-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const modal = document.getElementById('preview-modal');
  const modalBackBtn = document.getElementById('modal-back-btn');
  const modalConfirmBtn = document.getElementById('modal-confirm-btn');
  const formErrorContainer = document.getElementById('form-error-container');
  const sideNav = document.querySelector('cds-side-nav');

  // Expand side nav by default after component loads
  if (sideNav) {
    customElements.whenDefined('cds-side-nav').then(() => {
      setTimeout(() => {
        sideNav.expanded = true;
      }, 100);
    });
  }

  function showFormError(show) {
    formErrorContainer.style.display = show ? 'block' : 'none';
  }

  // C15/C16 full-mode: set invalid state on individual cds-text-input elements
  function setFieldInvalid(field, invalid) {
    if (invalid) {
      field.setAttribute('invalid', '');
    } else {
      field.removeAttribute('invalid');
    }
  }

  // Preview & Submit button
  previewBtn.addEventListener('click', function () {
    const nameValue = nameInput.value || '';
    const emailValue = emailInput.value || '';
    const nameEmpty = !nameValue;
    const emailEmpty = !emailValue;

    // C15: field-level invalid state on cds-text-input (full-mode: invalid attr toggled per field)
    setFieldInvalid(nameInput, nameEmpty);
    setFieldInvalid(emailInput, emailEmpty);

    if (nameEmpty || emailEmpty) {
      showFormError(true);
      return;
    }

    showFormError(false);
    document.getElementById('modal-name').textContent = nameValue;
    document.getElementById('modal-email').textContent = emailValue;
    modal.setAttribute('open', '');
  });

  // Cancel button
  cancelBtn.addEventListener('click', function () {
    nameInput.value = '';
    emailInput.value = '';
    setFieldInvalid(nameInput, false);
    setFieldInvalid(emailInput, false);
    showFormError(false);
  });

  // Modal Go Back
  modalBackBtn.addEventListener('click', function () {
    modal.removeAttribute('open');
  });

  // Modal Confirm & Submit
  modalConfirmBtn.addEventListener('click', function () {
    const nameValue = nameInput.value;
    const emailValue = emailInput.value;

    alert(
      `Form submitted successfully!\nName: ${nameValue}\nEmail: ${emailValue}`,
    );

    nameInput.value = '';
    emailInput.value = '';
    setFieldInvalid(nameInput, false);
    setFieldInvalid(emailInput, false);
    showFormError(false);
    modal.removeAttribute('open');
  });

  // Close modal on backdrop/close-button
  modal.addEventListener('cds-modal-closed', function () {
    modal.removeAttribute('open');
  });
});
