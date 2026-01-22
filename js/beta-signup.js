// Keiro Beta Signup - Supabase Integration

// Supabase configuration
const SUPABASE_URL = 'https://tkypwlisfygrlsamrbit.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRreXB3bGlzZnlncmxzYW1yYml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MzIyMDgsImV4cCI6MjA4MjUwODIwOH0.m2tEriz9TlTCkKXCucSnHZgLZxdUlNfEN3Ro-oVjKxU';

// Initialize Supabase client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM Elements
const form = document.getElementById('beta-form');
const emailInput = document.getElementById('email');
const messageDiv = document.getElementById('form-message');
const submitBtn = form.querySelector('button[type="submit"]');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');

// Form submission handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Honeypot check - if filled, it's a bot
  const honeypot = form.querySelector('input[name="website"]');
  if (honeypot && honeypot.value) {
    // Silently reject bot submission
    showMessage('Thanks for signing up!', 'success');
    form.reset();
    return;
  }

  // Get form values
  const email = emailInput.value.trim();
  const iosChecked = form.querySelector('input[name="ios"]').checked;
  const androidChecked = form.querySelector('input[name="android"]').checked;

  // Determine platform
  let platform = null;
  if (iosChecked && androidChecked) {
    platform = 'both';
  } else if (iosChecked) {
    platform = 'ios';
  } else if (androidChecked) {
    platform = 'android';
  }

  // Validate email
  if (!email || !isValidEmail(email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }

  // Validate platform selection
  if (!iosChecked && !androidChecked) {
    showMessage('Please select at least one platform (iOS or Android).', 'error');
    highlightPlatforms(true);
    return;
  }

  // Show loading state
  setLoading(true);

  try {
    // Insert into Supabase
    const { data, error } = await supabaseClient
      .from('beta_signups')
      .insert([
        { email: email, platform: platform }
      ])
      .select();

    if (error) {
      // Check for duplicate email
      if (error.code === '23505') {
        showMessage('You\'re already signed up! We\'ll be in touch soon.', 'success');
      } else {
        console.error('Supabase error:', error);
        showMessage('Something went wrong. Please try again.', 'error');
      }
    } else {
      // Success
      showMessage('Thanks for signing up! We\'ll send you an invite soon.', 'success');
      form.reset();
    }
  } catch (err) {
    console.error('Error:', err);
    showMessage('Something went wrong. Please try again.', 'error');
  } finally {
    setLoading(false);
  }
});

// Helper: Validate email format
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Helper: Show message
function showMessage(message, type) {
  messageDiv.textContent = message;
  messageDiv.className = 'form-message ' + type;
  messageDiv.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}

// Helper: Set loading state
function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  btnText.style.display = isLoading ? 'none' : 'inline';
  btnLoading.style.display = isLoading ? 'inline-flex' : 'none';
}

// Helper: Highlight platforms when validation fails
function highlightPlatforms(highlight) {
  const platformsDiv = document.querySelector('.form-platforms');
  if (highlight) {
    platformsDiv.classList.add('platforms-error');
    setTimeout(() => {
      platformsDiv.classList.remove('platforms-error');
    }, 3000);
  } else {
    platformsDiv.classList.remove('platforms-error');
  }
}
