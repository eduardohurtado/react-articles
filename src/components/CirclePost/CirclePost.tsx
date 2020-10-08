import React from "react";

// Icon
import { GrNotes } from "react-icons/gr";

// Style
import "./circlePost.scss";

interface IProps {
  post: {
    amount: number;
    title: string;
    icon: string;
    color: string;
  };
}

const CirclePost: React.FC<IProps> = (props) => {
  const postStyle = {
    border: `5px solid ${props.post.color}`,
  };

  return (
    <div className="container" style={postStyle}>
      <div className="content">
        <span>
          {}
          <b>{props.post.amount}</b>
        </span>
        <br />
        <span>{props.post.title}</span>
        <br />

        <GrNotes />
      </div>
    </div>
  );
};

export default CirclePost;
