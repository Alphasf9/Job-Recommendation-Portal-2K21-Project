import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";


export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, position, companyId, experience } = req.body;


        const userId = req.id;
        const user = await User.findById(userId).exec();

        console.log(user);

        const { role } = user.toObject();


        if (!role) {
            return res.status(404).json({
                message: "Invalid role detected",
                success: false
            })
        };



        if (role != 'recruiter') {
            return res.status(404).json({
                message: `Unauthorized access : ${role}`,
                success: false
            })
        };


        if (!title || !description || !requirements || !salary || !companyId || !experience || !jobType || !position || !location) {
            return res.status(404).json({
                message: "Something is missing while posting job",
                success: false
            });
        }




        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(" "),
            salary: Number(salary),
            location,
            jobType,
            experience: experience,
            position,
            company: companyId,
            createdBy: userId
        });

        if (!job) {
            return res.status(404).json({
                message: "Unable to create job",
                success: false
            })
        };





        return res.status(200).json({
            message: "Job created successfully",
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: "Server error while posting job",
            success: false,
            error: error.message
        });
    }
}


export const getAllJobs = async (req, res) => {
    try {


        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 })
            .populate({
                path: "createdBy"
            }).sort({ createdAt: -1 });


        if (!jobs) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }


        return res.status(200).json({
            message: "Job founded successfully",
            success: true,
            jobs
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error while posting job",
            success: false,
            error: error.message
        });
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found by a given id",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job by id fetched successfully",
            success: true,
            job
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error while getting job by id",
            success: false,
            error: error.message
        });
    }
}

export const getJobByAdmin = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({ createdBy: adminId }).populate({
            path: 'company',
        }).sort({
            createdAt: -1
        })



        if (!jobs || jobs.length == 0) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "All jobs by admin fetched successfully",
            jobs,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error while getting admin job",
            success: false,
            error: error.message
        });
    }
}



