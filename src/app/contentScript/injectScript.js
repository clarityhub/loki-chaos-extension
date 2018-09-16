/**
 * Inject script into the page
 */
export default (url, data = {}) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.className = 'clarityhub-chaos-extension';
  script.innerHTML = JSON.stringify(data);
  const html = document.head || document.documentElement;
  html.appendChild(script, html);
};
