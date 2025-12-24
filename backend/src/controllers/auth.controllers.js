import express from "express";
const app = express()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userServices from '../Services/User.services.js'
import usermodel from '../models/user.model.js'
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req,res)=>{
  try{
    const {fullname, email, password ,profilepic} = req.body
    const userExists = await usermodel.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)
    const user = await userServices.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedpassword,
      profilepic

    })
  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET)
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });
  res.status(201).json({ user, token }); 

} catch (error) {
    res.status(500).send("Error signing up" + error.message)
    console.error("Error signing up:", error.message)
}
}
export const login = async (req, res) => {
  


  try {
    const { email, password } = req.body;

    // Check if email exists
    const user = await usermodel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'firstly create an account then login' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
     const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET,
       { 
        expiresIn: '7d'
      
      });

    // Optionally, send token in cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    // Send response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
export const logout = (req, res) => {


  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

export const updateprofile = async (req, res) => {
  try {
    const {profilepic} = req.body;
    const userId = req.user._id;
   
    if(!profilepic) return res.status(401).send({profilepic_err_message : "profile picture required"})
    const upload_profile = await cloudinary.uploader.upload(profilepic)
    const update_profile = await usermodel.findByIdAndUpdate(
      userId,
      { profilepic: upload_profile.secure_url },
      { new: true }
    )

  res.status(200).send(update_profile)
 } catch (err) {
   res.status(401).send({ err_updateprofile : err.message})
 }
}

export const checkauth = (req,res)=>{
 try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    res.status(200).json({ user: req.user });  // <-- wrap user inside { user: ... }
  } catch (error) {
    console.log({ "err in checkauth": error.message });
    res.status(500).json({ message: error.message });
  }
}
