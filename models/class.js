var mongoose = require('mongoose');
var schema = mongoose.Schema; 
var classSchema = new schema({
    name: {
        type: String,
        required: true
    }, 
    teacher:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Teacher'
    },
    students:{
        type:[{
            sid:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            }
        }]
    }
});
module.exports = mongoose.model('Class', classSchema);