import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, role, password } = req.body;

        if (!fullname || !email || !phoneNumber || !role  || !password) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            })
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: 'User already exists with the required email id ',
                success: false
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashPassword,
            role
        })

        res.status(201).json({
            message: 'User registered successfully',
            success: true
        });

    } catch (error) {

        res.status(500).json({
            message: 'Server error',
            success: false,
            error: error.message
        });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !role || !password) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            })
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Incorrect email or password',
                success: false
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Password is incorrect",
                success: false
            })
        };

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the current role",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }

        user = {
            _id: user._id,
            fullName: user.fullname,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error while logging in',
            success: false,
            error: error.message
        });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error while logging out',
            success: false,
            error: error.message
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, skills, bio } = req.body;
        const file = req.file;

        if (!fullname || !email || !phoneNumber || !skills || !bio) {
            return res.status(400).json({
                message: 'Something is missing while updating profile',
                success: false
            })
        }

        const skillsArray = skills.split(',');

        const userId = req.id;

        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            })
        }

        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.skills = skillsArray;
        user.bio = bio;



        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullname,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: 'Profile updated successfully',
            user,
            success: true
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server error while updating profile',
            success: false,
            error: error.message
        });
    }
}