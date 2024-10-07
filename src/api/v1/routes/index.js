import express from "express";
const router = express.Router();
import access_route from "./access.route.js"
router.use("/api/v1",access_route );

export default router