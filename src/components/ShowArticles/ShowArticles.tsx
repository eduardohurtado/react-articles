import React, { FunctionComponent } from "react";

//Style
import "./showArticles.scss";

interface IProps {
  someProps?: unknown;
}

const ShowArticles: FunctionComponent<IProps> = () => {
  return <div className="articleShow"></div>;
};

export default ShowArticles;
