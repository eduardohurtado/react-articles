import React, { FunctionComponent } from "react";

//Components
import ArticleForm from "../ArticleForm/ArticleForm";
import ArticleList from "../ArticleList/ArticleList";
import ShowArticles from "../ShowArticles/ShowArticles";

//Style
import "./homePage.scss";

interface IProps {
  someProps?: unknown;
}

const Component: FunctionComponent<IProps> = () => {
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
    </div>
  );
};

export default Component;
