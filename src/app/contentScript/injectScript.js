/**
 * Inject script into the page
 */
export default (url, data) => {
  /* eslint-disable-next-line no-console */
  console.log(`🤖💉 Injecting ${process.env.EXT_EXTENSION_NAME}`);

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = url;
  script.className = 'clarityhub-chaos-extension';
  script.innerHTML = JSON.stringify(data);
  const body = document.getElementsByTagName('head')[0];
  body.appendChild(script, body);
};
