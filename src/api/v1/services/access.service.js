import { AuthFailureError, BadRequestError, ForbiddenError } from '#~/core/error.response.js';
import userModel from '#~/model/user.schema.js';
import { getPickedData } from '#~/utils/modifyObject.js';
import { createPublicPrivateKeys, createTokenPair } from '#~/utils/token.js';
import bcrypt from 'bcrypt';
import KeyTokenService from './keyToken.service.js';
class AccessService {
  /**
   * Used for generate new token pair AT and RT
   * 1. Check if the RT has used => if so , delete all tokens and throw error
   * 2. Else check if refreshtoken valid  + Generate new token pair
   */
  static handlerRefreshToken = async ({ keyStore, user, refreshToken }) => {
    const { userId, email } = user;

    if (keyStore.refreshTokenUsed.includes(refreshToken)) {
      await KeyTokenService.deleteKeyById(userId);
      throw new ForbiddenError('Something wrong happend. Pls relogin');
    }

    const { publicKey, privateKey } = keyStore;

    //create AT , RT
    const tokens = await createTokenPair({ userId, email }, publicKey, privateKey);

    //update token
    await keyStore.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokenUsed: refreshToken,
      },
    });

    return {
      user,
      tokens,
    };
  };

  static logout = async ({ keyStore }) => {
    const delKey = await KeyTokenService.deleteKeyById(keyStore._id);
    return delKey;
  };

  static login = async ({ email, password }) => {
    const foundUser = await userModel.findOne({ email }).lean();
    if (!foundUser) {
      throw new BadRequestError('User not registered');
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      throw new AuthFailureError('Authentication error');
    }

    const { privateKey, publicKey } = createPublicPrivateKeys();

    const { _id: userId } = foundUser;

    const tokens = await createTokenPair({ userId, email }, publicKey, privateKey);

    await KeyTokenService.createKeyToken({
      userId,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      shop: getPickedData({
        object: foundUser,
        fields: ['_id', 'name', 'email'],
      }),
      tokens,
    };
  };

  static signup = async ({ email, password }) => {
    const user = await userModel.findOne({ email }).lean();
    if (user) {
      throw new BadRequestError('User already registered !!!');
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      email,
      password: hashedPass,
    });
    //privateKey -> sign token  , publickey ->verify token
    const { privateKey, publicKey } = createPublicPrivateKeys();

    const tokens = await createTokenPair({ userId: newUser._id, email }, publicKey, privateKey);

    await KeyTokenService.createKeyToken({
      userId: newUser._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      user: getPickedData({
        object: newUser,
        fields: ['_id', 'name', 'email'],
      }),
      tokens,
    };
  };

  //This function is only used for testing
  static delete = async ({ email }) => {
    const user = await userModel.findOne({ email }).lean();
    if (!user) {
      throw new BadRequestError('User not found !!!');
    }
    await this.logout({ keyStore: user._id });
    await userModel.deleteOne({ email });
  };
}
export default AccessService;
