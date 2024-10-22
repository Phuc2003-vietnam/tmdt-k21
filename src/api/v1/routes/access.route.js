import express from "express";
import asyncHandler from "../../../utils/asyncHandler.js"
import accessController from "../controllers/access.controller.js"
import authentication from "#~/middleware/auth.js"
const router = express.Router();

router.post("/user/login", asyncHandler(accessController.login));
router.post("/user/signup", asyncHandler(accessController.signUp));

router.use(authentication);

router.post("/user/logout", asyncHandler(accessController.logout));
router.post("/user/handlerRefreshToken", asyncHandler(accessController.handlerRefreshToken));

export default router