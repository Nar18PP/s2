import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import io from "socket.io-client";
import Cookies from "js-cookie";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import "../style/sign.css";



function Signup() {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState("Send");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const onChange1 = (event) => {
    setEmail(event.target.value);
    
  };
  const onChange2 = (event) => {
    setOtp(event.target.value);
  };
  const onChange3 = (event) => {
    setFirstName(event.target.value);
  };
  const onChange4 = (event) => {
    setLastName(event.target.value);
  };

  const onSend = () => {
    socket.current.emit('SendOtp', email)
  };
  const onNext = () => {
    socket.current.emit('CheckOtp', email, otp)
  };


  const socket = useRef(null)
  useEffect(() => {
    socket.current = io("http://localhost:3000");

    socket.current.on("connect", () => {
      const socketId = Cookies.get("SocketId");
      if (!socketId) {
        let randomSocketId =
          Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 10000000;
        Cookies.set("SocketId", randomSocketId, { expires: 1 / 2 });
        socket.current.emit('sendSocketId', randomSocketId); // ส่ง randomSocketId ไปยังเซิร์ฟเวอร์
        console.log(randomSocketId); // แสดงค่า randomSocketId ในคอนโซล
      } else {
        console.log(socketId); // แสดงค่า socketId ที่มีอยู่ในคุกกี้
        socket.current.emit('sendSocketId', socketId); // ส่ง randomSocketId ไปยังเซิร์ฟเวอร์
      }

      socket.current.on('countSend',(countSend)=>{
        setCount(countSend);
      })
    });

    document.body.style.backgroundColor = "var(--background-color)";
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    let interval1;
    // แปลง count เป็น number
    if(interval1){
      return;
    }
    const numericCount = Number(count);
    // เริ่มนับถอยหลังถ้าค่า count เป็นตัวเลขและมากกว่า 0
    if (numericCount > 0) {
       interval1 = setInterval(() => {
        setCount((prev) => {
          const prevNum = Number(prev); // แปลง prev เป็น number ก่อนลดค่า
          return prevNum > 0 ? prevNum - 1 : "Send"; // ลดค่าทุกวินาที
        });
      }, 1000);
  
      return () => clearInterval(interval1); // ทำความสะอาด interval เมื่อ component ถูก unmount
    } else {
      setCount("Send");
      clearInterval(interval1)
    }
  }, [count]); // มีการอัปเดตทุกครั้งที่ count เปลี่ยนแปลง

  return (
    <>
      {/* <Alert
        style={
          alert1 != "" && statusAlert1 == "Success" ? {} : { display: "none" }
        }
        severity="success"
      >
        {alert1}
      </Alert>
      <Alert
        style={
          alert1 != "" && statusAlert1 == "Error" ? {} : { display: "none" }
        }
        severity="error"
      >
        {alert1}
      </Alert> */}
      <div className="sign">
        <div className="container1">
          <div className="krp1">
            <div className="t-top">Sign Up</div>
            <div className="input" style={step == 0 ? {} : { display: "none" }}>
              <FormControl sx={{ m: 0, width: "100%" }} variant="standard">
                <InputLabel sx={{ fontSize: "1rem" }} htmlFor="email">
                  Email
                </InputLabel>
                <Input
                  sx={{ paddingRight: "58px" }}
                  autoComplete="email"
                  id="email"
                  type="text"
                  value={email}
                  onChange={onChange1}
                  endAdornment={
                    <InputAdornment position="end"></InputAdornment>
                  }
                />
                <div className="btn">
                  <button onClick={onSend}>{count}</button>
                </div>
              </FormControl>
              <FormControl sx={{ m: 0, width: "100%" }} variant="standard">
                <InputLabel sx={{ fontSize: "1rem" }} htmlFor="otp">
                  OTP
                </InputLabel>
                <Input
                  autoComplete="text"
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={onChange2}
                  endAdornment={
                    <InputAdornment position="end"></InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="input" style={step == 1 ? {} : { display: "none" }}>
              <FormControl sx={{ m: 0, width: "100%" }} variant="standard">
                <InputLabel sx={{ fontSize: "1rem" }} htmlFor="firstName">
                  FirstName:
                </InputLabel>
                <Input
                  sx={{ paddingRight: "58px" }}
                  autoComplete="firstName"
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={onChange3}
                  endAdornment={
                    <InputAdornment position="end"></InputAdornment>
                  }
                />
              </FormControl>
              <FormControl sx={{ m: 0, width: "100%" }} variant="standard">
                <InputLabel sx={{ fontSize: "1rem" }} htmlFor="lastName">
                  LastName:
                </InputLabel>
                <Input
                  autoComplete="lastName"
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={onChange4}
                  endAdornment={
                    <InputAdornment position="end"></InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div
              className="input"
              style={step == 2 ? {} : { display: "none" }}
            ></div>
            <div className="input" style={{ display: "none" }}></div>
            <div className="krp2">
              <div className="btn">
                <Stack
                  direction="row"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    variant="outlined"
                    sx={{ height: "36px", width: "120px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ height: "36px", width: "120px" }}
                    onClick={onNext}
                  >
                    Next
                  </Button>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
