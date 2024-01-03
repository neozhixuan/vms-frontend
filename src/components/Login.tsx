import React, { useState } from "react";

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    passw: "",
  });
  const { email, passw } = inputValue;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValue({
      ...inputValue,
      [id]: new Date(value),
    });
  };
  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          id="email"
          placeholder="Enter NTU email"
          type="text"
          value={email}
          onChange={handleOnChange}
        />
      </label>
      <br />

      <label htmlFor="passw"> Password </label>
      <input
        id="passw"
        placeholder="Enter password"
        type="password"
        value={passw}
        onChange={handleOnChange}
      />
      <br />
      <button>Submit</button>
    </form>
  );
};

export default Login;
