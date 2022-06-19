import { Field, Form, Formik } from "formik";
import React, { Component } from "react";
import * as Yup from "yup";
import authService from "../services/authService";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { Link } from "react-router-dom";
import { withRouter } from "./withRouter";

type RegisterFields = {
  username: string;
  password: string;
  email: string;
  re_password: string;
};

type RegisterState = {
  loading: boolean;
  message: {
    type: "success" | "error" | "info" | "null";
    text: string;
  };
};

interface RouterProps {
  navigate?: any;
}

class Register extends Component<RouterProps, RegisterState> {
  constructor(props: RouterProps) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.state = {
      loading: false,
      message: {
        type: "null",
        text: "",
      },
    };
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .min(8, "Minimum 8 Character Required")
        .required("Password is required"),
      email: Yup.string().email().required("Email is required"),
      re_password: Yup.string()
        .required("Confirm Password is required")
        .oneOf(
          [Yup.ref("password"), "Passwords must match"],
          "Passwords must match"
        ),
    });
  }

  handleRegister(formValues: RegisterFields) {
    console.log(formValues);
    this.setState({
      loading: true,
      message: {
        type: "null",
        text: "",
      },
    });

    authService
      .register(formValues.username, formValues.password, formValues.email)
      .then(
        () => {
          this.setState({
            loading: false,
            message: {
              type: "success",
              text: "Your account has been created successfully",
            },
          });
          setTimeout(() => {
            this.props.navigate("/login");
          }, 3000);
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: {
              type: "error",
              text: resMessage,
            },
          });
        }
      );
  }

  render() {
    const { loading, message } = this.state;
    const initialValues = {
      username: "",
      password: "",
      email: "",
      re_password: "",
    };
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.handleRegister}
      >
        <Form>
          <ThemeProvider theme={createTheme()}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "secondary.main",
                  }}
                >
                  <AppRegistrationIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                {message.type === "success" && (
                  <Alert severity="success">{message.text}</Alert>
                )}
                {message.type === "error" && (
                  <Alert severity="error">{message.text}</Alert>
                )}
                <Box
                  sx={{
                    mt: 1,
                  }}
                >
                  <Field validateOnBlur validateOnChange name="username">
                    {({ field, form }: any) => (
                      <TextField
                        name="username"
                        label="Username"
                        margin="normal"
                        fullWidth
                        required
                        autoFocus
                        error={Boolean(form.errors.username)}
                        helperText={
                          form.errors.username &&
                          form.touched.username &&
                          String(form.errors.username)
                        }
                        {...field}
                      />
                    )}
                  </Field>
                  <Field validateOnBlur validateOnChange name="email">
                    {({ field, form }: any) => (
                      <TextField
                        name="email"
                        label="Email"
                        margin="normal"
                        fullWidth
                        required
                        autoFocus
                        error={Boolean(form.errors.email)}
                        helperText={
                          form.errors.email &&
                          form.touched.email &&
                          String(form.errors.email)
                        }
                        {...field}
                      />
                    )}
                  </Field>
                  <Field validateOnBlur validateOnChange name="password">
                    {({ field, form }: any) => (
                      <TextField
                        name="password"
                        label="Password"
                        margin="normal"
                        fullWidth
                        autoComplete="new-password"
                        required
                        type="password"
                        error={Boolean(form.errors.password)}
                        helperText={
                          form.errors.password &&
                          form.touched.password &&
                          String(form.errors.password)
                        }
                        {...field}
                      />
                    )}
                  </Field>
                  <Field validateOnBlur validateOnChange name="re_password">
                    {({ field, form }: any) => (
                      <TextField
                        name="re_password"
                        label="Confirm Password"
                        margin="normal"
                        autoComplete="new-password"
                        fullWidth
                        required
                        type="password"
                        error={Boolean(form.errors.re_password)}
                        helperText={
                          form.errors.re_password &&
                          form.touched.re_password &&
                          String(form.errors.re_password)
                        }
                        {...field}
                      />
                    )}
                  </Field>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{
                      mt: 2,
                      mb: 2,
                      fontSize: "1rem",
                      fontWeight: "bold",

                      textTransform: "uppercase",
                      borderRadius: "0.5rem",
                      backgroundColor: "secondary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "secondary.dark",
                      },
                    }}
                  >
                    {loading ? "Loading..." : "Register"}
                  </Button>
                  <Grid>
                    <Grid item xs>
                      <Link to="/login">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Form>
      </Formik>
    );
  }
}
export default withRouter(Register);
