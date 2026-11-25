import { Router } from 'express';
import { getExperts, getExpertBySlug } from '../controllers/expertController.js';

const router = Router();

router.get('/', getExperts);
router.get('/:slug', getExpertBySlug);

export default router;
