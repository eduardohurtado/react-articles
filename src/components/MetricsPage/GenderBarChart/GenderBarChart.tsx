import React, { CSSProperties } from "react";
import { HorizontalBar } from "react-chartjs-2";

const style: CSSProperties = {
  color: "#333",
  marginLeft: "10px",
};

interface IProps {
  quantity: {
    male: number;
    female: number;
    other: number;
  };
}

const GenderBarChart: React.FC<IProps> = (props) => {
  const data = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        label: "Articles/Post",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 3,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [
          props.quantity.male,
          props.quantity.female,
          props.quantity.other,
        ],
      },
    ],
  };

  return (
    <div>
      <h2 style={style}>Articles / Post by gender</h2>
      <HorizontalBar data={data} height={250} />
    </div>
  );
};

export default GenderBarChart;
