import { Auth, DataStore } from "aws-amplify";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { generatePath, NavLink, useNavigate } from "react-router-dom";
import CustomButton from "./components/CustomButton";
import CustomInput from "./components/CustomInput";
import "./SignupScreen.css";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function SignupScreen() {
  const { control, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const pwd = watch("password");

  const onRegisterPressed = async (data) => {
    const { username, password, email } = data;

    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, preferred_username: username },
      });
      navigate(generatePath("confirm/:name", { name: username }));
    } catch (e) {
      console.log("Oops", e.message);
    }
  };
  return (
    <div className="signup">
      <div className="signup__wrapper">
        <div className="signin__text">Sign up</div>
        <div className="signin1">
          <div className="signup__row">
            <CustomInput
              name="Firstname"
              control={control}
              placeholder="First Name"
              rules={{
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name should be at least 3 characters long",
                },
                maxLength: {
                  value: 24,
                  message: "Name should be max 24 characters long",
                },
              }}
            />
            <CustomInput
              name="Lastname"
              control={control}
              placeholder="Last Name"
              rules={{
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name should be at least 3 characters long",
                },
                maxLength: {
                  value: 24,
                  message: "Name should be max 24 characters long",
                },
              }}
            />
          </div>

          <CustomInput
            name="username"
            control={control}
            placeholder="Username"
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username should be at least 3 characters long",
              },
              maxLength: {
                value: 24,
                message: "Username should be max 24 characters long",
              },
            }}
          />

          <CustomInput
            name="email"
            control={control}
            placeholder="Email"
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
            }}
          />

          <CustomInput
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters long",
              },
            }}
          />
          <CustomInput
            name="password-repeat"
            control={control}
            placeholder="Repeat Password"
            secureTextEntry
            rules={{
              validate: (value) => value === pwd || "Password do not match",
            }}
          />
          <CustomButton
            text="Register"
            onPress={handleSubmit(onRegisterPressed)}
          />
        </div>
      </div>
    </div>
  );
}

export default SignupScreen;
