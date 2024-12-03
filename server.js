import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // สามารถกำหนดแหล่งที่มาที่อนุญาตให้เข้าถึงได้
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }
});

// ตั้งค่า CORS
app.use(cors());

// ตั้งค่า Body Parser
app.use(bodyParser.json());

// Mock ฐานข้อมูล
const products = {
  "8851552201016": { name: "ບິກເຟິດ ສີຟ້າ", price: '12,000 kip' },
  "8851473000057": { name: "ທິບຟີ່", price: '18,000 kip' },
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

// WebSocket event: เมื่อเชื่อมต่อ
io.on("connection", (socket) => {
  console.log("ผู้ใช้เชื่อมต่อ");

  // เมื่อได้รับข้อมูลจากมือถือ
  socket.on("scanBarcode", (barcode) => {
    if (products[barcode]) {
      socket.emit("productData", products[barcode]);
    } else {
      socket.emit("productData", { message: "ไม่พบสินค้า" });
    }
  });

  // เมื่อผู้ใช้ตัดการเชื่อมต่อ
  socket.on("disconnect", () => {
    console.log("ผู้ใช้ตัดการเชื่อมต่อ");
  });
});

// เริ่มเซิร์ฟเวอร์
const PORT = 3005;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
