const Grade = require('../models/grade');

// GET: ดึงข้อมูลทั้งหมด
exports.getGrades = async (req, res) => {
    try {
        const grades = await Grade.find();
        res.json(grades);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getGrade = async (req, res) => {
    try {
        const {id}=req.params;
        const grade =await Grade.findById(id);
        if(!grade)return res.status(400).json({message:'Grade not found'});
        res.json(grade);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
// POST: บันทึกข้อมูลใหม่
exports.createGrade = async (req, res) => {
    const { course_code, course_title, std_group, grade, std_count, instructor } = req.body;
    try {
        const newGrade = new Grade({ course_code, course_title, std_group, grade, std_count, instructor });
        await newGrade.save();
        res.json(newGrade);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// PUT: อัปเดตข้อมูล
exports.updateGrade = async (req, res) => {
    try {
        const { id } = req.params;
        const grade = await Grade.findById(id);

        if (!grade) return res.status(404).json({ message: 'Grade not found' });

        // กำหนดข้อมูลที่จะอัปเดต
        const updateData = { ...req.body };

        // ลบฟิลด์ status ออกจากข้อมูลที่ต้องการอัปเดต
        delete updateData.status;

        // อัปเดตข้อมูล
        await Grade.findByIdAndUpdate(id, { $set: updateData });

        res.status(200).json({ message: 'Updated successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// DELETE: ลบข้อมูล
exports.deleteGrade = async (req, res) => {
    try {
        const { id } = req.params;
        const grade = await Grade.findById(id);
        if (!grade) return res.status(404).json({ message: 'Grade not found' });
        await Grade.findByIdAndDelete(id);
        res.status(201).send('Deleted');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

