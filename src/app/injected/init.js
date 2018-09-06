import logging from 'logging';
import routines from 'routines';

logging.setup();

export default () => {
  const el = Array.from(document.getElementsByClassName('clarityhub-chaos-extension'));
  const raw = el[el.length - 1].innerHTML;
  try {
    const data = JSON.parse(raw);

    Object.keys(data.routines).forEach((key) => {
      const settings = data.routines[key];

      if (routines[key]) {
        routines[key](settings);
      }
    });
  } catch (error) {
    logging.report(error);
  }
};
