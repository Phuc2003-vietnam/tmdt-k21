import crypto from 'crypto';
import JWT from 'jsonwebtoken';
const createTokenPair = async (payload, publicKey, privateKey) => {
  const accessToken = await JWT.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '2 days',
  });

  const refreshToken = await JWT.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '7 days',
  });

  return { accessToken, refreshToken };
};

const createPublicPrivateKeys = () => {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });
};

const verifyJWT = ({ token, publicKey }) => {
  return JWT.verify(token, publicKey);
};

export { createPublicPrivateKeys, createTokenPair, verifyJWT };
