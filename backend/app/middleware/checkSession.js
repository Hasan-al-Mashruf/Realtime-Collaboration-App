const checkSession = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res
      .status(401)
      .json({ context: "Session expired or not found. Please log in." });
  }
};
export default checkSession;
