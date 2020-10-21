import React, { useEffect, useState } from "react";

// GraphQL
import { gql, useQuery } from "@apollo/client";

// Components
import CirclePost from "./CirclePost/CirclePost";
import GenderBarChart from "./GenderBarChart/GenderBarChart";
import GenderPolarChart from "./GenderPolarChart/GenderPolarChart";

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
    icon: "icon1",
    color: "#6e5773",
  });
  const [postCircle, changePostCircle] = useState({
    amount: 0,
    title: "Posts",
    icon: "icon2",
    color: "#8675a9",
  });
  const [totalCircle, changeTotalCircle] = useState({
    amount: 0,
    title: "Total",
    icon: "icon3",
    color: "#6886c5",
  });
  const [quantity, changeQuantity] = useState({
    male: 0,
    female: 0,
    other: 0,
  });
  const [quantityByGender, changeQuantityByGender] = useState({
    maleArticle: 0,
    malePost: 0,
    femaleArticle: 0,
    femalePost: 0,
    otherArticle: 0,
    otherPost: 0,
  });

  // GraphQL
  const { error, data } = useQuery(GET_ARTICLES);

  let postNumber = 0;
  let articleNumber = 0;
  let articlePostMale = 0;
  let articlePostFemale = 0;
  let articlePostOther = 0;

  let articleMale = 0;
  let postMale = 0;
  let articleFemale = 0;
  let postFemale = 0;
  let articleOther = 0;
  let postOther = 0;

  useEffect(() => {
    if (error) {
      console.error("GET MongoDB ERROR:", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      if (data.articles.length > 0) {
        for (let i = 0; i < data.articles.length; i++) {
          if (data.articles[i].title === "Post") postNumber++;

          if (data.articles[i].gender === "Male") articlePostMale++;
          if (
            data.articles[i].gender === "Male" &&
            data.articles[i].title === "Post"
          )
            postMale++;

          if (data.articles[i].gender === "Female") articlePostFemale++;
          if (
            data.articles[i].gender === "Female" &&
            data.articles[i].title === "Post"
          )
            postFemale++;

          if (data.articles[i].gender === "Other") articlePostOther++;
          if (
            data.articles[i].gender === "Other" &&
            data.articles[i].title === "Post"
          )
            postOther++;
        }

        articleNumber = data.articles.length - postNumber;
        articleMale = articlePostMale - postMale;
        articleFemale = articlePostFemale - postFemale;
        articleOther = articlePostOther - postOther;

        changeQuantityByGender({
          maleArticle: articleMale,
          malePost: postMale,
          femaleArticle: articleFemale,
          femalePost: postFemale,
          otherArticle: articleOther,
          otherPost: postOther,
        });

        changePostCircle({
          amount: postNumber,
          title: "Posts",
          icon: "icon1",
          color: "#8675a9",
        });

        changeArticleCircle({
          amount: articleNumber,
          title: "Articles",
          icon: "icon2",
          color: "#6e5773",
        });

        changeTotalCircle({
          amount: data.articles.length,
          title: "Total",
          icon: "icon3",
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

      <div className="responsiveWrapper">
        <div className="barChartContainer">
          <GenderBarChart quantity={quantity} />
        </div>
        <div className="polarChartContainer">
          <GenderPolarChart quantityByGender={quantityByGender} />
        </div>
      </div>
    </div>
  );
};

export default MetricsPage;
