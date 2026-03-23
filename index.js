/**
 * Show or clear an inline error message under a field.
 * @param {string} inputId  - id of the <input> element
 * @param {string} errId    - id of the <span class="error-msg"> element
 * @param {string} message  - error text (empty string clears the error)
 */

function setError(inputId, errId, message) {
  const input = document.getElementById(inputId);
  const err   = document.getElementById(errId);
  if (!input || !err) return;

  if (message) {
    err.textContent = message;
    input.classList.add('error');
    input.classList.remove('success');
  } else {
    err.textContent = '';
    input.classList.remove('error');
    input.classList.add('success');
  }
}

/**
 * Returns true if the value is a valid email address.
 * @param {string} email
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Toggle password field visibility and flip button emoji.
 * @param {string} fieldId - id of the password <input>
 * @param {HTMLElement} btn - the toggle button element
 */

function togglePw(fieldId, btn) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  if (field.type === 'password') {
    field.type = 'text';
    btn.textContent = '🙈';
  } else {
    field.type = 'password';
    btn.textContent = '👁';
  }
}

/* ── Login Validation ── */
function validateLogin() {
  let valid = true;

  /* --- Username / Email --- */
  const userVal = (document.getElementById('loginUser')?.value || '').trim();
  if (!userVal) {
    setError('loginUser', 'loginUserErr', 'Username or email is required.');
    valid = false;
  } else if (userVal.includes('@') && !isValidEmail(userVal)) {
    setError('loginUser', 'loginUserErr', 'Please enter a valid email address.');
    valid = false;
  } else {
    setError('loginUser', 'loginUserErr', '');
  }

  /* --- Password --- */
  const pwVal = (document.getElementById('loginPw')?.value || '');
  if (!pwVal) {
    setError('loginPw', 'loginPwErr', 'Password is required.');
    valid = false;
  } else {
    setError('loginPw', 'loginPwErr', '');
  }

  /* --- On Success --- */
  if (valid) {
    const successBanner = document.getElementById('loginSuccess');
    if (successBanner) {
      successBanner.style.display = 'block';
      setTimeout(() => { window.location.href = 'index.html'; }, 1500);
    }
  }

  return valid;
}

/* ── Signup / Registration Validation ── */
function validateSignup() {
  let valid = true;

  /* --- Full Name --- */
  const nameVal = (document.getElementById('spName')?.value || '').trim();
  if (!nameVal) {
    setError('spName', 'spNameErr', 'Full name is required.');
    valid = false;
  } else {
    setError('spName', 'spNameErr', '');
  }

  /* --- Email --- */
  const emailVal = (document.getElementById('spEmail')?.value || '').trim();
  if (!emailVal) {
    setError('spEmail', 'spEmailErr', 'Email address is required.');
    valid = false;
  } else if (!isValidEmail(emailVal)) {
    setError('spEmail', 'spEmailErr', 'Please enter a valid email address (e.g. you@example.com).');
    valid = false;
  } else {
    setError('spEmail', 'spEmailErr', '');
  }

  /* --- Username --- */
  const userVal = (document.getElementById('spUser')?.value || '').trim();
  if (!userVal) {
    setError('spUser', 'spUserErr', 'Username is required.');
    valid = false;
  } else if (userVal.length < 3) {
    setError('spUser', 'spUserErr', 'Username must be at least 3 characters long.');
    valid = false;
  } else if (/\s/.test(userVal)) {
    setError('spUser', 'spUserErr', 'Username must not contain spaces.');
    valid = false;
  } else {
    setError('spUser', 'spUserErr', '');
  }

  /* --- Password --- */
  const pwVal      = (document.getElementById('spPw')?.value      || '');
  const confirmVal = (document.getElementById('spConfirm')?.value || '');

  if (!pwVal) {
    setError('spPw', 'spPwErr', 'Password is required.');
    valid = false;
  } else {
    setError('spPw', 'spPwErr', '');
  }

  /* --- Confirm Password --- */
  if (!confirmVal) {
    setError('spConfirm', 'spConfirmErr', 'Please confirm your password.');
    valid = false;
  } else if (pwVal && confirmVal !== pwVal) {
    setError('spConfirm', 'spConfirmErr', 'Passwords do not match. Please try again.');
    valid = false;
  } else if (pwVal) {
    setError('spConfirm', 'spConfirmErr', '');
  }

  /* --- On Success --- */
  if (valid) {
    const successBanner = document.getElementById('signupSuccess');
    if (successBanner) {
      successBanner.style.display = 'block';
      // Simulate redirect to login after 1.5 s
      setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    }
  }

  return valid;
}
