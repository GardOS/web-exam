const crypto = require("crypto");

const tokens = new Map();

const createToken = username => {
  const token = crypto.randomBytes(10).toString("hex");
  tokens.set(token, username);
  return token;
};

const consumeToken = token => {
  const username = tokens.get(token);
  tokens.delete(token);
  return username;
};

module.exports = { createToken, consumeToken };
