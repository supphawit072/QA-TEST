const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/auth'); // ตรวจสอบว่าเส้นทางและชื่อไฟล์ถูกต้อง
const { adgetGrades, adgetGrade, adupdateGrade } = require('../controllers/admincon'); // ตรวจสอบว่าเส้นทางและชื่อไฟล์ถูกต้อง

// เส้นทางสำหรับแอดมิน
router.get('/adgrades', authenticateToken, adgetGrades);
router.get('/adgrades/:id', authenticateToken, adgetGrade);
router.put('/adgrade/:id', authenticateToken, adupdateGrade);

module.exports = router;
