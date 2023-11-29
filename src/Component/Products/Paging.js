import React, { useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { NavLink, Outlet } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import {
  Alert,
  Button,
  Input,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { CSVLink } from "react-csv";

export const Paging = ({
  items,
  id,
  error,
  loading,
  handleChange,
  search,
  searchbtn,
}) => {
  const [previewurl, setPreviewUrl] = useState("");
  const [Pages, setPages] = useState(0);
  const noOfPost = items?.length;
  const postPerPage = 3;
  const endPage = Pages + postPerPage;
  const currentItems = items?.slice(Pages, endPage);
  const currentImagesOfImage = currentItems?.map((val) => val?.images);
  const newCurrentThumbnail = currentItems?.map((item) => item?.thumbnail);
  const imageSubmit = (e) => {
    console.log("imageSubmit", e);
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.onload = () => {
      setPreviewUrl(filereader?.result);
    };
    filereader.readAsDataURL(file);
    console.log("imageSubmit", filereader);
  };


// const WholepdfConvert=async()=>{

//   const tableElement =document.querySelector("Product_tables");
//   const worker = new Worker("../pdfworker.js")
//   worker.onmessage = (event) => {
//     const { pdfBlob } = event.data;
//     console.log(pdfBlob)
//    if( pdfBlob){
//     const downloadLink = URL.createObjectURL(pdfBlob);
//     const a = document.createElement('a');
//     a.href = downloadLink;
//     a.download = 'table.pdf';
//     a.click();}
//     worker.terminate();
//   };

//   const tableHTML = tableElement;

//   worker.postMessage([
//     tableHTML,
//     newCurrentThumbnail,
//     currentImagesOfImage,
// ]);
// }

  const WholepdfConvert = async () => {
    const doc = new jsPDF({format:"a4",orientation:"landscape"});
    autoTable(doc, {
      html: "#Product_tables",
      bodyStyles: {
        minCellWidth: 20,
        minCellHeight: 34,
      },
      didDrawCell: function (data) {
        if
         (data.column.index === 1 && data.cell.section === "body")
         {
          let img = new Image();
          let imgUrl = newCurrentThumbnail[data.row.index];
          img.src = imgUrl;
          doc.addImage(img, data.cell.x, data.cell.y, 20, 20);
        }
        if 
        (data.column.index === 10 && data.cell.section === "body")
         {
            currentImagesOfImage[data.row.index]?.map((imgUrl,i) => {
              let img = new Image();
              img.src = imgUrl;
            return(doc.addImage(img, data.cell.x+(i*10), data.cell.y+5, 10, 20))
           })}
      },
    });
    doc.save("table.pdf");
  };


  const tableData = items.map((item) => {
    return [
      item?.id,
      item?.thumbnail&&{data:item?.thumbnail},
      item?.title,
      item?.description,
      item?.price,
      item?.discountPercentage,
      item?.rating,
      item?.stock,
      item?.brand,
      item?.category,
      item?.images&&{data:item?.images},
    ];
  });
console.log("item",items)
  console.log("tableData", tableData);
  const pdfPaginate = async () => {
    const doc = new jsPDF("l");
    autoTable(doc, {
      head: [
        [
          "ID",
          "THUMBNAIL",
          "TITLE",
          "DESCRIPTION",
          "PRICE",
          "DISCOUNT",
          "RATING",
          "STOCK",
          "BRAND",
          "CATEGORY",
          "IMAGES",
        ]
      ],
      bodyStyles: {
        minCellWidth: 20,
        minCellHeight: 34,
      },
      body: tableData,
      didDrawCell: function (data) {
        if (
          data.column.index === 1 
          && data.cell.section === "body"
          && typeof data.cell.raw === "object"
          ) 
        {
          const imgData = data?.row?.raw[1]?.data;
          console.log("imgData: " + imgData)
          doc.addImage(imgData, data.cell.x, data.cell.y, 20, 35);
        }
        if (data.column.index === 10 && data.cell.section === "body") {
          const imgData = data.row.raw[10].data; 
          console.log("imgData",imgData)
          imgData?.map((image,i)=> doc.addImage(image, data.cell.x+(i*15), data.cell.y+5, 10, 30,))
        }
      },
    });

    doc.save("table.pdf");
  };
  const tableRef=useRef();
  const ReacttoPrint=useReactToPrint({
    content: () => tableRef.current,
  });
  console.log("currentimageof image", currentImagesOfImage);
  console.log("myitem00s", items);
  return (
    <>
      {id ? (
        <Outlet />
      ) : (
        <div>
          <div style={{ paddingTop: 50 }}>
            <Button
              variant="outlined"
              style={{ float: "right" }}
              onClick={searchbtn}
            >
              Search
            </Button>
            <Input
              type="text"
              label="Search here"
              onChange={handleChange}
              style={{ float: "right" }}
            />
          </div>

          {loading && (
            <Alert variant="outlined" severity="info">
              Please wait data is loading...
            </Alert>
          )}
          {error && (
            <Alert variant="outlined" severity="error">
              {`There is a problem fetching the data - ${error}`}
            </Alert>
          )}
          {!loading && !error && (
            <>
              <CSVLink data={items}>Excel</CSVLink>&nbsp;&nbsp;
              <Button type="button" onClick={WholepdfConvert}>
              Whole  PDF download
              </Button>
              <Button type="button" onClick={pdfPaginate}>
               Page PDF
              </Button>
              <Button type="button" onClick={ReacttoPrint}>REACT TO PDF</Button>
              <input type="file" name="csvfile" onChange={imageSubmit} />
              {previewurl && (
                <img
                  src={previewurl}
                  alt="something link "
                  height={500}
                  width={500}
                />
              )}
              <Table
                style={{ borderCollapse: "collapse" }}
                id="Product_tables"
                ref={tableRef}
              >
                <TableHead className="pagingthead">
                  <TableRow key="paged">
                    <TableCell>ID</TableCell>
                    <TableCell>THUMBNAIL</TableCell>
                    <TableCell>TITLE</TableCell>
                    <TableCell>DESCRIPTION</TableCell>
                    <TableCell>PRICE</TableCell>
                    <TableCell>DISCOUNT</TableCell>
                    <TableCell>RATING</TableCell>
                    <TableCell>STOCK</TableCell>
                    <TableCell>BRAND</TableCell>
                    <TableCell>CATEGORY</TableCell>
                    <TableCell>IMAGES</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="pagingtbody">
                  {currentItems?.map((item, index) => (
                    <>
                      <TableRow key={item?.id}>
                        <TableCell>{item?.id}</TableCell>
                        <TableCell>
                          <img
                            key={index}
                            src={item?.thumbnail}
                            alt="thumbnails"
                            height={200}
                            width={200}
                          />
                        </TableCell>
                        <TableCell>
                          <NavLink to={`${item?.id}`} className="customlink">
                            {item?.brand}
                          </NavLink>
                        </TableCell>
                        <TableCell>{item?.description}</TableCell>
                        <TableCell>{item?.price}</TableCell>
                        <TableCell>{item?.discountPercentage}</TableCell>
                        <TableCell>{item?.rating}</TableCell>
                        <TableCell>{item?.stock}</TableCell>
                        <TableCell>{item?.brand}</TableCell>
                        <TableCell>{item?.category}</TableCell>
                        <TableCell>{
                            (item?.images).map((images) => {return(
                                <img
                                  src={images}
                                  alt="demo"
                                  height="100"
                                  width="100"
                                />)
})}
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
              {items?.length === 0 && (
                <Alert variant="outlined" severity="error">
                  NO SEARCH RESULT IS AVAILABLE FOR THIS {search} QUERY`
                </Alert>
              )}
              <ReactPaginate
                className="paginate"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={(e) =>
                  setPages(e.selected * postPerPage) % noOfPost
                }
                pageRangeDisplayed={5}
                pageCount={Math.ceil(noOfPost / postPerPage)}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                disabled="disabled"
              />
            </>
          )}
        </div>
      )}
    </>
  );
};