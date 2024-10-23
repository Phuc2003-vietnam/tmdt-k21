import express from 'express';
import access_route from './access.route.js';
const router = express.Router();
router.use('/api/v1', access_route);

export default router;
