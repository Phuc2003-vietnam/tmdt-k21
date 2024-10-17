import {  OK,CREATED } from "../../../core/success.response.js"
import  AccessService  from "../services/access.service.js";

class AccessController {
    handlerRefreshToken = async (req, res, next) => {
      new OK({
        message: "Get tokens success!",
        metadata: await AccessService.handlerRefreshToken({
          refreshToken: req.refreshToken,
          user: req.user,
          keyStore: req.keyStore,
        }),
      }).send(res);
    };
  
    logout = async (req, res, next) => {
      new OK({
        message: "Logout success!",
        metadata: await AccessService.logout({ keyStore: req.keyStore }),
      }).send(res);
    };
  
    login = async (req, res, next) => {
      new OK({
        message: "Login success",
        metadata: await AccessService.login(req.body),
      }).send(res);
    };
  
    signUp = async (req, res, next) => {
      new CREATED({
        message: "Registered OK",
        metadata: await AccessService.signup(req.body),
      }).send(res);
    };
    createAdmin = async (req, res, next) => {
      new CREATED({
        message: "Registered OK",
        metadata: await AccessService.createAdmin(req.body),
      }).send(res);
    };
  }
  

export default new AccessController();
