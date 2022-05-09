import { Auth } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "./components/CustomButton";
import CustomInput from "./components/CustomInput";
import "./Signin.css";

function SignInScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.signIn(data.username, data.password);
      console.log(response);
    } catch (e) {
      console.warn("Oops", e.message);
    }
    setLoading(false);
    window.location.reload(false)
  };
  const onForgotPasswordPressed = () => {};

  const onSignUpPress = () => {};

  return (
    <div className="signin">
      <div className="signin__wrapper">
        <div className="signin__text">Log in</div>
        <div className="signin1">
          <CustomInput
            name="username"
            placeholder="Username"
            control={control}
            rules={{ required: "Username is required" }}
          />
          <CustomInput
            name="password"
            placeholder="Password"
            secureTextEntry
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 3,
                message: "Password should be minimum 3 characters long",
              },
            }}
          />
          <CustomButton
            text={loading ? "Loading..." : "Sign In"}
            onPress={handleSubmit(onSignInPressed)}
          />
        </div>
      </div>
    </div>
  );
}

export default SignInScreen;
