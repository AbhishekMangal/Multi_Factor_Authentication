
const { genSalt, hash }  = require("bcrypt");
const bcrypt  = require("bcrypt");
const user = require("../model/userModel");
const  jwt  = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const otpgenerator = require('otp-generator');
require('dotenv').config()
var otps;
module.exports.Register = async(req, res)=>
{
   
    const {username, email , password, videoPassword} = req.body;
    

    if(!username || !email)
    {
        return res.json({msz: "please enter all the details", success:false})
    }
    const usernameCheck = await user.findOne({username });
    const emailCheck = await user.findOne({email});
    let success = false;
    if(usernameCheck || emailCheck)
    {
        return res.json({msz: "User Already Exist", success: false});
    }
 
    // if(otps == null)
    // {
    //     return res.json({success: false, msz:"Please generate otp first"});
    // }
    // if(Otp != otps)
    // {
    //     otps = null;
    //    console.log(Otp);
    //     return res.json({success: false, msz:"Otp validation Failed try again"})
    // }

    try {
        const salt = await genSalt(10);
        const hashPassword = await hash(password,salt);
        // const hashvideoPassword = await hash(videoPassword, salt);
        const User = await user.create({
           email: email,
           username:  username,
           password: hashPassword,
        //    videoPassword: hashvideoPassword,

        })
        delete User.password
        // delete User.hashvideoPassword
        const data = {
            user: {
                id: User.id,
            },

            
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET)

        return res.json({success: true,User, authToken })
        
    } catch (error) {
        console.error(error.message)
        return res.json({msz: "Internal server error", success: false , error:error})
        
    }
 

}
module.exports.login = async(req, res)=>
{
    const {email, password} = req.body;
    const User = await user.findOne({email});
  
    

    if(!User )
    {
        return res.json({success: false, msz: "Invalid Email Address or Password"})
    }
    const ispassword = bcrypt.compare(password, User.password)
    // const isvideoPassword = bcrypt.compare(videoPassword, User.videoPassword)
    if(!ispassword )
    {
        return res.json({success: false, msz: "Invalid Email Address or Password"})
    }
    const data = {
         user: {
            id:  User.id
        }
    }
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    return res.json({success: true, authToken })
}

module.exports.getUserRoute =  async(req ,res)=>{
  
    try{        
        const userId = req.user.id;
   
        const User = await user.findById(userId).select('-password');
        res.json({success: true ,User});
    }catch(error)
    {
        res.status(500).json({msz: "Internal Server Error", success: false})
        console.error(error.message);
    }
}


module.exports.OtpSender =async(req, res)=>
    {
        const {email} = req.body;
        
        
    otps = otpgenerator.generate(6, {digits: true, upperCaseAlphabets:false, lowerCaseAlphabets: false, specialChars: false});
    
    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "abhishekmangal12345@gmail.com",
        pass: "xbzh jkmq csnn uxsv",
      },
    });
    
    try{
      const info = await transporter.sendMail({
        from: '"AUthentication: " <abhishemangal12345@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello Enter this otp for reset Your Password into snappy", // Subject line
        text: otps, // plain text body
        html: `<b>${otps}</b>`, // html body
      });
      
      res.json({success: true ,otp:otps})
    }catch(error)
    {
        res.json({success: false, msz:"Internal Server Error"});
        console.error(error);
    }
    }

    
    module.exports.Otpverify = async(req,res)=>
    {
        const {otp} = req.body;
         if(otps == null)
        {
        return res.json({success: false, msz:"Please generate otp first"});
        }
        if(otp != otps)
        {
            otps = null;
            console.log(otp);
            return res.json({success: false, msz:"Otp validation Failed try again", otps: otps})
        }
        return res.json({success: true, msz: "Otp verified"})
    } 

    module.exports.editUserDetails = async (req, res) => {
        const { username, email, password } = req.body;
        const userId = req.user.id; // Assuming you have middleware that sets req.user
    
        try {
            // Find the user by ID
            const User = await user.findById(userId);
            if (!User) {
                return res.json({ success: false, msz: "User not found" });
            }
            const updatedUser = {};
            if(username){updatedUser.username = updatedUser};
            
            await user.findByIdAndUpdate(req.user.id)
    
            return res.json({msz: "Update Information successfully",  success: true, User: updatedUser });
        } catch (error) {
            console.error(error.message);
            return res.json({ msz: "Internal server error", success: false, error: error });
        }
    };

    