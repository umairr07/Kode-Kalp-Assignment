import userModel from "../model/user.model.js"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import { generateToken } from "../utils/token.js"

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Checking if the user already exists
    let user = await userModel.findOne({ email });
    if (user) {
        return res.status(409).json({
            success: false,
            message: "User already exists with that email."
        });
    }

    const salt = 10
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await userModel.create({ username, email, password: hashedPassword });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // use TLS
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
        }
    });

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Confirm Your Email Address",
        text: `
          Hello ${username},
      
          Thank you for signing up!
      
          Please confirm your email address by clicking the link below:
          http://localhost:5173/login
      
          If you did not request this, please ignore this email.
      
          Regards,
          Umer Shaikh
        `,
        html: `
          <div style="font-family: Arial, sans-serif; text-align: center;">
            <h2 style="color: #333;">Hello, ${username}!</h2>
            <p style="font-size: 16px; color: #555;">
              Thank you for signing up for our service. To complete your registration, please confirm your email address by clicking the button below:
            </p>
            <a 
              href="https://kode-kalp-assignment.onrender.com/api/v1/user/login" 
              style="display: inline-block; margin: 20px 0; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; font-size: 16px; border-radius: 5px;"
              target="_self"
            >
              Confirm Email
            </a>
            <p style="font-size: 14px; color: #999;">
              If you didn't sign up for this account, you can safely ignore this email.
            </p>
            <p style="font-size: 14px; color: #999;">
              Regards,<br/>Umer Shaikh
            </p>
          </div>
        `
    };


    try {
        const info = await transporter.sendMail(mailOptions);

        return res.status(201).json({
            success: true,
            message: "User registered and email sent successfully",
            info
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User registered, but email could not be sent",
            error: err.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Checking if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found with this email",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }

        // Generate token and send response
        generateToken(user, "User logged in successfully", res);

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error during login",
            error: error.message,
        });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        }).json({
            message: "User logged out successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }
}