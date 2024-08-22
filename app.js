const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();  // เรียกใช้งาน dotenv.config() เพื่อโหลดตัวแปรจากไฟล์ .env

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;  // ดึงค่าจากไฟล์ .env

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const PORT = process.env.PORT || 3000;

// กำหนดเส้นทาง
const gradeRoutes = require('./routes/grade');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

// ใช้งานเส้นทาง
app.use('/api', gradeRoutes); // เส้นทางสำหรับ Grade
app.use('/api/auth', authRoutes);    // เส้นทางสำหรับ Auth
app.use('/api', adminRoutes); 


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
