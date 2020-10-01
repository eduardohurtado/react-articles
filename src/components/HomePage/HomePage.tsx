import React from "react";

//Components
import ArticleForm from "../ArticleForm/ArticleForm";
import ArticleList from "../ArticleList/ArticleList";

//Style
import "./homePage.scss";

export default function HomePage() {
  return (
    <div className="gridHomePage">
      <div className="containerHP">
        <ArticleForm />
      </div>
      <div className="containerHP">
        <ArticleList />
      </div>
    </div>
  );
}
