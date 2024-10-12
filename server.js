const express = require('express'); // นำเข้าโมดูล express
const cors = require('cors'); // นำเข้าโมดูล cors

const app = express(); // สร้าง instance ของ Express
app.use(cors()); // ใช้งาน CORS middleware
const port = process.env.PORT || 3004; // กำหนดพอร์ตให้เป็น 3000 หรือค่าจาก environment variable


app.get('/api/products', (req, res) => {
    const products = [
      { id: 1, name: 'k', heart: 957, price: 120, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzb0IFD9i42VcxKBRLdtzQsQHEKrXWJuqBEw&s" },
      { id: 2, name: 'Product 2', heart: 1520, price: 150, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBZL-_s71i1m6RLSIIfxfg0D9rR91Z8MLLbQ&s" },
      { id: 3, name: 'Product 3', heart: 541, price: 200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
    ];
    res.json(products);
  });

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
