import React, { FC } from "react";

//Components
import ArticlePost from "../ArticlePost/ArticlePost";

//Style
import "./showArticles.scss";

interface IProps {
  someProps?: unknown;
}

const ShowArticles: FC<IProps> = () => {
  return (
    <div className="articleShowSA">
      <div className="articlePostShow">
        <ArticlePost />
      </div>
    </div>
  );
};

export default ShowArticles;
