import React, { FC } from "react";

import "./articlePost.scss";

interface IProps {
  someProps?: unknown;
}

const ArticlePost: FC<IProps> = () => {
  return (
    <div className="containerAPF">
      <div className="headerAP">
        <span className="headerAP__Title">TITLE</span>
      </div>
      <div className="bodyAP">DESCRIPTION</div>
    </div>
  );
};

export default ArticlePost;
