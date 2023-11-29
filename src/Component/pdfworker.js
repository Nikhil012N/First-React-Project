import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";

onmessage(async([tableId,newCurrentThumbnail,currentImagesOfImage])=>{
console.log("pdf worker start");
    const doc = new jsPDF({format:"a4",orientation:"landscape"});
   const options= autoTable(doc, {
      html: tableId,
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
    doc.autoTable(options);
    const pdfBlob = doc.output('blob');
    postMessage({ pdfBlob });
});