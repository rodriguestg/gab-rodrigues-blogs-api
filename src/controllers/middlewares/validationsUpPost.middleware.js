const Joi = require('joi');

const validationsUpPost = (req, res, next) => {
  const postSchema = Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().min(1).required(),
  });

  const { error } = postSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = {
  validationsUpPost,
};