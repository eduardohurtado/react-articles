import React, { useState, useEffect } from "react";

//Global state REDUX
import { connect } from "react-redux";

//Components
import ArticlePost from "../ArticlePost/ArticlePost";

//Style
import "./showArticles.scss";

interface IProps {
  articles: {
    id: number;
    title: string;
    description: string;
  }[];
}

const ShowArticles: React.FC<IProps> = (props) => {
  const [articlesRedux, updateArticlesRedux] = useState([
    {
      id: -1,
      title: "",
      description: "",
    },
  ]);

  useEffect(() => {
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
