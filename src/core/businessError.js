// src/core/businessError.js
export const businessError = (message, details = null) => {
  const err = new Error(message);
  err.type = "BUSINESS";
  err.details = details;
  return err;
};
