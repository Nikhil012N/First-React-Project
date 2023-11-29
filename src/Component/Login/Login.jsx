import React, {useEffect } from "react";
import {
  Button,
  TableCell,
  TableRow,
  TableBody,
  Table,
  Box,
} from "@mui/material";
import "../reg.css";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import md5 from "md5";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../Redux/Slices/loginslice";

const Login = () => {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state?.loginapi?.users);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(signin());
  }, [dispatch]);
  const validation = Yup.object().shape({
    userName: Yup.string("Must be a string")
      .required("Username is required")
      .trim(),
    password: Yup.string().required("Password is required").trim(),
  });
  console.log("your data", Data);
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Formik
          enableReinitialize
          validationSchema={validation}
          initialValues={{
            userName: "",
            password: "",
          }}
          onSubmit={(values, { resetForm }) => {
            const password = md5(values?.password);
            const userData = Data?.find(
              (mydata) =>
                values?.userName === mydata?.userName &&
                password === mydata?.password
            );
            console.log("login page", md5(values?.password));
            console.log("userdata", userData.userName);
            if (userData) {
              localStorage.setItem("username", userData?.userName);
              localStorage.setItem("key", userData?.token);
              localStorage.setItem("myDp", userData?.myimage);
              navigate("/home");
              alert("Login successful");
            } else {
              resetForm();
              alert("Login failed");
            }
          }}
        >
          <Form>
            <Table
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                border: "2px solid black",
              }}
            >
              <TableBody>
                <TableRow>
                  <TableCell>
                    <label htmlFor="Username">USERNAME</label>
                  </TableCell>
                  <TableCell>
                    <Field
                      variant="outlined"
                      type="text"
                      id="Username"
                      name="userName"
                    />
                    <Field as="span">
                      <ErrorMessage name="userName" />
                    </Field>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <label htmlFor="Password">PASSWORD</label>
                  </TableCell>
                  <TableCell>
                    <Field
                      variant="outlined"
                      type="text"
                      id="Password"
                      name="password"
                    />
                    <Field as="span">
                      <ErrorMessage name="password" />
                    </Field>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button variant="outlined" color="success" type="submit">
                      Login
                    </Button>
                    &nbsp;
                    <Button
                      variant="outlined"
                      onClick={() => {
                        navigate("/Signup");
                      }}
                    >
                      SignUp
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Form>
        </Formik>
      </Box>
    </>
  );
};

export default Login;
