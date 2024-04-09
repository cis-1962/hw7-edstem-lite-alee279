const requireAuth = async (req, res, next) => {
  try {
    if (Object.keys(req.session).length !== 0 && req.session !== null && req.session.user !== "") {
      next();
    } else {
      throw new Error('Unauthorized');
    }
  } catch (error) {
    next(error);
  }
};

export default requireAuth