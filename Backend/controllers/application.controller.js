import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";


export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(404).json({
                message: "Job Id  is required",
                success: false,
            });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });


        if (existingApplication) {
            return res.status(404).json({
                message: "You have already applied for this job",
                success: false,
            });
        };

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Applied job does not exist",
                success: false,
            });
        };

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(newApplication);

        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Servor error while applying for a job",
            success: false,
            error: error.message
        });
    }
}


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });

        if (!application) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            })
        };

        return res.status(200).json({
            message: "All applications retrieved successfully",
            application,
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: "Servor error while getting all applied jobs",
            success: false,
            error: error.message
        });
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
            }
        });

        if (!job) {
            return res.status(404).json({
                message: "No job found",
                success: false
            })
        };

        return res.status(200).json({
            message: "Job found successfully",
            job,
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: "Servor error while getting all applicants",
            success: false,
            error: error.message
        });

    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(404).json({
                message: "Invalid status",
                success: false
            })
        };

        const application = await Application.findOne({ _id: applicationId });


        if (!application) {
            return res.status(404).json({
                message: "Application is required",
                success: false
            })
        };

        if (status != 'recruiter') {
            return res.status(404).json({
                message: "You cannot change the status of your application",
                success: false
            })
        };
        
        application.status = status.toLowerCase();

        await application.save();

        return res.status(200).json({
            message: "Application status updated successfully",
            success: true
        })



    } catch (error) {
        res.status(500).json({
            message: "Servor error while updating status",
            success: false,
            error: error.message
        });
    }
}