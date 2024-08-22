const express = require('express');
const router = express.Router();
const { ctuser, login, refresh } = require('../controllers/authController');

// ลงทะเบียนผู้ใช้
router.post('/ctuser', ctuser);

// เข้าสู่ระบบ
router.post('/login', login);

// รีเฟรช token
router.post('/refresh', refresh);

module.exports = router;
