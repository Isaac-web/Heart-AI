import { Router } from 'express';
import { makePrediction } from '../controllers/prediction.controllers';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, makePrediction);

export default router;
