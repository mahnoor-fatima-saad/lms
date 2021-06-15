var express = require('express');
var router = express.Router();
var Assignment = require('../models/assignment'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('This is the teacher router');
});


 /*View Assignments*/

router.get('/assignments',function(req, res, next){
    Assignment.find({}).sort('title').exec(function(error,results){
        if(error){
            return next(error); 
        }
        console.log("viewing assignment"); 
        res.json(results); 
    }); 
}); 

/* Add Assignment */

router.post('/addAssignment',function(req, res, next){
    Assignment.create(req.body).then(
        (assignment)=>{
            console.log("Assignment has been added");
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json'); 
            res.json(assignment); 
        },(err)=>next(err))
        .catch((err)=>next(err)); 
}); 


module.exports = router;

