const User = require("../models/userSchema");
const UserProfile = require("../models/userprofile");
const Token = require("../models/Token")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { use } = require("../router/route");
const comment = require("../models/comment");
const userprofile = require("../models/userprofile");
require('dotenv').config(); 
const signUpUser = async (req, res) => {

  let user = await User.findOne({ username: req.body.username });
  if (user) {
      console.log("Username already existed");
      return res.status(400).json({ msg: 'Username already existed' });
  }

    
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      username: req.body.username,
      name: req.body.name,
      password: hashedPassword,
    };

    // const response = await user.findOne({username});
    // console.log(response);

    const newUser = new User(user);
    await newUser.save();
    return res.status(200).json({ msg: "SignUp Successfully" });
  
  } catch (error) {
    return res.status(500).json({ msg: "SignUp Failed " });
  }
};

const loginUser = async (request, response) => {

  // user doesnot exits in the database it means that it does not login //
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
      return response.status(400).json({ msg: 'Username does not match' });
  }


   // if user exist in database then we match its password with the password store in database
  try {

  // since the password stored in database is in encrypted form so we cannot directly compare with the password that user entered //
  // so we use bcrypt function compare() to match with the user stored password   
      let match = await bcrypt.compare(request.body.password, user.password);
      
    /// if my paasword match then we have to generate accesss token so the it just logged in for some time //
    
    // and we stored that token in database because we generate accesstoken whose refresh token is remain in database //
      if (match) {
          const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
          const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
          /// here just saving the refresh token in data base ////
          const newToken = new Token({ token: refreshToken });
          await newToken.save();
          /// if we sucessfully login in then we send a status from backened //
          response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,name: user.name, username: user.username });
      
      } else {
          //password does not match then we send the response that password doesnot matched //
          response.status(400).json({ msg: 'Password does not match' })
      }
  } catch (error) {
      response.status(500).json({ msg: 'error while login the user' })
  }
}

const logoutUser = async (request, response) => {
  const token = request.body.token;
  await Token.deleteOne({ token: token });

  response.status(204).json({ msg: 'logout successfull' });
}

const getUserDetails = async(request,response)=>{

  const id  = request.params.id;
  //console.log(id);
  const Comment = await comment.findById(id);
  ///console.log(Comment);
  let username = Comment.name;
  //console.log(username);
  let user = await userprofile.findOne({ username: username });
  ///console.log(user);
  if(!user){
     response.status(400).json({msg: 'Not found User !!!'});
  }


  if(user){
    response.status(200).json(user);  
  }
  else{
    response.status(500).json({msg:'Try After Sometime !!!'}); 
  }
}

const updateUserInfo = async (request, response) => {
   console.log(request);
  try {
    const id  = request.params.id;
    //console.log(id);
    const Comment = await comment.findById(id);
    ///console.log(Comment);
    let username = Comment.name;
    //console.log(username);
    let user = await User.findOne({ username: username });
    console.log(user);

    // let { picture, githubLink, codingProfileLink} = request.body;
    let githublink = request.body.gitHub;
    let codingprofileLink = request.body.codingprofile;
    let picture = request.body.picture;

    console.log({githublink,codingprofileLink,picture});
   
    // if(!picture){
    //    return response.status(400).json({msg:'please Upload the image'});
    // }
    
    // let user = await User.findById(userId);

    //console.log(user);
    //console.log(request.body);

    // console.log(userName);
    // console.log({ picture, githubLink, codingProfileLink });

    // if (!user) {
    //   response.status(404).json({ msg: 'User not found' });
    // }

    const updateUser = {
        username: user.username,
        picture: picture,
        githubLink:githublink,
        codingProfileLink:codingprofileLink,
    };
    
    console.log(updateUser);

    const newUpdateUser = new UserProfile(updateUser);
    await newUpdateUser.save(); 
    console.log("user updated successfully");
    response.status(200).json({ msg: 'User updated successfully', user: updateUser });
  } catch (error) {
     console.error(error);
     response.status(500).json({ msg: 'Internal Server Error', error });
  }
}



module.exports = { signUpUser,loginUser,logoutUser,getUserDetails,updateUserInfo};
