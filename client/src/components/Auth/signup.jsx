import React, { useState } from "react";
// import * as api from "../../api";
import { useDispatch } from "react-redux";
import { signup } from "../../features/userSlice";
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
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // const createUser = async (form) => {
  //   try {
  //     const { data } = await api.signUp(form);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(form));
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
        Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor href="#" size="sm">
          Sign In
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
          Sign Up
        </Button>
      </Paper>
    </Container>
  );
};

export default SignUp;
