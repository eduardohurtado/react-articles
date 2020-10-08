import React, { useState, useEffect } from "react";

// Global state REDUX
import { connect } from "react-redux";

// Components
import ArticlePost from "../ArticlePost/ArticlePost";

// Style
import "./showArticles.scss";

interface IProps {
  articles: {
    _id: string;
    title: string;
    description: string;
  }[];
}

const ShowArticles: React.FC<IProps> = (props) => {
  const [articlesRedux, updateArticlesRedux] = useState([
    {
      _id: "",
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
        <div className="articleShowSA" key={e._id}>
          <div className="articlePostShow" key={e._id}>
            <ArticlePost key={e._id} payload={e} />
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
