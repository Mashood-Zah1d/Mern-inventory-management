import {addProduct,getProduct} from '../Controllers/Product.Controller.js'
import verify from '../Middleware/UserAuth.middleware.js'
import { Router } from 'express'

const router = Router();

router.route('/addproduct').post(verify,addProduct)
router.route('/getproduct').post(verify,getProduct)

export default router;