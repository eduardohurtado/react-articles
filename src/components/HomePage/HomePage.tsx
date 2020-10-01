import React from "react";

//Components
import ArticleForm from "../ArticleForm/ArticleForm";
import ArticleList from "../ArticleList/ArticleList";

//Style
import "./homePage.scss";

export default function HomePage() {
  return (
    <div className="gridHomePage">
      <div className="plantBanner"></div>
      <div className="contentHP">
        <div className="containerHP">
          <ArticleForm />
        </div>
        <div className="containerHPArticle">
          <ArticleList />
        </div>
      </div>
    </div>
  );
}
