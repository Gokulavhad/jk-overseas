/**
 * JK OVERSEAS — Contact Form Email Handler
 * Uses Web3Forms — sends form data directly to your inbox.
 * No account creation. No templates. No SDK setup.
 *
 * ── ONE-TIME SETUP (60 seconds) ──────────────────────────────
 * 1. Open https://web3forms.com in your browser
 * 2. Enter:  info@jkoverseas.com  and click "Create Access Key"
 * 3. You receive a key like:  xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 * 4. Paste that key below ↓
 * ─────────────────────────────────────────────────────────────
 */

const WEB3FORMS_ACCESS_KEY = 'a0576983-89f1-44fd-9d47-94672d9c2a1b';
/*                            ↑ paste your key from web3forms.com */

(function () {
  'use strict';

  const form      = document.getElementById('contactForm');
  const submitBtn = form && form.querySelector('[type="submit"]');
  const successBox = document.getElementById('formSuccess');
  const errorBox   = document.getElementById('formError');

  if (!form) return;

  /* ── UI helpers ── */
  function showBox(box, msg) {
    if (!box) return;
    const span = box.querySelector('.feedback-text');
    if (span) span.textContent = msg;
    box.classList.add('visible');
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(function () { box.classList.remove('visible'); }, 9000);
  }

  function hideBoxes() {
    [successBox, errorBox].forEach(function (b) {
      if (b) b.classList.remove('visible');
    });
  }

  function setLoading(on) {
    if (!submitBtn) return;
    if (on) {
      submitBtn.disabled = true;
      submitBtn.dataset.orig = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
        'style="animation:jko-spin 0.8s linear infinite" aria-hidden="true">' +
        '<path d="M21 12a9 9 0 11-6.219-8.56"/></svg> Sending…';
    } else {
      submitBtn.disabled = false;
      submitBtn.innerHTML = submitBtn.dataset.orig || 'Send Message';
    }
  }

  /* ── Inject spinner keyframe once ── */
  if (!document.getElementById('jko-spin-css')) {
    var s = document.createElement('style');
    s.id = 'jko-spin-css';
    s.textContent = '@keyframes jko-spin{to{transform:rotate(360deg)}}';
    document.head.appendChild(s);
  }

  /* ── Validation ── */
  function validate() {
    var ok = true;
    form.querySelectorAll('.field-error').forEach(function (el) { el.textContent = ''; });
    form.querySelectorAll('.field-invalid').forEach(function (el) { el.classList.remove('field-invalid'); });

    form.querySelectorAll('[required]').forEach(function (f) {
      if (!f.value.trim()) {
        ok = false;
        f.classList.add('field-invalid');
        var e = f.parentElement.querySelector('.field-error');
        if (e) e.textContent = 'This field is required.';
      }
    });

    var em = form.querySelector('[type="email"]');
    if (em && em.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)) {
      ok = false;
      em.classList.add('field-invalid');
      var e2 = em.parentElement.querySelector('.field-error');
      if (e2) e2.textContent = 'Please enter a valid email address.';
    }
    return ok;
  }

  /* ── Collect all field values into one plain object ── */
  function collectData() {
    var firstName = (document.getElementById('firstName') || {}).value || '';
    var lastName  = (document.getElementById('lastName')  || {}).value || '';
    return {
      access_key:       WEB3FORMS_ACCESS_KEY,
      subject:          'New Enquiry — JK Overseas Website [' + (firstName + ' ' + lastName).trim() + ']',
      from_name:        (firstName + ' ' + lastName).trim(),
      email:            (document.getElementById('email')           || {}).value || '',
      phone:            (document.getElementById('phone')           || {}).value || '—',
      company:          (document.getElementById('company')         || {}).value || '—',
      country:          (document.getElementById('country')         || {}).value || '—',
      enquiry_type:     (document.getElementById('enquiryType')     || {}).value || '—',
      product_interest: (document.getElementById('productInterest') || {}).value || '—',
      message:          (document.getElementById('message')         || {}).value || '',
      newsletter:       ((document.getElementById('newsletter') || {}).checked) ? 'Yes' : 'No',
      /* Tell Web3Forms to use a simple plain-text format */
      replyto:          (document.getElementById('email') || {}).value || '',
    };
  }

  /* ── Submit ── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    hideBoxes();
    if (!validate()) return;

    if (WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      showBox(errorBox,
        'Setup needed: open js/contact.js and paste your Web3Forms access key. ' +
        'Get it free at web3forms.com in 60 seconds.');
      return;
    }

    setLoading(true);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(collectData())
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      setLoading(false);
      if (data.success) {
        form.reset();
        showBox(successBox,
          'Message sent to info@jkoverseas.com ✓  ' +
          'We will respond within one business day.');
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    })
    .catch(function (err) {
      setLoading(false);
      console.error('Web3Forms error:', err);
      showBox(errorBox,
        'Could not send right now. Email us directly: info@jkoverseas.com ' +
        'or call +91 98765 43210.');
    });
  });

  /* ── Clear errors on input ── */
  form.querySelectorAll('.form-control').forEach(function (f) {
    f.addEventListener('input', function () {
      this.classList.remove('field-invalid');
      var e = this.parentElement.querySelector('.field-error');
      if (e) e.textContent = '';
    });
  });

})();
