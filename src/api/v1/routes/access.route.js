import express from "express";
import asyncHandler from "../../../utils/asyncHandler.js"
import accessController from "../controllers/access.controller.js"
const router = express.Router();

router.post("/shop/login", asyncHandler(accessController.login));
router.post("/shop/signup", asyncHandler(accessController.signUp));

router.post("/shop/logout", asyncHandler(accessController.logout));
router.post("/shop/handlerRefreshToken", asyncHandler(accessController.handlerRefreshToken));

router.post("/admin/signup", asyncHandler(accessController.createAdmin));
export default router