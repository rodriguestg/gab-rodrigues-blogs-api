const Joi = require('joi');

const validationLogin = (req, res, next) => {
  const userSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
  });

  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = {
  validationLogin,
};