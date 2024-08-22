const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    course_code: { type: String, required: true },
    course_title: { type: String, required: true },
    std_group: { type: String, required: true },
    grade: { type: String, required: true },
    std_count: { type: Number, required: true },
    instructor: { type: String, required: true },
    status: { type: String, required: true, default: 'awaiting_approval' } // สถานะเริ่มต้นเป็น 'awaiting_approval'
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
