//importing mongoose
const  mongoose  = require('mongoose')
//defining a schema
const TasksSchema = new mongoose.Schema({
    taskType: {
        type: String,
        possibleValues: ['personal', 'work', 'others'],
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

//to set this schema to database
const Tasks = mongoose.model("Tasks", TasksSchema)
//exporting it 
module.exports = Tasks;