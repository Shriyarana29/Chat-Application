import User from '../models/userModel.js';
import { generateToken } from '../library/utils.js';
import bcrypt from 'bcrypt';

// signup a new user
export const signup = async (req, res) => {
    const {fullName, email, password, bio} = req.body;
    try{
        if(!fullName || !email || !password || !bio) {
            return res.json({success: false, message: 'Details missing'});
        }
        const user =  await User.findOne({ email });

        if(user) {
            return res.json({success: false, message: 'User already exists'});
        }
        const salt = await bcrypt.genSalt(10);  
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User.create({fullName, email, password: hashedPassword, bio});

        const token = generateToken(newUser._id);
        return res.json({success: true, userData: newUser, token, message: 'Account created successfully'});
    }
    catch(error) {
        return res.json({success: false, message: error.message});
    }
}

// login a user
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await User.findOne({ email });
        
        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(userData._id);
        return res.json({ success: true, userData, token, message: 'Login successful' });

    } 
    catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// to check if user is authenticated
export const checkAuth = async (req, res) => {

    res.json({success: true, user: req.use});
}

// to update user profile
const updateProfile = async (req, res) => {
    try{
        const {profilePic, fullName, bio} = req.body;

        const userId = req.user._id;
        let updatedUser;

        if(!profilePic) {
            updatedUser =  await User.findByIdAndUpdate(userId, {fullName, bio}, {new: true});
        }
        else{
            const upload = await cloudinary.uploader.upload(profilePic)
            
            updatedUser = await User.findByIdAndUpdate(userId, 
            {profilePic: upload.secure_url, bio, fullName}, {new: true});
        }
        return res.json({success: true, user: updatedUser, message: 'Profile updated successfully'});

    }
    catch(error) {
        return res.json({success: false, message: error.message});
    }
}
