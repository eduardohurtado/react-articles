import React, { useEffect, useState } from "react";

// GraphQL
import { gql, useQuery } from "@apollo/client";

// Components
import CirclePost from "../CirclePost/CirclePost";

// Style
import "./metricsPage.scss";

// Queries/Mutations/Subscriptions
const GET_ARTICLES = gql`
  query {
    articles {
      title
    }
  }
`;

const MetricsPage: React.FC = () => {
  // State
  const [showArticleCircle, changeShowArticleCircle] = useState(true);
  const [articleCircle, changeArticleCircle] = useState({
    amount: 0,
    title: "Articles",
    icon: "",
    color: "#6e5773",
  });
  const [showPostCircle, changeShowPostCircle] = useState(true);
  const [postCircle, changePostCircle] = useState({
    amount: 0,
    title: "Posts",
    icon: "#8675a9",
    color: "",
  });
  const [showTotalCircle, changeShowTotalCircle] = useState(true);
  const [totalCircle, changeTotalCircle] = useState({
    amount: 0,
    title: "Total",
    icon: "",
    color: "#6886c5",
  });

  // GraphQL
  const { error, data } = useQuery(GET_ARTICLES);

  let postNumber = 0;
  let articleNumber = 0;

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
        }

        changePostCircle({
          amount: postNumber,
          title: "Posts",
          icon: "Article",
          color: "#8675a9",
        });
        changeShowPostCircle(true);

        articleNumber = data.articles.length - postNumber;

        changeArticleCircle({
          amount: articleNumber,
          title: "Articles",
          icon: "Article",
          color: "#6e5773",
        });
        changeShowArticleCircle(true);

        changeTotalCircle({
          amount: data.articles.length,
          title: "Total",
          icon: "Article",
          color: "#6886c5",
        });
        changeShowTotalCircle(true);
      }
    }
  }, [data]);

  return (
    <div className="metricsPage">
      <div className="rowWrap">
        {showArticleCircle && <CirclePost post={articleCircle} />}
        {showPostCircle && <CirclePost post={postCircle} />}
        {showTotalCircle && <CirclePost post={totalCircle} />}
      </div>
    </div>
  );
};

export default MetricsPage;
