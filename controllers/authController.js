const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ฟังก์ชันสำหรับการลงทะเบียนผู้ใช้
// ฟังก์ชันสำหรับการลงทะเบียนผู้ใช้
exports.ctuser = async (req, res) => {
    const { username, password, name, role } = req.body;
    try {
        // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).send("User already exists");

        // เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        // สร้างผู้ใช้ใหม่
        const user = new User({ username, password: hashedPassword, name, role });
        await user.save();

        res.status(201).send("User created successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
};


// ฟังก์ชันสำหรับการเข้าสู่ระบบ
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // ค้นหาผู้ใช้
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send("User not found");

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Invalid credentials");

        // สร้าง JWT tokens
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" }
        );
        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET
        );

        res.json({ accessToken, refreshToken });
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// ฟังก์ชันสำหรับการรีเฟรช token
exports.refresh = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);

    // ตรวจสอบและรีเฟรช token
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = jwt.sign(
            { userId: user.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        res.json({ accessToken });
    });
};
