import express from 'express';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';


const router = express.Router();


router.route('/registerCompany').post(isAuthenticated, registerCompany);
router.route('/getCompany').get(isAuthenticated, getCompany);
router.route('/get/:id').get(isAuthenticated, getCompanyById);
router.route('/updateCompany/:id').put(isAuthenticated, updateCompany);


export default router;