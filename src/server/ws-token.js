const crypto = require("crypto");

const tokens = new Map();

const createToken = userId => {
  const token = crypto.randomBytes(10).toString("hex");
  tokens.set(token, userId);
  return token;
};

const consumeToken = token => {
  const userId = tokens.get(token);
  tokens.delete(token);
  return userId;
};

module.exports = { createToken, consumeToken };
