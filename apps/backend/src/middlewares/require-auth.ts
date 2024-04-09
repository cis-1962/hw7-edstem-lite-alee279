const requireAuth = async (req, res, next) => {
  try {
    if (req.session!.user !== null && req.session.user !== "") {
      next();
    } else {
      throw new Error('Unauthorized');
    }
  } catch (error) {
    next(error);
  }
};

export default requireAuth