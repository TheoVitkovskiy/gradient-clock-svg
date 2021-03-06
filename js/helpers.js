const getNowMs = () => {
  const date = new Date();
  return date.getTime();
}

const minutesToMs = (minutes) => {
  return minutes * 60 * 1000;
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const setDocProperty = (key, value) => {
  document.documentElement.style.setProperty(key, value);
}

const setVariableInSec = (key, value) => {
  setDocProperty(key, value + 's');
}

const vibrateInMs = (ms) => {
  window.navigator.vibrate(ms);
}

const vibrateInPattern = (pattern) => {
  window.navigator.vibrate(pattern);
}

const saveValue = (key, value) => {
    return localStorage.setItem(key, value);
}

const getQueryParamValue = (qParam) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(qParam);
}

const isMobile = () => {
  const mql = window.matchMedia("only screen and (max-width: 450px)");
  return mql.matches;
}

export {
  getNowMs,
  capitalize,
  setDocProperty,
  setVariableInSec,
  minutesToMs,
  vibrateInMs,
  vibrateInPattern,
  saveValue,
  getQueryParamValue,
  isMobile
}