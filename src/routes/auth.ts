import {Router} from 'express'
import {signup, login, getProfile } from '../controllers/authController'
import { TokenValidation } from '../middlewares/verifyToken'

const router: Router = Router();

router.post('/signup', signup);
router.post('/login', login)
router.get('/profile', TokenValidation, getProfile)

export default router;