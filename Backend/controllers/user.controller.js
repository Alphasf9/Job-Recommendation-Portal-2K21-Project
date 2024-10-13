import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, role, profile, password } = req.body;

        if (!fullname || !email || !phoneNumber || !role || !profile || !password) {
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

        const user = await User.findOne({ email });

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

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            success: false,
            error: error.message
        });
    }
}