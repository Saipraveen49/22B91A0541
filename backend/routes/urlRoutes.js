import express from 'express';
import { createShortUrl, redirectShortUrl, getShortUrlStats } from '../controller/urlController.js';

const router = express.Router();

router.post('/shorturls', createShortUrl);
router.get('/shorturls/:code', getShortUrlStats);
router.get('/:code', redirectShortUrl);

export default router;
