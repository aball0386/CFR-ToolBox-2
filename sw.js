// Settings menu toggle
function toggleMenu() {
  const panel = document.getElementById('settingsPanel');
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

// Open custom URI (e.g., what3words) with fallback to website
function openCustomUri(uri, fallbackUrl) {
  const isAndroid = /android/i.test(navigator.userAgent);
  if (!isAndroid) {
    window.open(fallbackUrl, '_blank');
    return;
  }

  let opened = false;
  window.location.href = uri;

  setTimeout(() => {
    if (!opened) {
      if (confirm('App not detected. Open Play Store page?')) {
        window.open(fallbackUrl, '_blank');
      }
    }
  }, 1500);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      opened = true;
    }
  });
}

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('change', e => {
  if (e.target.checked) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  localStorage.setItem('darkMode', e.target.checked);
});

// Theme color toggle between ambulance green and responder red
document.getElementById('themeColorToggle').addEventListener('change', e => {
  if (e.target.checked) {
    document.documentElement.classList.add('responder-red');
  } else {
    document.documentElement.classList.remove('responder-red');
  }
  localStorage.setItem('themeColor', e.target.checked ? 'red' : 'green');
});

// Bionic reading toggle
document.getElementById('bionicToggle').addEventListener('change', e => {
  if (e.target.checked) {
    document.body.classList.add('bionic-reading');
    applyBionicReading();
  } else {
    document.body.classList.remove('bionic-reading');
    removeBionicReading();
  }
  localStorage.setItem('bionicReading', e.target.checked);
});

// Load saved preferences on page load
window.onload = () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').checked = true;
  }
  if (localStorage.getItem('themeColor') === 'red') {
    document.documentElement.classList.add('responder-red');
    document.getElementById('themeColorToggle').checked = true;
  }
  if (localStorage.getItem('bionicReading') === 'true') {
    document.body.classList.add('bionic-reading');
    document.getElementById('bionicToggle').checked = true;
    applyBionicReading();
  }
};

// Apply bionic reading effect (bold first half of each word)
function applyBionicReading() {
  const elements = document.querySelectorAll('.toolbox button, #stopwatch');
  elements.forEach(el => {
    const text = el.textContent || el.innerText;
    const words = text.split(' ');
    const newHtml = words.map(word => {
      const mid = Math.ceil(word.length / 2);
      return `<span class="bionic">${word.slice(0, mid)}</span>${word.slice(mid)}`;
    }).join(' ');
    el.innerHTML = newHtml;
  });
}

// Remove bionic reading by reloading the page
function removeBionicReading() {
  location.reload();
}

// Open an app by package name with fallback to Play Store or website
function openApp(packageName, fallbackUrl = null, isOutlook = false) {
  if (!packageName) return;

  const isAndroid = /android/i.test(navigator.userAgent);
  if (!isAndroid) {
    if (fallbackUrl) {
      window.open(fallbackUrl, '_blank');
    } else {
      alert('This function works best on Android devices.');
    }
    return;
  }

  if (!fallbackUrl) {
    fallbackUrl = `https://play.google.com/store/apps/details?id=${packageName}`;
  }

  let intentUrl;
  if (isOutlook) {
    intentUrl = `intent://#Intent;package=com.microsoft.office.outlook;S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;
  } else {
    intentUrl = `intent://#Intent;package=${packageName};S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;
  }

  let opened = false;
  window.location.href = intentUrl;

  setTimeout(() => {
    if (!opened) {
      if (confirm('App not detected. Open Play Store page?')) {
        window.open(fallbackUrl, '_blank');
      }
    }
  }, 1500);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      opened = true;
    }
  });
}

// Open website in a new tab
function openWebsite(url) {
  window.open(url, '_blank');
}

// Open default email client with mailto:
function openMail() {
  window.location.href = 'mailto:?subject=SECamb%20CFR%20Enquiry';
}

// Call phone number via dialer
function callNumber(number) {
  window.location.href = `tel:${number}`;
}

// Stopwatch logic and controls
let stopwatchInterval = null;
let elapsedTime = 0;
const startStopBtn = document.getElementById('startStopBtn');

function updateStopwatchDisplay() {
  const hours = Math.floor(elapsedTime / 3600);
  const mins = Math.floor((elapsedTime % 3600) / 60);
  const secs = elapsedTime % 60;
  document.getElementById('time').textContent =
    `${hours.toString().padStart(2, '0')}:` +
    `${mins.toString().padStart(2, '0')}:` +
    `${secs.toString().padStart(2, '0')}`;
}

function toggleStopwatch() {
  if (stopwatchInterval) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    startStopBtn.textContent = 'Start';
  } else {
    stopwatchInterval = setInterval(() => {
      elapsedTime++;
      updateStopwatchDisplay();
    }, 1000);
    startStopBtn.textContent = 'Stop';
  }
}

function resetStopwatch() {
  if (stopwatchInterval) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    startStopBtn.textContent = 'Start';
  }
  elapsedTime = 0;
  updateStopwatchDisplay();
}

// Initialize stopwatch display on load
updateStopwatchDisplay();





