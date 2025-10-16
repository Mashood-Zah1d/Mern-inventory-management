import {addProduct} from '../Controllers/Product.Controller.js'
import { Router } from 'express'

const router = Router();

router.route('/addproduct').post(addProduct)

export default router;