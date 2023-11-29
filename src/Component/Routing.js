import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Products";
import Prodetail from "./Products/Prodetail";
import Products from "./Products";
import Category from "./Products/Category";
import My404Page from "./My404Page";
import ProductPIchart from "./Products/ProductPIchart";
import Formikyup from "./Formik/Formikyup";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Protected from "./Protected";
import Reducer from "./Reducer";

function Routing() {
  return (
    <>
      <Routes>
        <Route exact path="/testing" element={<Reducer />}/>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="signup" element={<Register />}/>
        <Route exact path="*" element={<My404Page />} />
        <Route exact path="/" element={<Protected Component={Home} />}>
          <Route exact path="/Home" element={<Protected Component={Home} />}>
            <Route
              exact
              path="/Home/Category/:cd"
              element={<Protected Component={Category} />}
            >
              <Route
                exact
                path=":id"
                element={<Protected Component={Prodetail} />}
              />
            </Route>
          </Route>
        </Route>
        <Route
          exact
          path="/Products"
          element={<Protected Component={Products} />}
        >
          <Route
            exact
            path=":id"
            element={<Protected Component={Prodetail} />}
          />
        </Route>
        <Route
          exact
          path="form"
          element={<Protected Component={Formikyup} />}
        />
        <Route
          exact
          path="pichart"
          element={<Protected Component={ProductPIchart} />}
        />
      </Routes>
    </>
  );
}

export default Routing;
