import {addProduct,getAllProduct,getProduct} from '../Controllers/Product.Controller.js'
import verify from '../Middleware/UserAuth.middleware.js'
import { Router } from 'express'

const router = Router();

router.route('/addproduct').post(verify,addProduct)
router.route('/getproduct').post(verify,getProduct)
router.route('/getAllProduct').get(verify,getAllProduct)

export default router;