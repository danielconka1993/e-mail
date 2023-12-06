// helpers/session.js
const setSession = (req, userData) => {
  req.session.userData = userData;
  console.log("Setting session data:", userData) // Set dat funguje
};

const getSessionData = (req) => {
  console.log("GET session data:", req.session.userData) // Set dat funguje
  return req.session.userData || null;
};

const clearSession = (req) => {
  delete req.session.userData;
};

module.exports = { setSession, getSessionData, clearSession };