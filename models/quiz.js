
var mongoose = require('mongoose');
var schema = mongoose.Schema; 
var quizSchema = new schema({
    title : {
        type: String,
    },
    question: {
        type: String,
        required: true
    }, 
    answers:{
        type:[{
            option:{
                type: String,
                ref: 'Answers'
            }
        }]
    }
});
module.exports = mongoose.model('Quiz', quizSchema);