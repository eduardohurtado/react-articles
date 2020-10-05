import React from "react";

//Style
import "./articlePost.scss";

interface IProps {
  payload: {
    id: string;
    title: string;
    description: string;
  };
}

const ArticlePost = (props: IProps): JSX.Element => {
  return (
    <div className="containerAPF">
      <div className="headerAP">
        <span className="headerAP__Title">{props.payload.title}</span>
      </div>
      <div className="bodyAP">
        <p>{props.payload.description}</p>
      </div>
    </div>
  );
};

export default ArticlePost;
