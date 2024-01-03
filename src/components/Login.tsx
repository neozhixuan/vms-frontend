import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../state/store";
import { BossType, login } from "../state/authentication";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [inputValue, setInputValue] = useState({
    email: "",
    passw: "",
  });
  const { email, passw } = inputValue;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValue({
      ...inputValue,
      [id]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const { mutateAsync: loginMutation } = useMutation({
    mutationFn: handleLogin,
  });

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputValue);
    loginMutation()
      .then((result) => {
        if (result && result.fullname) {
          dispatch(login(result as BossType)); // Dispatch the login action
          navigate("/bosspage");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleOnSubmit}>
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
