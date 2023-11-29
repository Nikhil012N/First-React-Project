import React, { useEffect, useState } from "react";
import axios from "axios";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Dialog,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseIcon from "@mui/icons-material/Close";
const Formikdetail = ({ myurl, refresh, edit }) => {
  const [Data,myData] = useState([]);
  const [open,setOpen] = useState(false);
  const [detail,setDetails] = useState();
  const getData = () => {
    axios.get(myurl).then((response) => myData(response?.data));
  };
  useEffect(() => {
    axios.get(myurl).then((response) => myData(response?.data))
  }, [myurl,refresh]);

  const deleteHandle = (id) => {
    axios
      .delete(`${myurl}/${id}`)
      .then((res) => myData(res?.data))
      .then(getData());
  };
  const handleClose = () => {
    setOpen(false);
  };
  const viewHandle = (i) => {
    setOpen(true);
    axios.get(`${myurl}/${i}`).then((res) => setDetails(res?.data));
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>NAME</TableCell>
            <TableCell>AGE</TableCell>
            <TableCell>EMAIL</TableCell>
            <TableCell>DATE</TableCell>
            <TableCell>GENDER</TableCell>
            <TableCell>GAMES</TableCell>
            <TableCell>PASSWORD</TableCell>
            <TableCell>PHONE</TableCell>
            <TableCell>STREAM</TableCell>
            <TableCell>DELETE</TableCell>
            <TableCell>EDIT</TableCell>
            <TableCell>VIEW</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Data?.map((value) => {
            return (
              <TableRow key={value?.id}>
                <TableCell>{value?.id}</TableCell>
                <TableCell>{value?.Name}</TableCell>
                <TableCell>{value?.Age}</TableCell>
                <TableCell>{value?.Email}</TableCell>
                <TableCell>{value?.Date}</TableCell>
                <TableCell>{value?.Gender}</TableCell>
                <TableCell>{value?.CheckBox?.toString()}</TableCell>
                <TableCell>{value?.Password}</TableCell>
                <TableCell>{value?.Contact}</TableCell>
                <TableCell>{value?.Stream}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteHandle(value?.id)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => edit(value?.id)}
                    startIcon={<EditRoundedIcon color="secondary" />}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => viewHandle(value?.id)}
                    startIcon={<RemoveRedEyeOutlinedIcon color="success" />}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle>
          ID:
          <label>
            <h1>{detail?.id}</h1>
          </label>
        </DialogTitle>
        <Table>
          <TableRow>
            <TableCell>
              <h3>
                <label>NAME : </label>
                {detail?.Name}
              </h3>
            </TableCell>
            <TableCell>
              <h3>
                <label>AGE:</label> {detail?.Age}
              </h3>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <h3>
                <label>EMAIL : </label>
                {detail?.Email}
              </h3>
            </TableCell>
            <TableCell>
              <h3>
                <label>DATE : </label>
                {detail?.Date}
              </h3>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <h3>
                <label>GENDER : </label>
                {detail?.Gender}
              </h3>
            </TableCell>
            <TableCell>
              <h3>
                <label>DATE : </label>
                {detail?.CheckBox?.toString()}
              </h3>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <h3>
                <label>PASSWORD : </label>
                {detail?.Password}
              </h3>
            </TableCell>
            <TableCell>
              <h3>
                <label>CONTACT : </label>
                {detail?.Contact}
              </h3>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <h3>
                <label>COURSE SELECTED : </label>
                {detail?.Stream}
              </h3>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button
                variant="outlined"
                onClick={handleClose}
                startIcon={<CloseIcon />}
              >
                Close
              </Button>
            </TableCell>
          </TableRow>
        </Table>
      </Dialog>
    </>
  );
};

export default Formikdetail;
