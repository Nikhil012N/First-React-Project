import React from "react";
import { useEffect} from "react";
import { useParams } from "react-router-dom";
import { Alert, TableBody,TableCell,Table,TableHead,TableRow } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { dummyApiProductID } from "../../Redux/Slices/dummyapislice";

function Prodetail() {
  const { id } = useParams();
  const dispatch=useDispatch();
  const error=useSelector((state)=>state?.dummyapi?.error);
  const loading=useSelector((state)=>state?.dummyapi?.loading);
  const item=useSelector((state)=>state?.dummyapi?.data);

 console.log("item",item)
  useEffect(() => {
dispatch(dummyApiProductID(id));
  }, [dispatch,id]);
  return (
    <>
      {loading && <Alert variant="outlined" severity="info" className='Alert'>
      Please wait data is loading...
</Alert>}
{error && 
      <Alert variant="outlined" severity="error">
    {`There is a problem fetching the data - ${error}`}
    </Alert>}

      {!loading && !error && (
        <Table >
          < TableHead>
            < TableRow>
              < TableCell>ID</ TableCell>
              < TableCell>THUMBNAIL</ TableCell>
              < TableCell>TITLE</ TableCell>
              < TableCell>DESCRIPTION</ TableCell>
              < TableCell>PRICE</ TableCell>
              < TableCell>DISCOUNT</ TableCell>
              < TableCell>RATING</ TableCell>
              < TableCell>STOCK</ TableCell>
              < TableCell>BRAND</ TableCell>
              < TableCell>CATEGORY</ TableCell>
              < TableCell>IMAGES</ TableCell>
            </TableRow>
          </TableHead>
          <TableBody  >
            {item?.map(item=>{return(
            <TableRow key={id}>

              < TableCell>{item?.id}</ TableCell>
              < TableCell key={id}>
                <img
                  src={item?.thumbnail}
                  alt="demo"
                  height="200"
                  width="200"
                />
              </ TableCell>
              < TableCell>{item?.brand}</ TableCell>
              < TableCell>{item?.description}</ TableCell>
              < TableCell>{item?.price}</ TableCell>
              < TableCell>{item?.discountPercentage}</ TableCell>
              < TableCell>{item?.rating}</ TableCell>
              < TableCell>{item?.stock}</ TableCell>
              < TableCell>{item?.brand}</ TableCell>
              < TableCell>{item?.category}</ TableCell>
              < TableCell>
                {item?.images?.length > 0 &&
                  (item?.images).map((i,index) => (
                    <div key={index}>
                      <img src={i} alt="demo" height="100" width="100" />
                      </div>))}
              </ TableCell>
            </ TableRow>)})}
          </TableBody>
        </Table>
      )}
      
    </>
  );
}

export default Prodetail;
