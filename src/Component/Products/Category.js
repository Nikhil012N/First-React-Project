import React, { useState} from "react";
import { useParams } from "react-router-dom";
import { Paging } from "./Paging";
import { useDispatch, useSelector } from "react-redux";
import { dummyApiSearch } from "../../Redux/Slices/dummyapislice";

const Category = () => {
  const [search, mySearch] = useState("");
  const { id } = useParams();
  const { cd } = useParams();
  console.log("cd", cd);
  const dispatch = useDispatch();
  const product = useSelector((state) => state?.dummyapi?.data);
  const error = useSelector((state) => state?.dummyapi?.error);
  const loading = useSelector((state) => state?.dummyapi?.loading);
  console.log("Product", product, "loading", loading, "error", error);

  const searchButton = () => {
    dispatch(dummyApiSearch(search));
  };

  return (
    <>
      <Paging
        items={product}
        id={id}
        loading={loading}
        error={error}
        search={search}
        handleChange={(event) => mySearch(event.target?.value)}
        searchbtn={searchButton}
      />
    </>
  );
};

export default Category;
