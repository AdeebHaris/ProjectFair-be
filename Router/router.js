// 1) import express
const express = require('express');


// 2) router library is inside express , so import that
const router = new express.Router(); 
const userController = require('../Controller/userController')
const projectController = require('../Controller/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware');
const multer = require('multer');

// 3) different paths for resolving requests
router.post('/user/register',userController.register)
router.post('/user/login',userController.login)
router.post('/project/addproject',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)
router.get('/project/homeproject',projectController.getHomeProject);
router.get('/project/allProject',jwtMiddleware,projectController.getAllProject);
router.get('/project/userProject',jwtMiddleware,projectController.getUserProject);
router.put('/project/editproject/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)
router.delete('/project/delete/:id',jwtMiddleware,projectController.deleteUserProject)

// 4) Export router
module.exports = router 