import React from "react";

//Style
import "./articlePost.scss";

interface IProps {
  payload: {
    id: number;
    title: string;
    description: string;
  };
}

const ArticlePost: React.FC<IProps> = (props) => {
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
