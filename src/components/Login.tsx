import React, { Component } from "react";
import { Formik, Field, Form } from "formik";
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Link } from "react-router-dom";
import { withRouter } from "./withRouter";

type LoginFormValues = {
  username: string;
  password: string;
};

type LoginState = {
  username: string;
  password: string;
  loading: boolean;
  message: string;
};

interface RouterProps {
  navigate?: any;
}

class Login extends Component<RouterProps, LoginState> {
  constructor(props: RouterProps) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "",
    };
  }
  validationSchema() {
    return Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    });
  }

  handleLogin(formValues: LoginFormValues) {
    const { username, password } = formValues;
    this.setState({
      loading: true,
      message: "",
    });

    authService.login(username, password).then(
      () => {
        this.setState({
          loading: false,
          message: "Success",
        });
        authService.getCurrentUser().then(
          (user) => {
            console.log(user);
            this.props.navigate("/dashboard");
          }
        )
        this.props.navigate("/register");

      },
      (error) => {
        const resMessage =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        this.setState({
          loading: false,
          message: resMessage,
        });
      }
    );
  }

  render() {
    const { message } = this.state;
    const initialValues = {
      username: "",
      password: "",
    };
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.handleLogin}
      >
        <Form>
          <ThemeProvider theme={createTheme()}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "secondary.main",
                  }}
                >
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                {message && <Alert severity="error">{message}</Alert>}
                <Box sx={{ mt: 1 }}>
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link to="#">Forgot password?</Link>
                    </Grid>
                    <Grid item>
                      <Link to="/register">
                        {"Don't have an account? Sign Up"}
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

export default withRouter(Login);
