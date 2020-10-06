import React, { useState, useEffect } from "react";

//Components
import ArticlePost from "../ArticlePost/ArticlePost";

//Global state REDUX
import { connect } from "react-redux";

//Style
import "./showArticles.scss";

interface IProps {
  articles: {
    id: number;
    title: string;
    description: string;
  }[];
}

const ShowArticles = (props: IProps): JSX.Element => {
  const [articlesRedux, updateArticlesRedux] = useState([
    {
      id: -1,
      title: "",
      description: "",
    },
  ]);

  useEffect(() => {
    console.log("articles on props:");
    console.log(props.articles);
    updateArticlesRedux([...props.articles]);
  }, [props.articles]);

  return (
    <>
      {articlesRedux.map((e) => (
        <div className="articleShowSA" key={e.id}>
          <div className="articlePostShow" key={e.id}>
            <ArticlePost key={e.id} payload={e} />
          </div>
        </div>
      ))}
      {() => {
        console.log("Render prop articles:");
        console.log(props.articles);
      }}
    </>
  );
};

const mapStateToProps = (state: IProps) => {
  return {
    articles: state.articles,
  };
};

export default connect(mapStateToProps)(ShowArticles);
