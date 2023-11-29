import {
  Table,
  TableBody,
  TableRow,
  Typography,
  TableCell,
  TableHead,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import { dummyApiCategory,dummyApiCatPro } from "../../Redux/Slices/dummyapislice";
import { useDispatch,useSelector } from "react-redux";

const Home = () => {
  const dispatch=useDispatch();
  const { cd } = useParams();

  useEffect(() => {
      const myFnc=()=>{
    cd? dispatch(dummyApiCatPro(cd)): dispatch(dummyApiCategory());
  }
   myFnc();
      },[cd,dispatch]);
  const catdata=useSelector(state=>state?.dummyapi?.catdata);
  console.log("Catdata",catdata);
  const error=useSelector(state=>state?.dummyapi?.error);
  const loading=useSelector(state=>state?.dummyapi?.loading);
  
  console.log("Category","loading",loading,"error",error);
  // console.log(error, loading);
  return (
    <>
      {cd ? (
        <Outlet />
      ) : (
        <>
          <Table className="catgorytable">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    borderBottom: "none",
                    textAlign: "center",
                    paddingTop: "100px",
                  }}
                  rowSpan={3}
                >
                  <Typography variant="h2" gutterBottom>
                    Categories
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gridGap: 20,
                  marginLeft: "auto",
                  marginRight: "auto",
                  padding: "auto",
                }}
              >
                {catdata?.map((val,index) => {
                  return (
                    <TableCell key={index} style={{ borderBottom: "none" }}>
                      <Link className="customlink" to={`/Home/Category/${val}`}>
                        {val}
                      </Link>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
};
export default Home;
