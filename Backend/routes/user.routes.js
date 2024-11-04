import express from 'express';
import { login, logout, register, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';


const router = express.Router();


router.route('/register').post(singleUpload,register);
router.route('/login').post(login);
router.route('/logout').post(isAuthenticated, logout);
router.route('/updateProfile').post(isAuthenticated, updateProfile);

export default router;
