var mongoose = require('mongoose');
var schema = mongoose.Schema; 
var assignmentSchema = new schema({
    title:{
        type: String,
        required:true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
    }
});
module.exports = mongoose.model('Assignment', assignmentSchema);
