import fetch from "node-fetch";

const testLogin = async () => {
  try {
    console.log("Testing login API...");

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@mail.com",
        password: "password",
      }),
    });

    const result = await response.json();

    console.log("Response Status:", response.status);
    console.log("Response Body:", result);

    if (response.ok) {
      console.log("✅ Login successful!");
      console.log("🔑 Token:", result.token);
    } else {
      console.log("❌ Login failed");
    }
  } catch (error) {
    console.error("Error testing login:", error);
  }
};

testLogin();
