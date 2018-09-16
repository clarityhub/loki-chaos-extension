import routines from 'routines';

/**
 * Fake observable pattern
 */
class Observable {
  constructor() {
    this.listeners = [];
  }

  take(func) {
    this.listeners.push(func);
  }

  next(data) {
    this.listeners.forEach(f => f(data));
  }
}

const settings$ = new Observable();

// Set up every routine
Object.keys(routines).forEach(key => {
  routines[key].invoke(settings$);
});

// Check for initial settings
if (window.__chceSettings) {
  settings$.next(window.__chceSettings);
}

// Listen for settings
window.addEventListener('chce-settings', (event) => {
  settings$.next(JSON.parse(event.detail));
});
