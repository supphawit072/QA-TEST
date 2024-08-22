const Grade = require('../models/grade'); // ตรวจสอบชื่อโมเดล

// ฟังก์ชันสำหรับการดึงข้อมูลเกรดทั้งหมด
exports.adgetGrades = async (req, res) => {
    try {
        const grades = await Grade.find(); // ดึงข้อมูลเกรดทั้งหมด
        res.json(grades); // ส่งกลับข้อมูลเกรดในรูปแบบ JSON
    } catch (err) {
        res.status(500).json({ message: err.message }); // ส่งกลับข้อผิดพลาด
    }
}

// ฟังก์ชันสำหรับการดึงข้อมูลเกรดตาม ID
exports.adgetGrade = async (req, res) => {
    try {
        const { id } = req.params; // ดึง ID จากพารามิเตอร์
        const grade = await Grade.findById(id); // ค้นหาเกรดตาม ID
        if (!grade) return res.status(404).json({ message: 'Grade not found' }); // ถ้าไม่พบเกรด
        res.json(grade); // ส่งกลับข้อมูลเกรดในรูปแบบ JSON
    } catch (err) {
        res.status(500).json({ message: err.message }); // ส่งกลับข้อผิดพลาด
    }
}

// ฟังก์ชันสำหรับการอัปเดตเกรด
exports.adupdateGrade = async (req, res) => {
    try {
        const { id } = req.params; // ดึง ID จากพารามิเตอร์
        const { isAdmin, ...updateData } = req.body; // ดึงข้อมูลที่ต้องการอัปเดตจาก body

        // ตรวจสอบว่าเป็นแอดมินหรือไม่
        if (!isAdmin) {
            return res.status(403).json({ message: 'Access denied. Only admins can update the grade status.' });
        }

        // ตรวจสอบว่าได้รับข้อมูลที่จะอัปเดตหรือไม่
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'No data provided to update' });
        }

        // อัปเดตข้อมูลเกรด
        const updatedGrade = await Grade.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedGrade) return res.status(404).json({ message: 'Grade not found' }); // ถ้าไม่พบเกรด

        res.status(200).json(updatedGrade); // ส่งกลับข้อมูลเกรดที่อัปเดตในรูปแบบ JSON

    } catch (err) {
        res.status(400).json({ message: err.message }); // ส่งกลับข้อผิดพลาด
    }
}
