import keyTokenModel from '#~/model/keyToken.schema.js';
import { Types } from 'mongoose';
class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    const filter = { user: userId };
    const update = {
      publicKey,
      privateKey,
      refreshTokenUsed: [],
      refreshToken,
    };
    const options = { upsert: true, new: true };
    const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options);

    return tokens ? tokens.publicKey : null;
  };

  static findByUserId = async userId => {
    return await keyTokenModel.findOne({ user: new Types.ObjectId(userId) });
  };

  static deleteKeyById = async userId => {
    return await keyTokenModel.deleteOne({ user: new Types.ObjectId(userId) });
  };

  static findByRefreshTokenUsed = async refreshToken => {
    return await keyTokenModel.findOne({ refreshTokenUsed: refreshToken }).lean();
  };

  static findByRefreshToken = async refreshToken => {
    return await keyTokenModel.findOne({ refreshToken });
  };
}
export default KeyTokenService;
