import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';


const router = express.Router();


router.route('/apply/:id').get(isAuthenticated, applyJob);
router.route('/appliedjobs').get(isAuthenticated, getAppliedJobs);
router.route('/:id/applicants').get(isAuthenticated, getApplicants);
router.route('/status/:id/update').post(isAuthenticated, updateStatus);


export default router;