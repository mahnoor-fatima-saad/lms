var mongoose = require('mongoose');
var schema = mongoose.Schema; 
var studentSchema = new schema({
    name: {
        type: String,
        required: true
    }, 
    rollno:{
        type: String, 
        required: true,
    }
});
module.exports = mongoose.model('Student', studentSchema);