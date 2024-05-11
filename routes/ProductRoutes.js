import express from "express";
import {ProductCreation,GetAllProduct,GetSingleProduct,UpdateProduct,DeleteProduct} from '../controller/ProductController.js'
const router = express.Router();
import authenticateToken from '../middleware/authenticationMiddleware.js'

router.post('/CreateProduct',authenticateToken,ProductCreation)
router.get('/GetAllProduct',authenticateToken,GetAllProduct)
router.get('/GetSingleProduct/:id',authenticateToken,GetSingleProduct)
router.patch('/UpdateProduct/:id',authenticateToken,UpdateProduct)
router.delete('/DeleteProduct/:id',authenticateToken,DeleteProduct)
export default router;
