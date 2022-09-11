import React, { useState } from "react";
// import * as api from "../../api";
import { useDispatch } from "react-redux";
import { signup, signin } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";

const initialState = {
  email: "",
  password: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(isLoggedIn);
  const switchMode = (e) => {
    e.preventDefault();
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signin(form)).then(() => navigate("/"));
    } else {
      dispatch(signup(form));
    }
  };
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Hello! Here is your {isSignup ? "Sign In" : "Sign Up"} Form
      </Title>

      <Text color="dimmed" size="sm" align="center" mt={5}>
        {isSignup ? "Don't you have an account? " : "Already have an account? "}
        <Anchor component="button" type="button" onClick={switchMode} size="sm">
          {isSignup ? "Sign Up" : "Sign In"}
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          name="email"
          label="Email"
          placeholder="you@auction.dev"
          onChange={handleChange}
          required
        />
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Your password"
          onChange={handleChange}
          required
          mt="md"
        />

        <Button onClick={handleSubmit} fullWidth mt="xl">
          {isSignup ? "Sign In" : "Sign Up"}
        </Button>
      </Paper>
    </Container>
  );
};

export default SignUp;
