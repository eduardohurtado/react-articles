import React from "react";

//Components
import ArticleForm from "../ArticleForm/ArticleForm";
import ArticleList from "../ArticleList/ArticleList";
import ShowArticles from "../ShowArticles/ShowArticles";
import Footer from "../Footer/Footer";

//Style
import "./homePage.scss";

const Component = (): JSX.Element => {
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
        <div className="lineTop"></div>
        <div className="containerHPShow">
          <ShowArticles />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Component;
