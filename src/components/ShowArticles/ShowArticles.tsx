import React from "react";

//Components
import ArticlePost from "../ArticlePost/ArticlePost";

//Global state REDUX
import { useSelector } from "react-redux";

//Style
import "./showArticles.scss";

interface Redux {
  articles: {
    id: string;
    title: string;
    description: string;
  }[];
}

const ShowArticles = (): JSX.Element => {
  const articlesRedux = useSelector((state: Redux) => state.articles);

  return (
    <>
      {articlesRedux.map((e) => (
        <div className="articleShowSA" key={e.id}>
          <div className="articlePostShow" key={e.id}>
            <ArticlePost key={e.id} payload={e} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ShowArticles;
