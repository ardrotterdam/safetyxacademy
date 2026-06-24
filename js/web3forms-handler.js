document.querySelectorAll('form').forEach(form => {
  if (!form.action.includes('web3forms')) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    const isInput = submitBtn.tagName === 'INPUT';
    const originalText = isInput ? submitBtn.value : submitBtn.textContent;

    const redirectUrl = form.dataset.redirect || '/bedankt.html';
    const sendingText = form.dataset.sending || 'Versturen...';
    const errorText = form.dataset.error || 'Er ging iets mis. Mail rechtstreeks naar info@safetyxacademy.nl of probeer opnieuw.';

    submitBtn.disabled = true;
    if (isInput) {
      submitBtn.value = sendingText;
    } else {
      submitBtn.textContent = sendingText;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = redirectUrl;
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      submitBtn.disabled = false;
      if (isInput) {
        submitBtn.value = originalText;
      } else {
        submitBtn.textContent = originalText;
      }
      alert(errorText);
      console.error('Form submission error:', error);
    }
  });
});
