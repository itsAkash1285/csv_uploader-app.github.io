const express = require('express');
const router = express.Router();

const fileController = require('../controllers/file_controller');
//route for uploading new file
router.post('/upload',fileController.upload);  
//route for opening already uploaded file
router.get('/open',fileController.open); 
//route for deleting a particular file       
router.get('/delete',fileController.delete);    

module.exports = router;