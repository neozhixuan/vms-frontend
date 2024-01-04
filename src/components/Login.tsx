import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../state/store";
import { BossType, login } from "../state/authentication";
import { CustomButton } from "../styles/utils";
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
          navigate(`/boss/${result.id}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='container'>
      <p className='header-text'>Login</p>
      <form className='login-form' onSubmit={handleOnSubmit}>
        <div className='field-group'>
          <label htmlFor='email'>Email </label>

          <input
            className='field-input'
            id='email'
            placeholder='Enter NTU email'
            type='text'
            value={email}
            onChange={handleOnChange}
          />
        </div>

        <div className='field-group'>
          <label htmlFor='passw'> Password </label>
          <input
            className='field-input'
            id='passw'
            placeholder='Enter password'
            type='password'
            value={passw}
            onChange={handleOnChange}
          />
          <br />
        </div>
        <CustomButton type='submit'>Submit</CustomButton>
      </form>
    </div>
  );
};

export default Login;
