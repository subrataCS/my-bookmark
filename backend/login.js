// testLogin.js
import fetch from "node-fetch";

const login = async () => {
  try {
    const res = await fetch("http://localhost:7000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "bro@example.com",
        password: "123456",
      }),
    });

    const data = await res.json();
    console.log("Response:", data);
  } catch (err) {
    console.error("Error:", err);
  }
};

login();
