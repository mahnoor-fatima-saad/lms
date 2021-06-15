var express = require('express');
var router = express.Router();
var Assignment = require('../models/assignment'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('This is the student router');
});

 /*View Assignments*/
 
 router.get('/assignments',function(req, res, next){
  Assignment.find({}).sort('title').exec(function(error,results){
      if(error){
          return next(error); 
      }
      res.json(results); 
  }); 
}); 

/*Submit Assignment*/
router.put('/submitAssignment/ans',function(req, res, next){
  Class.findOneAndUpdate({answer:req.params.ans},function(error,results){
      if(error){
          return next(error);
      }
      res.json(results);
  }
  )
});

/* view classes*/
router.get('/assignments',function(req, res, next){
  Assignment.find({}).sort('title').exec(function(error,results){
      if(error){
          return next(error); 
      }
      res.json(results); 
  }); 
}); 



module.exports = router;