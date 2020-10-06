import React from "react";

//Global state REDUX
import { connect } from "react-redux";

//Components
import ArticleForm from "../ArticleForm/ArticleForm";
import ArticleList from "../ArticleList/ArticleList";
import ShowArticles from "../ShowArticles/ShowArticles";
import Footer from "../Footer/Footer";

//Loading
import ReactLoading from "react-loading";

//Style
import "./homePage.scss";

interface IProps {
  isLoading: boolean;
}

const HomePage: React.FC<IProps> = (props) => {
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
          <div className="containerHPShow__Center">
            {props.isLoading && (
              <>
                <p>Select an Article/Post to display</p>
                <ReactLoading
                  type="bars"
                  // color="#55F"
                  color="#169873"
                  height={"20%"}
                  width={"20%"}
                />
              </>
            )}
          </div>
          <ShowArticles />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: IProps) => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps)(HomePage);
