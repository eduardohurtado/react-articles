import React from "react";

//Global state REDUX
import { connect } from "react-redux";
import { Dispatch } from "redux";

//Style
import "./articlePost.scss";

interface IProps {
  payload: {
    id: number;
    title: string;
    description: string;
  };
}

interface IAction { //REDUX is to add a button to delete
  id: number;
  title: string;
  description: string;
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addTaskRedux: (payload: IAction) =>
      dispatch({ type: "ADD_ARTICLE", payload }),
  };
};

export default connect(null, mapDispatchToProps)(ArticlePost);
