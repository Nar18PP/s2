const express = require('express'); // นำเข้าโมดูล express
const cors = require('cors'); // นำเข้าโมดูล cors

const app = express(); // สร้าง instance ของ Express
app.use(cors()); // ใช้งาน CORS middleware
const port = process.env.PORT || 3000; // กำหนดพอร์ตให้เป็น 3000 หรือค่าจาก environment variable

// ตัวอย่างข้อมูล
const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
];

// สร้าง API GET สำหรับรับข้อมูล
app.get('/api/items', (req, res) => {
    res.json(data); // ส่งข้อมูลกลับไปในรูปแบบ JSON
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
