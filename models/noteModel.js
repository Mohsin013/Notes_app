const mongoose = require("mongoose");
const userRouter = require("../routes/userRouter");

const noteSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    date:{type:Date, default:Date.now},
    userID:{type:String},
    username:{type:String}
},{
    versionKey:false
})

const NoteModel = mongoose.model("note", noteSchema);

module.exports = NoteModel;