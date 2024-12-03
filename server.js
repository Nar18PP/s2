import express from "express";
import bodyParser from "body-parser";
import cors from "cors";  // นำเข้า cors

const app = express();

// ใช้งาน cors
app.use(cors());  // จะอนุญาตให้ทุกโดเมนเข้าถึงเซิร์ฟเวอร์นี้

app.use(bodyParser.json());

// Mock ฐานข้อมูล
const products = {
  "123456789012": { name: "นมวัวแดง 1 ลิตร", price: 40 },
  "987654321098": { name: "นมวัวแดง 500 มล.", price: 20 },
};

// Endpoint สำหรับตรวจสอบข้อมูลสินค้า
app.post("/check-barcode", (req, res) => {
  const { barcode } = req.body;

  if (products[barcode]) {
    res.json(products[barcode]);
  } else {
    res.status(404).json({ message: "ไม่พบสินค้า" });
  }
});

// เริ่มเซิร์ฟเวอร์
const PORT = 3005;  // ใช้พอร์ตนี้เพื่อให้ตรงกับที่เรียกจาก React
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
