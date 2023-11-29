import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
const Protected = (props) => {
  const navigate = useNavigate();
  const url = "http://localhost:8080/register"; 
  const location = useLocation();
  console.log("fggdfgd", location);
  useEffect(() => {
    const token = localStorage.getItem("key");
    const user = localStorage.getItem("username");
    const picture = localStorage.getItem("myDp");
    axios.get(url).then((response) => {
      console.log("response?.data", response?.data);
      let curret_usr = response?.data?.filter(
        (data) =>
          data.token === token &&
          data.userName === user &&
          data.myimage === picture
      );
      if (curret_usr.length === 0) {
        if (location.pathname !== "/login" || location.pathname !== "/signup") {
          localStorage.clear();
          navigate("/login");
        }
      }
    });
  }, [location.pathname, navigate]);

  return (
    <div>
      <Layout>
      <props.Component />
      </Layout>
    </div>
  );
};

export default Protected;
