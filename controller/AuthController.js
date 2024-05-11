import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from '../models/AuthModel.js'
import dotenv from 'dotenv'

dotenv.config();
const secretKey = process.env.secretKey;

/*Login User*/
export const LoginUser = async (req,res) =>{
    try {
        const {email,password} = req.body;

        // Check if any required field is null
        if (!email || !password) {
          return res.status(400).json({ message: "email, or password cannot be empty" });
        }

        const user = await User.findOne({ where: { email: email } });
        console.log(user);
    
        if (user == null) {
          return res.status(400).json({ message: "User not found.." });
        }
    
        const matchParrsword = await bcrypt.compare(password, user.password);//Compare the Password
        if (!matchParrsword) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({  userId: user._id}, secretKey , { expiresIn: '10h' });// Generating Token
        
        res.status(200).json({token:token ,message:"Login successfull .."});
      } catch (error) {
        console.log(error);
      }
}

/*Register User*/
export const RegisterUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log("email:",email);

      // Check if any required field is null
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, or password cannot be empty" });
      }

      const user = await User.findOne({ where: { email: email }});
      console.log(user);
      
      if (user !== null) {
        return res.status(400).json({ message: "Already Registered" });
      }
  
      const saltRounds = 10;
      // Generate a salt
      const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
              console.error("Error generating salt:", err);
              reject(err);
            }
    
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                console.error("Error hashing password:", err);
                reject(err);
              }
              resolve(hash);
            });
          });
        });
  
      const result = await User.create({
        username:username,
        email: email,
        password: hashedPassword,//Hash of Password Created
      });
  
      console.log(result);
  
      res.status(200).json({ message: "Registered Successfully" });
    } catch (error) {
      res.status(200).json({ message: "Something went wrong ! Try again" });
      console.log(error);
    }
  };