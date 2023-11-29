import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  InputLabel,
} from "@mui/material";
import Formikdetail from "./Formikdetail";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";

const Formikyup = () => {
  const initialValues = {
    id: "",
    Name: "",
    Age: "",
    Email: "",
    Date: "",
    Gender: "",
    CheckBox: "",
    Password: "",
    Contact: "",
    Stream: "",
  };
  const [refresh, setRefresh] = useState(true);
  const [value, setValue] = useState(initialValues);
  const [buttons, setButtons] = useState(true);
  const url = "http://localhost:8081/employees";

  const validation = Yup.object().shape({
    Name: Yup.string("Must be a string")
      .required("Name is required")
      .min(3, "Too short!")
      .max(15, "Too long!")
      .trim(),
    Age: Yup.number("Should be a number")
      .positive()
      .min(14)
      .max(35)
      .integer()
      .required("Age is required"),
    Email: Yup.string()
      .required("Email is required")
      .email("Invalid email")
      .trim(),
    Date: Yup.date()
      .required("Date is required")
      .min(new Date(), "Date before today is not allowed"),
    Gender: Yup.string().required("Gender is required").trim(),
    CheckBox: Yup.array().required("Required").min(1, "Please select Checkbox"),
    Password: Yup.string().required("Password is required").min(5).trim(),
    Contact: Yup.number("Must be a number")
      .positive()
      .required("Contact details are required")
      .min(10)
      .integer(),
    Stream: Yup.string().required("Choose a stream"),
  });
  const editbtn = (id) => {
    setButtons(false);
    axios
      .get(`${url}/${id}`)
      .then((res) => setValue(res?.data))
      .then(console.log(value));
  };

  return (
    <div style={{ paddingTop: 67 }}>
      <Formik
        enableReinitialize
        initialValues={value}
        validationSchema={validation}
        onSubmit={(values, { resetForm }) => {
          buttons === true
            ? axios
                .post(url, {
                  Name: values?.Name,
                  Age: values?.Age,
                  Email: values?.Email,
                  Date: values?.Date,
                  Gender: values?.Gender,
                  CheckBox: values?.CheckBox,
                  Password: values?.Password,
                  Contact: values?.Contact,
                  Stream: values?.Stream,
                })
                .then(resetForm())
                .catch((error) => {
                  alert(error);
                })
            : axios
                .put(`${url}/${values?.id}`, {
                  Name: values?.Name,
                  Age: values?.Age,
                  Email: values?.Email,
                  Date: values?.Date,
                  Gender: values?.Gender,
                  CheckBox: values?.CheckBox,
                  Password: values?.Password,
                  Contact: values?.Contact,
                  Stream: values?.Stream,
                })
                .then(setButtons(true), setValue(initialValues))
                .catch((error) => {
                  alert(error);
                });

          refresh === true ? setRefresh(false) : setRefresh(true);
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
                  <InputLabel htmlFor="ID">ID</InputLabel>
                </TableCell>
                <TableCell>
                  <Field type="text" name="id" id="ID" readOnly />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InputLabel htmlFor="Name">Name</InputLabel>
                </TableCell>
                <TableCell>
                  <Field type="text" name="Name" id="Name" />
                  <Field as="span">
                    <ErrorMessage name="Name" />
                  </Field>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InputLabel htmlFor="Age">Age</InputLabel>
                </TableCell>
                <TableCell>
                  <Field type="text" name="Age" id="Age" />
                  <Field as="span">
                    <ErrorMessage name="Age" />
                  </Field>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InputLabel htmlFor="Email">Email</InputLabel>
                </TableCell>
                <TableCell>
                  <Field type="email" name="Email" id="Email" />
                  <Field as="span">
                    <ErrorMessage name="Email" />
                  </Field>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InputLabel htmlFor="Date">Date</InputLabel>
                </TableCell>
                <TableCell>
                  <Field type="Date" name="Date" id="Date" />
                  <Field as="span">
                    <ErrorMessage name="Date" />
                  </Field>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InputLabel>Gender</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel>
                    <Field type="radio" name="Gender" value="Male" id="Male" />
                    Male
                  </InputLabel>
                  <InputLabel>
                    <Field
                      type="radio"
                      name="Gender"
                      value="Female"
                      id="Female"
                    />
                    Female
                  </InputLabel>
                  <Field as="span">
                    <ErrorMessage name="Gender" />
                  </Field>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InputLabel>Games</InputLabel>
                </TableCell>
                <TableCell>
                  <InputLabel>
                    <Field
                      type="checkbox"
                      name="CheckBox"
                      value="Ludo"
                      id="Ludo"
                    />
                    <InputLabel htmlFor="Ludo">Ludo</InputLabel>
                    <Field
                      type="checkbox"
                      name="CheckBox"
                      value="Chess"
                      id="Chess"
                    />
                    <InputLabel htmlFor="Chess">Chess</InputLabel>
                    <Field
                      type="checkbox"
                      name="CheckBox"
                      value="Tik-tac-toe"
                      id="Tik"
                    />
                    <InputLabel htmlFor="Tik">Tik-tac-toe</InputLabel>
                  </InputLabel>
                  <Field as="span">
                    <ErrorMessage name="CheckBox" />
                  </Field>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InputLabel htmlFor="Password"> Password</InputLabel>
                </TableCell>
                <TableCell>
                  <Field type="password" name="Password" id="Password" />
                  <Field as="span">
                    <ErrorMessage name="Password" />
                  </Field>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InputLabel htmlFor="Contact">Telephone</InputLabel>
                </TableCell>
                <TableCell>
                  <Field type="tel" name="Contact" id="Contact" />
                  <Field as="span">
                    <ErrorMessage name="Contact" />
                  </Field>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <InputLabel htmlFor="Stream">Streams</InputLabel>
                </TableCell>
                <TableCell>
                  <Field as="select" name="Stream" id="Stream" color="primary">
                    <option></option>
                    <option value="Medical">Medical</option>
                    <option value="Non Medical">Non Medical</option>
                    <option value="Arts">Arts</option>
                  </Field>
                  <Field as="span">
                    <ErrorMessage name="Stream" />
                  </Field>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  {buttons === true ? (
                    <Button variant="outlined" type="submit">
                      SUBMIT
                      <SendIcon />
                    </Button>
                  ) : (
                    <Button variant="outlined" type="submit">
                      UPDATE
                      <SendIcon />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Form>
      </Formik>
      <br></br>
      <Formikdetail myurl={url} refresh={refresh} edit={editbtn} />
    </div>
  );
};

export default Formikyup;
