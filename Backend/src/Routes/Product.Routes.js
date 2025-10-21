import {addProduct,getProduct} from '../Controllers/Product.Controller.js'
import { Router } from 'express'

const router = Router();

router.route('/addproduct').post(addProduct)
router.route('/getproduct').post(getProduct)

export default router;