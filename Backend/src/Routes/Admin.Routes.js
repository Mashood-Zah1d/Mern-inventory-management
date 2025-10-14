import {register, signin} from '../Controllers/User.Controller.js'
import { Router } from 'express'

const router = Router();

router.route('/register').post(register); 
router.route('/login').post(signin); 

export default router;