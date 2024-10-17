
//import here
import Admin from "#~/model/admin.schema.js";
import bcrypt from "bcrypt";
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
      throw new ForbiddenError("Something wrong happend. Pls relogin");
    }

    const { publicKey, privateKey } = keyStore;

    //create AT , RT
    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    );

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
    console.log(delKey);
    return delKey;
  };

  static login = async ({ email, password, refreshToken = null }) => {
    const foundShop = await shopModel.findOne({ email }).lean();
    if (!foundShop) {
      throw new BadRequestError("Shop not registered");
    }

    const isMatch = await bcrypt.compare(password, foundShop.password);
    if (!isMatch) {
      throw new AuthFailureError("Authentication error");
    }

    const { privateKey, publicKey } = createPublicPrivateKeys();

    const { _id: userId } = foundShop;

    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      userId,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      shop: getPickedData({
        object: foundShop,
        fields: ["_id", "name", "email"],
      }),
      tokens,
    };
  };

  static signup = async ({ name, email, password }) => {
    const shop = await shopModel.findOne({ email }).lean();
    if (shop) {
      throw new BadRequestError("Shop already registered !!!");
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: hashedPass,
      roles: [RoleShop.SHOP],
    });
    //privateKey -> sign token  , publickey ->verify token
    if (newShop) {
      const { privateKey, publicKey } = createPublicPrivateKeys();

      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      );

      await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
        refreshToken: tokens.refreshToken,
      });

      return {
        shop: getPickedData({
          object: newShop,
          fields: ["_id", "name", "email"],
        }),
        tokens,
      };
    }
  };
  static createAdmin = async ({ name, email, password }) => {
    const admin = await Admin.findOne({ email }).lean();
    if (admin) {
      throw new BadRequestError("Admin already registered !!!");
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPass,
    });
    return newAdmin;
  };
  static adminLogin = async ({ email, password }) => {
    const admin = await Admin.findOne({ email }).lean();
    if (!admin) {
      throw new BadRequestError("Admin not registered !!!");
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new AuthFailureError("Authentication error");
    }
    return admin;
  };
}
export default AccessService;
