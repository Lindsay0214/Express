// 建立 schema
// 用 JSON 告訴 document 資料會包含哪些型態
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 200 },
    author: { type: String, minlength: 3, maxlength: 30 },
    uid: String,
    isComplete: Boolean,
    date: { type: Date, default: new Date() }
})

const Todo = mongoose.model('Todo',todoSchema)

exports.Todo = Todo