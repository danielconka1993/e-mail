// helpers/session.js
const setSession = (req, userData) => {
  req.session.userData = userData;
};

const getSessionData = (req) => {
  return req.session.userData || null;
};

const clearSession = (req) => {
  delete req.session.userData;
};

module.exports = { setSession, getSessionData, clearSession };