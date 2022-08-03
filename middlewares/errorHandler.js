const {
  DEFAUTL_CODE,
  DEFAUTL_MSG,
} = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = DEFAUTL_CODE, message = DEFAUTL_MSG } = err;
  res.status(statusCode).send({ message });
  next();
};
