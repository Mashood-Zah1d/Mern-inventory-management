import {logout, register, signin} from '../Controllers/User.Controller.js'
import { Router } from 'express'
import verify from '../Middleware/UserAuth.middleware.js';

const router = Router();

router.route('/register').post(register); 
router.route('/login').post(signin); 
router.route('/logout').post(verify,logout); 

export default router;