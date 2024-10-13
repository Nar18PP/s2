const express = require('express'); // นำเข้าโมดูล express
const cors = require('cors'); // นำเข้าโมดูล cors

const app = express(); // สร้าง instance ของ Express
app.use(cors()); // ใช้งาน CORS middleware
const port = process.env.PORT || 3004; // กำหนดพอร์ตให้เป็น 3000 หรือค่าจาก environment variable


app.get('/api/products', (req, res) => {
    const products = [
      { id: 1, name: 'ຜັດໄກ່', heart: 957, price: 67, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzb0IFD9i42VcxKBRLdtzQsQHEKrXWJuqBEw&s" },
      { id: 2, name: 'ເບີເກີ່', heart: 1520, price: 38, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBZL-_s71i1m6RLSIIfxfg0D9rR91Z8MLLbQ&s" },
      { id: 3, name: 'ຍຳທະເລ', heart: 541, price: 163, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
      { id: 4, name: 'ຍຳສະລັດ', heart: 5971, price: 29, img:"https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 5, name: 'ສະມູດຕີ່', heart: 1672, price: 54, img:"https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 6, name: 'ເຄັກຊອກໂກແລັດ', heart: 541, price: 210, img:"https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 7, name: 'ຊີ້ນໝາ', heart: 662, price: 56, img:"https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 8, name: 'ຊູຊິ', heart: 25563, price: 156, img:"https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 9, name: 'ຊີ້ນງົວ', heart: 954, price: 84, img:"https://images.pexels.com/photos/793785/pexels-photo-793785.jpeg?auto=compress&cs=tinysrgb&w=600https://images.pexels.com/photos/769290/pexels-photo-769290.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { id: 10, name: 'ໄຂ່ຕົ້ມ', heart: 2359, price: 59, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" },
      { id: 11, name: 'ພິດຊ່າ', heart: 587, price: 85, img:"https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?cs=srgb&dl=pexels-vince-2147491.jpg&fm=jpg" },
    ];
    for (let i = 12; i <= 3000; i++) {
      products.push({ id: i, name: `Product ${i}`, heart: Math.floor(Math.random() * 1000), price: Math.floor(Math.random() * 100) + 1, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s" });
    }
    res.json(products);
  });

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
