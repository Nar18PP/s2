import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Mock ฐานข้อมูล
const products = {
  "123456789012": { name: "นมวัวแดง 1 ลิตร", price: 40 },
  "8851473000057": { name: "นมวัวแดง 500 มล.", price: 20 },
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
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
