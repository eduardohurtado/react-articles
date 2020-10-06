import React from "react";

//Components
import CirclePost from "../CirclePost/CirclePost";

//Style
import "./metricsPage.scss";

const MetricsPage: React.FC = () => {
  const post = {
    amount: 3,
    title: "Article",
    icon: "Article",
    color: "#6e5773",
  };
  const post2 = {
    amount: 3,
    title: "Posts",
    icon: "Article",
    color: "#8675a9",
  };
  const post3 = {
    amount: 3,
    title: "Comments",
    icon: "Article",
    color: "#6886c5",
  };

  return (
    <div className="metricsPage">
      <div className="rowWrap">
        <CirclePost post={post} />
        <CirclePost post={post2} />
        <CirclePost post={post3} />
      </div>
    </div>
  );
};

export default MetricsPage;
