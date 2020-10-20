import React, { useEffect, useState } from "react";

// GraphQL
import { gql, useQuery } from "@apollo/client";

// Components
import CirclePost from "./CirclePost/CirclePost";
import GenderBarChart from "./GenderBarChart/GenderBarChart";

// Style
import "./metricsPage.scss";

// Queries/Mutations/Subscriptions
const GET_ARTICLES = gql`
  query {
    articles {
      gender
      title
    }
  }
`;

const MetricsPage: React.FC = () => {
  // State
  const [articleCircle, changeArticleCircle] = useState({
    amount: 0,
    title: "Articles",
    icon: "",
    color: "#6e5773",
  });
  const [postCircle, changePostCircle] = useState({
    amount: 0,
    title: "Posts",
    icon: "",
    color: "#8675a9",
  });
  const [totalCircle, changeTotalCircle] = useState({
    amount: 0,
    title: "Total",
    icon: "",
    color: "#6886c5",
  });
  const [quantity, changeQuantity] = useState({
    male: 0,
    female: 0,
    other: 0,
  });

  // GraphQL
  const { error, data } = useQuery(GET_ARTICLES);

  let postNumber = 0;
  let articleNumber = 0;
  let articlePostMale = 0;
  let articlePostFemale = 0;
  let articlePostOther = 0;

  useEffect(() => {
    if (error) {
      console.error("GET MongoDB ERROR:", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      console.log(data);
      if (data.articles.length > 0) {
        for (let i = 0; i < data.articles.length; i++) {
          if (data.articles[i].title === "Post") postNumber++;
          if (data.articles[i].gender === "Male") articlePostMale++;
          if (data.articles[i].gender === "Female") articlePostFemale++;
          if (data.articles[i].gender === "Other") articlePostOther++;
        }

        changePostCircle({
          amount: postNumber,
          title: "Posts",
          icon: "Article",
          color: "#8675a9",
        });

        articleNumber = data.articles.length - postNumber;

        changeArticleCircle({
          amount: articleNumber,
          title: "Articles",
          icon: "Article",
          color: "#6e5773",
        });

        changeTotalCircle({
          amount: data.articles.length,
          title: "Total",
          icon: "Article",
          color: "#6886c5",
        });

        changeQuantity({
          male: articlePostMale,
          female: articlePostFemale,
          other: articlePostOther,
        });
      }
    }
  }, [data]);

  return (
    <div className="metricsPage">
      <div className="rowWrap">
        <CirclePost post={articleCircle} />
        <CirclePost post={postCircle} />
        <CirclePost post={totalCircle} />
      </div>
      <div className="lineDivide"></div>
      <div className="genderChartContainer">
        <GenderBarChart quantity={quantity} />
      </div>
    </div>
  );
};

export default MetricsPage;
