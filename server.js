import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import mysql from "mysql2";

// Middleware เพื่อให้ Express รู้จัก JSONd
const app = express();
app.use(cors());
app.use(express.json());
app.get("/set-cookie", (req, res) => {
  // สร้างคุกกี้ 'name' มีค่า 'value' และหมดอายุใน 1 วัน
  res.cookie("name", "value", { maxAge: 24 * 60 * 60 * 1000 }); // 1 วัน (มิลลิวินาที)
  res.send("คุกกี้ถูกสร้างแล้ว");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // อนุญาตเฉพาะต้นทางนี้
    methods: ["GET", "POST"],
    credentials: true,
  },
});

dotenv.config();

// ตั้งค่าการเชื่อมต่อ MySQL
const conn = mysql.createConnection({
  host: process.env.LOCALHOSTDB,
  user: process.env.USERDB,
  password: process.env.PASSDB,
  database: process.env.NAMEDB,
});

// เชื่อมต่อกับฐานข้อมูล
conn.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL");
});

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

let interval1 = {};
let countuser = {};
let person = {};

// กำหนดค่า transporter สำหรับ nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // หรือใช้ 'smtp.gmail.com' หากไม่ระบุ service
  auth: {
    user: process.env.EMAIL_USER, // ที่อยู่อีเมลของคุณ
    pass: process.env.EMAIL_PASS, // รหัสผ่านหรือ App password ของคุณ
  },
});
// ฟังก์ชันส่งอีเมล
const sendEmail = async (email, newSocketId) => {
  const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  const mailOptions = {
    from: `Foraling <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "ยืนยัน OTP ของคุณ",
    text: `รหัส OTP ของคุณคือ: ${otp}`,
  };
  try {
    insertmail(email, otp, newSocketId);
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};

const insertmail = async (email, otp, newSocketId) => {
  person[newSocketId] = { email, otp };

  const sql = "INSERT INTO user (user_email, user_otp) VALUES (?, ?)";

  try {
    await new Promise((resolve, reject) => {
      conn.query(
        sql,
        [person[newSocketId].email, person[newSocketId].otp],
        (err, result) => {
          if (err) {
            return reject(err); // ส่งกลับ error
          }
          resolve(result); // ส่งกลับผลลัพธ์
        }
      );
    });

    console.log("Email and OTP inserted successfully");
  } catch (error) {
    console.error("Error inserting email and OTP:", error);
  }
};

const deletemail = async (email) => {
  const sql = "delete from user where user_email = ?";
  await new Promise((resolve, reject) => {
    conn.query(sql, [email], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const countSend = (socket, newSocketId, email) => {
  if (interval1[newSocketId]) {
    return;
  }
  if (!interval1[newSocketId]) {
    countuser[newSocketId] = countuser[newSocketId] || 10;
  }

  interval1[newSocketId] = setInterval(() => {
    countuser[newSocketId] -= 1;
    console.log(countuser);
    socket.emit("countSend", countuser[newSocketId]);
    if (countuser[newSocketId] <= 0) {
      socket.emit("countSend", "Send");
      delete person[newSocketId];
      deletemail(email);
      if (interval1[newSocketId]) {
        clearInterval(interval1[newSocketId]);
        interval1[newSocketId] = null;
      }
      delete interval1[newSocketId]; // ลบ entry จาก interval
      delete countuser[newSocketId]; // ลบ entry จาก countuser
    }
  }, 1000);
};

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "ຜັດໄກ່23",
      heart: 957,
      price: 67,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzb0IFD9i42VcxKBRLdtzQsQHEKrXWJuqBEw&s",
    },
    {
      id: 2,
      name: "ເບີເກີ່",
      heart: 1520,
      price: 38,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBZL-_s71i1m6RLSIIfxfg0D9rR91Z8MLLbQ&s",
    },
    {
      id: 3,
      name: "ຍຳທະເລ",
      heart: 541,
      price: 163,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s",
    },
    {
      id: 4,
      name: "ຍຳສະລັດ",
      heart: 5971,
      price: 29,
      img: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      name: "ສະມູດຕີ່",
      heart: 1672,
      price: 54,
      img: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 6,
      name: "ເຄັກຊອກໂກແລັດ",
      heart: 541,
      price: 210,
      img: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 7,
      name: "ຊີ້ນໝາ",
      heart: 662,
      price: 56,
      img: "https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 8,
      name: "ຊູຊິ",
      heart: 25563,
      price: 156,
      img: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 9,
      name: "ຊີ້ນງົວ",
      heart: 954,
      price: 84,
      img: "https://images.pexels.com/photos/793785/pexels-photo-793785.jpeg?auto=compress&cs=tinysrgb&w=600https://images.pexels.com/photos/769290/pexels-photo-769290.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 10,
      name: "ໄຂ່ຕົ້ມ",
      heart: 2359,
      price: 59,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZ8Hv38DtbZs2gqhTLkKT-MgbmHTHpdHVw&s",
    },
    {
      id: 11,
      name: "ພິດຊ່າ",
      heart: 587,
      price: 85,
      img: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?cs=srgb&dl=pexels-vince-2147491.jpg&fm=jpg",
    },
  ];
  res.json(products);
});

io.on("connection", (socket) => {
  socket.on("sendSocketId", (newSocketId) => {
    console.log("User On Connection", newSocketId);
    // ส่งค่าตัวนับเวลาที่เหลือไปยังผู้ใช้
    if (countuser[newSocketId]) {
      socket.emit("countSend", countuser[newSocketId]);
    }

    socket.on("SendOtp", (email) => {
      if (!validateEmail(email)) {
        return;
      }

      const sql = `SELECT user_email from user where user_email = ?`;
      conn.query(sql, [email], (err, result) => {
        if (result.length > 0) {
          console.log("have");
          return;
        } else {
          sendEmail(email, newSocketId);
          countSend(socket, newSocketId, email);
          return;
        }
      });
    });
    socket.on("CheckOtp", (email, otp) => {
      console.log(person);
    });
  });
  socket.on("disconnect", () => {
    console.log("User disconected", socket.id); // แสดงข้อความเมื่อผู้ใช้ตัดการเชื่อมต่อ
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
