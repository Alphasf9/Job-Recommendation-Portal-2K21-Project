import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { getAllJobs, getJobByAdmin, getJobById, postJob } from '../controllers/job.controller.js';


const router = express.Router();


router.route('/postjob').post(isAuthenticated, postJob);
router.route('/alljob').get(isAuthenticated, getAllJobs);
router.route('/getjob/:id').get(isAuthenticated, getJobById);
router.route('/getadminjob').get(isAuthenticated, getJobByAdmin);


export default router;