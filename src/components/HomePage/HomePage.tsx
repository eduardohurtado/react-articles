import React from "react";

//Components
import ArticleForm from "../ArticleForm/ArticleForm";
import ArticleList from "../ArticleList/ArticleList";

//Style
import "./homePage.scss";

export default function HomePage() {
  return (
    <div className="gridHomePage">
     
        <div className="container1">
        <ArticleForm />
        </div>
        <div className="container1">
        <ArticleList />
        </div>
    </div>
  );
}
