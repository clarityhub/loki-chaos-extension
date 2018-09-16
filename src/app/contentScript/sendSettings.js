/**
 * Inject settings into the page
 */
export default (data) => {
  const source = `
  (function () {
    window.__chceSettings = JSON.parse('${JSON.stringify(data)}');
    const event = new CustomEvent('chce-settings', { detail: '${JSON.stringify(data)}' });
    window.dispatchEvent(event);
  })();
  `;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.className = 'clarityhub-chaos-extension';
  script.innerHTML = source;
  const html = document.getElementsByTagName('html')[0];
  html.appendChild(script, html);
};
