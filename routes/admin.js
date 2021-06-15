var express = require('express');
var router = express.Router();
var Class = require('../models/class'); 
var Teacher = require('../models/teacher'); 
var Student = require('../models/student'); 

/* GET routes */
router.get('/', function(req, res, next) {
  res.send('This is the admin router. This is the dashboard');
});

router.get('/classes',function(req, res, next){
    Class.find({}).populate('teacher').populate('students.sid').exec(function(error,results){
        if(error){
            return next(error);
        }
        res.json(results); 
    }) 
}); 

router.get('/classes/:cid',function(req, res, next){
    Class.find({_id:req.params.cid}).populate('teacher').populate('students.sid').exec(function(error,results){
        if(error){
            return next(error); 
        }
        res.json(results); 
    }); 
}); 

router.get('/students',function(req, res, next){
    Student.find({}).sort('name').exec(function(error,results){
        if(error){
            return next(error); 
        }
        res.json(results); 
    }); 
}); 

router.get('/students/:sid',function(req, res, next){
    Student.findById(req.params.sid)
    .then((student)=>{
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(student); 
    },(err)=>next(err))
    .catch((err)=>next(err)); 
}); 

router.get('/teachers',function(req, res, next){
    Teacher.find({}).sort('name').exec(function(error,results){
        if(error){
            return next(error); 
        }
        res.json(results); 
    });  
}); 

router.get('/teachers/:tid',function(req, res, next){
    Teacher.findById(req.params.tid)
    .then((teacher)=>{
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'application/json'); 
        res.json(teacher); 
    },(err)=>next(err))
    .catch((err)=>next(err));  
}); 

/* POST Routes */

router.post('/addteacher',function(req, res, next){
    Teacher.create(req.body).then(
        (teacher)=>{
            console.log("Teacher has been added", teacher);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json'); 
            res.json(teacher); 
        },(err)=>next(err))
        .catch((err)=>next(err)); 
}); 

router.post('/addclass',function(req, res, next){
    Class.create(req.body).then(
        (result)=>{
            console.log("Class has been added", result);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json'); 
            res.json(result); 
        },(err)=>next(err))
        .catch((err)=>next(err)); 
}); 

router.post('/addstudent',function(req, res, next){
    Student.create(req.body).then(
        (student)=>{
            console.log("Student has been added", student);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json'); 
            res.json(student); 
        },(err)=>next(err))
        .catch((err)=>next(err)); 
});  

/* PUT Routes */
router.put('/class/:cid/student/:sid',function(req, res, next){
   Class.findOneAndUpdate({_id:req.params.cid},{
       "$push": {
           "students":{"sid":req.params.sid}
       }
   },{new:true, upsert:false},function(error,results){
       if(error){
           return next(error);
       }
       res.json(results);
   }
   )
});

router.put('/class/:cid/teacher/:tid',function(req, res, next){
    Class.findOneAndUpdate({_id:req.params.cid},{teacher:req.params.tid},{new:true, upsert:false},function(error,results){
        if(error){
            return next(error);
        }
        res.json(results);
    }
    )
});

router.put('/class/:cid',function(req, res, next){
    res.send('Edit a certain class'); 
});

/* DELETE Routes */

router.delete('/delclass/:cid',function(req, res, next){
    Class.deleteOne({_id:req.params.cid}),function(error, results){
        if(error){
            return next(error); 
        }
        res.json(results); 
    } 
});

router.delete('/delteacher/:tid',function(req, res, next){
    Teacher.deleteOne({_id:req.params.tid}),function(error, results){
        if(error){
            return next(error); 
        }
        res.json(results); 
    } 
});

router.delete('/delstudent/:sid',function(req, res, next){
    Student.deleteOne({_id:req.params.sid}),function(error, results){
        if(error){
            return next(error); 
        }
        res.json(results); 
    } 
});


module.exports = router;