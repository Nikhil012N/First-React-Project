import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const ProductPIchart = () => {
  const [Name, setName] = useState();
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((result) => {
        setName(result?.products?.map((item) => item?.category));
      });
  }, []);
  const newName = [...new Set(Name)];
  const count = newName?.map((element) => [
    element,
    Name?.filter((gg) => gg === element).length,
  ]);
  console.log(setName);
  const a = count?.map((i) => i[0]);
  const b = count?.map((i) => i[1]);
  console.log("count", count);
  let newData = [];
  count.map((data) => {
    let sepP = { cat: "", count: "" };
    data.forEach((data, index) => {
      if (index === 0) {
       sepP["cat"] = data;
      }
      if (index === 1) {
        sepP["count"] = data;
      }
    });

    return newData.push(sepP);
  });

  console.log("newData", newData);

  const data = {
    labels: a,
    datasets: [
      {
        data: b,
        backgroundColor: [
          "#fd7f6f",
          "#beb9db",
          "#fdcce5",
          "#8be04e",
          "#9080ff",
          "#e14b31",
        ],
        borderColor: [
          "#fd7f6f",
          "#beb9db",
          "#fdcce5",
          "#8be04e",
          "#00ffff",
          "#e14b31",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div
        style={{
          height: "500vh",
          width: "50vh",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20vh 0",
        }}
      >
        <Pie data={data} legend="outside" />
      </div>
    </>
  );
};

export default ProductPIchart;
