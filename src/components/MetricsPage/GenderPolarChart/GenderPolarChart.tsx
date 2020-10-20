import React, { CSSProperties } from "react";
import { Polar } from "react-chartjs-2";

const style: CSSProperties = {
  color: "#333",
  marginLeft: "10px",
};

interface IProps {
  quantityByGender: {
    maleArticle: number;
    malePost: number;
    femaleArticle: number;
    femalePost: number;
    otherArticle: number;
    otherPost: number;
  };
}

const GenderPolarChart: React.FC<IProps> = (props) => {
  const data = {
    datasets: [
      {
        data: [
          props.quantityByGender.maleArticle,
          props.quantityByGender.malePost,
          props.quantityByGender.femaleArticle,
          props.quantityByGender.femalePost,
          props.quantityByGender.otherArticle,
          props.quantityByGender.otherPost,
        ],
        backgroundColor: [
          "#FF6384",
          "#4BC0C0",
          "#FFCE56",
          "#8675a9",
          "#36A2EB",
          "#578466",
        ],
        label: "My dataset", // for legend
      },
    ],
    labels: [
      "Male: Article",
      "Male: Post",
      "Female: Article",
      "Female: Post",
      "Other: Article",
      "Other: Post",
    ],
  };

  return (
    <div>
      <h2 style={style}>Type of compose by gender</h2>
      <Polar data={data} height={250} />
    </div>
  );
};

export default GenderPolarChart;
