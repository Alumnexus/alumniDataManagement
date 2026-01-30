import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { name, email, role, password } = req.body;

        // ✅ FIX 1: Use the Model 'User' (imported at the top) to find existing users
        const userExist = await User.findOne({ email }); 

        if (userExist) {
            return res.status(400).json({
                msg: "This user exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ FIX 2: Now you define the 'user' variable safely
        const user = new User({
            name,
            email,
            role,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign(
            {id: user._id, role: user.role},
            "mysecret",
            {expiresIn: "1d"}
        );

        res.status(200).json({
            msg: "You register sucessfully",
            token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        })
    }catch(err){
        console.log(err);
        res.status(200).json({
            msg: "Some error is happend"
        })
    }
}

export const login = async(req, res) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user){
            return res.status(200).json({msg: "Invalid email"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(200).json({
                msg: "Password are worng"
            });
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            "mysecret",
            {expiresIn: "1d"}
        )

        return res.status(400).json({
            msg: "You login successfully",
            token,
            user: {
                id: user._id,
                role: user.role,
                name: user.name
            }
        })
    }catch(err){
        console.log(err);
        res.status(200).json({
            msg: "Some error is happend"
        })
    }
}