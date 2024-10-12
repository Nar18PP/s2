const express = require('express'); // นำเข้าโมดูล express
const cors = require('cors'); // นำเข้าโมดูล cors

const app = express(); // สร้าง instance ของ Express
app.use(cors()); // ใช้งาน CORS middleware
const port = process.env.PORT || 3004; // กำหนดพอร์ตให้เป็น 3000 หรือค่าจาก environment variable


app.get('/api/products', (req, res) => {
    const products = [
      { id: 1, name: 'ຜັດໄກ່', heart: 957, price: 120, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzb0IFD9i42VcxKBRLdtzQsQHEKrXWJuqBEw&s" },
      { id: 2, name: 'ເບີເກີ່', heart: 1520, price: 150, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBZL-_s71i1m6RLSIIfxfg0D9rR91Z8MLLbQ&s" },
      { id: 3, name: 'ຍຳທະເລ', heart: 541, price: 200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
      { id: 4, name: 'ຍຳສະລັດ', heart: 541, price: 200, img:"https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 5, name: 'Product 3', heart: 541, price: 200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
      { id: 6, name: 'Product 3', heart: 541, price: 200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
      { id: 7, name: 'Product 3', heart: 541, price: 200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
      { id: 8, name: 'Product 3', heart: 541, price: 200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
      { id: 9, name: 'Product 3', heart: 541, price: 200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
      { id: 10, name: 'Product 3', heart: 541, price: 200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
      { id: 11, name: 'Product 3', heart: 541, price: 200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
      { id: 12, name: 'Product 3', heart: 541, price: 200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
      { id: 13, name: 'Product 3', heart: 541, price: 200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
      { id: 14, name: 'Product 3', heart: 541, price: 200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
      { id: 15, name: 'Product 3', heart: 541, price: 200, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
    ];
    res.json(products);
  });

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
