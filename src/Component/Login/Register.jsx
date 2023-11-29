import React, { useState, useEffect } from "react";
import {
  Button,
  TableCell,
  TableRow,
  TableBody,
  Table,
  Box,
} from "@mui/material";
import "../reg.css";
import * as Yup from "yup";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup, signin } from "../../Redux/Slices/loginslice";

const Register = () => {
  const Data = useSelector((state) => state?.loginapi?.users);
  const [previewImage, setPreviewImage] = useState(null);
  const initialValue = {
    userName: "",
    email: "",
    password: "",
    cPassword: "",
    myimage: null,
  };
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("key") && Navigate("/home");
    dispatch(signin());
  }, [dispatch,Navigate]);
  console.log(Data);

  const validation = Yup.object().shape({
    userName: Yup.string("Must be a string")
      .required("Name is required")
      .min(3, "Too short!")
      .max(15, "Too long!")
      .trim(),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email")
      .trim(),
    password: Yup.string().required("Password is required").min(5).trim(),
    cPassword: Yup.string()
      .label("confirm password")
      .required("Confirm your Password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const UploadedImage = (event) => {
    const fileReader = new FileReader();
    console.log(fileReader);
    const file = event.target.files[0];
    fileReader.onload = () => {
      setPreviewImage(fileReader?.result);
    };
    fileReader.readAsDataURL(file);
    console.log(file);
  };

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
          initialValues={initialValue}
          validationSchema={validation}
          onSubmit={async (values, { resetForm }) => {
            const existUser = Data.find(
              (data) => values?.userName === data?.userName
            );
            console.log("exist user", existUser);
            if (!existUser) {
              dispatch(signup({ values, previewImage }));
              // axios
              //   .post(url, {
              //     userName: values?.userName,
              //     email: values?.email,
              //     password: hashPassword,
              //     cPassword: values?.cPassword,
              //     token: cryptoRandomString({ length: 20 }),
              //     myimage: previewImage,
              //   })
              //   .then(resetForm(), Navigate("/login"))
              //   .catch((error) => {
              //     alert(error);
              //   });
              // console.log(values?.myimage);
              Navigate("/login");
              resetForm();
            } else {
              alert("Username exist");
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
                    <label htmlFor="Email">EMAIL</label>
                  </TableCell>

                  <TableCell>
                    <Field
                      variant="outlined"
                      type="email"
                      id="Email"
                      name="email"
                    />
                    <Field as="span">
                      <ErrorMessage name="email" />
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
                    <label htmlFor="CPassword"> CONFIRM PASSWORD</label>
                  </TableCell>
                  <TableCell>
                    <Field
                      variant="outlined"
                      type="text"
                      id="CPassword"
                      name="cPassword"
                    />
                    <Field as="span">
                      <ErrorMessage name="cPassword" />
                    </Field>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <label htmlFor="myImage">UPLOAD IMAGE</label>
                  </TableCell>
                  <TableCell>
                    <Field
                      type="file"
                      id="myImage"
                      name="myimage"
                      onChange={UploadedImage}
                      accept="image/*"
                      required
                    />
                    <Field as="span">
                      <ErrorMessage name="myimage" />
                    </Field>
                    <br />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Uploaded"
                        crossOrigin="anonymous"
                        width={100}
                        height={100}
                      />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button variant="outlined" type="submit">
                      Submit
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => Navigate("/login")}
                      type="button"
                    >
                      Login
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

export default Register;
