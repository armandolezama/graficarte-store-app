import locales from './locales'

const getLocal = (labelKey) => {
  const label = locales[labelKey];
  if(!label) {
    return '~~error-locale~~'
  }
  return label
};

export default getLocal;
