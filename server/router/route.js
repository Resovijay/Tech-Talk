const express = require('express');


const {signUpUser,loginUser,logoutUser,getUserDetails,updateUserInfo}  = require('../controller/userController');
const {imageUpload,localFileUpload} = require('../controller/fileUpload');
const {authenticateToken} = require('../controller/jwt-controller')
const {createPost,getAllPosts,getPost,updatePost,deletePost} = require('../controller/post-contoller')
const {newComment,getComments,deleteComment} = require('../controller/comment-controller')


const router = express.Router();

router.post('/signup',signUpUser);
router.post('/login',loginUser);
router.post('/logout', logoutUser);
router.post("/file/uploadlocal",localFileUpload);
router.post("/file/upload",imageUpload);

router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);
router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);


//USER DETAIL//
router.get('/user/:id', authenticateToken, getUserDetails);
router.post('/user/update/:id',authenticateToken,updateUserInfo);

module.exports = router;