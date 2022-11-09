const errorMap = {
  STATUS_NO_TOKEN: 401,
  STATUS_DATA_INVALID: 400,
  STATUS_OK_CREATE: 201,
  STATUS_OK: 200,
  EMAIL_DUPLICATED: 409,
  BAD: 500,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
