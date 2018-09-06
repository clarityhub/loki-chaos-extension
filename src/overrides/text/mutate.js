import pseudoLocalize from 'pseudo-localization';

const addMoreWords = (text) => {
  const words = [];
  const max = Math.random() * 3;

  for (let i = 0; i < max; i++) {
    words.push('chaos');
  }

  return [text, ...words].join(' ');
};

export default (text) => {
  return pseudoLocalize.localize(addMoreWords(text));
};
