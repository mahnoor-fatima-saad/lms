var mongoose = require('mongoose');
var schema = mongoose.Schema; 
var teacherSchema = new schema({
    name: {
        type: String,
        required: true
    }, 
    designation:{
        type: String, 
        required: true,
    }
});
module.exports = mongoose.model('Teacher', teacherSchema);