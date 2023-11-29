import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paging } from "./Paging";
import "./reg.css";
import { useDispatch,useSelector } from "react-redux";
import { dummyApiProducts,dummyApiSearch } from "../../Redux/Slices/dummyapislice";

function Products() {
  const [search, mySearch] = useState("");
  const { id } = useParams();
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(dummyApiProducts());
  }, [dispatch]);
  // const error=useSelector(state=>state?.dummyapi?.error);
  // const loading=useSelector(state=>state?.dummyapi?.loading);
  // const items= useSelector(state=>state?.dummyapi?.data);
const{data,loading,error}=useSelector(state=>state?.dummyapi)
 
 
console.log("items",data)
  const searchbtn = () => {
    dispatch(dummyApiSearch(search));
    // setLoading(true);
    // fetch(`https://dummyjson.com/products/search?q=${search}`)
    //   .then((res) => res.json())
    //   .then(
    //     (result) => {
    //       setItem(result?.products);
    //       setLoading(false);
    //     },
    //     (error) => {
    //       setError(error);
    //       setLoading(false);
    //     }
    //   );
  };

  return (
    <>
  
      <Paging
        items={data}
        id={id}
        loading={loading}
        error={error}
        search={search}
        handleChange={(event) => mySearch(event.target?.value)}
        searchbtn={searchbtn}
      />
    </>
  );
}

export default Products;
