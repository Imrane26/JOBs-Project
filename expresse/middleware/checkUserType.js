// middlewares/checkUserType.js

const checkUserType = (type) => {
  return (req, res, next) => {
    if (req.user.type_user !== type) {
      return res
        .status(403)
        .json({ error: `Accès refusé. Vous devez être un ${type}.` });
    }
    next();
  };
};

module.exports = checkUserType;
