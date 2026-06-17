import React from "react";
import { useState } from "react";

const handleButtonClick = () => {
  console.log("Button clicked");
};

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage("✅ Login Successful");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setMessage("Server Error");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col gap-2 w-80">
        <label htmlFor="Username">User Name</label>
        <input
          id="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-200 cursor-pointer"
          onClick={handleLogin}
        >
          Submit
        </button>
        <p className="text-center mt-2">{message}</p>
      </div>
    </div>
  );
}

export default App;
