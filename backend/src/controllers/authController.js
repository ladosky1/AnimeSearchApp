import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export async function registerUser(req, res){
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password){
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({ message: "User Already Exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User Created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Registration Failed"});
    }
}

export async function loginUser(req, res){
    try {
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(400).json({ message: "Username and Password required!"});
        }
        
        const user = await User.findOne({ username });

        if (!user){
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            message: "Login Sucessful",
            user: {
                id: user._id,
                username: user.username,
            }
        })
    } catch (error) {
        res.status(500).json({ error: "Login Failed"});
    }
}

export async function getCurrentUser(req, res){
    try {
        res.json({
            user: req.user
        });
    } catch (error) {
        res.status(500).json({message: "failed to get user"})
    }
};

export async function logoutUser(req, res){
    res.cookie("token", "", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "strict",
        expires: new Date(0),
    });

    res.json({ message: "Logged Out" });
}