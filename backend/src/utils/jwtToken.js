const jwt = require('jsonwebtoken');
const config = require('config');
const { v4: uuid } = require('uuid');
const knex = require('../libs/knex');


const generateAccessToken = (userId) => {
  const payload = {
    userId,
    type: config.jwt.tokens.access.type,
  };
  const options = { expiresIn: config.jwt.tokens.access.expiresIn };
  return jwt.sign(payload, config.jwt.secret, options);
};

const generateRefreshToken = (userId) => {
  const tokenId = uuid();
  const payload = {
    type: config.jwt.tokens.refresh.type,
    tokenId,
    userId,
  };
  const options = { expiresIn: config.jwt.tokens.refresh.expiresIn };
  return {
    refreshToken: jwt.sign(payload, config.jwt.secret, options),
    tokenId,
  };
};

const createAndUpdateTokens = async (userId) => {
  try {
    const accessToken = generateAccessToken(userId);
    const { tokenId, refreshToken } = generateRefreshToken(userId);
    const [tokenFromDb] = await knex('token')
      .where({ userId })
      .select('tokenId');
    if (tokenFromDb) {
      await knex('token')
        .where({ userId })
        .update({
          tokenId,
          updatedAt: ((new Date()).toJSON()).replace('T', ' ').replace('Z', ''),
        });
    } else {
      await knex('token')
        .insert({
          tokenId,
          userId,
        });
    }
    return {
      refreshToken,
      accessToken,
    };
  } catch (e) {
    throw Error(e.message);
  }
};

module.exports = {
  createAndUpdateTokens,
};
