import React from "react";
import { GrNotes } from "react-icons/gr";

//Style
import "./circlePost.scss";

//Interfaces
interface IProps {
  post: {
    amount: number;
    title: string;
    icon: string;
    color: string;
  };
}

function CirclePost(props: IProps) {
  const postStyle = {
    border: `5px solid ${props.post.color.toString()}`,
  };

  return (
    <div className="container" style={postStyle}>
      <div className="content">
        <span>
          <b>{props.post.amount}</b>
        </span>
        <br />
        <span>{props.post.title}</span>
        <br />

        <GrNotes />
      </div>
    </div>
  );
}

export default CirclePost;
