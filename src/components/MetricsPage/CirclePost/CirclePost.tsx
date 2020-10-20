import React, { useState, useEffect } from "react";

// Icon
import { GrNotes } from "react-icons/gr";
import { BsPencilSquare } from "react-icons/bs";
import { ImBooks } from "react-icons/im";

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
  // State
  const [icon1, changeIcon1] = useState(false);
  const [icon2, changeIcon2] = useState(false);
  const [icon3, changeIcon3] = useState(false);

  const postStyle = {
    border: `5px solid ${props.post.color}`,
  };

  useEffect(() => {
    if (props.post.icon === "icon1") changeIcon1(true);
    if (props.post.icon === "icon2") changeIcon2(true);
    if (props.post.icon === "icon3") changeIcon3(true);
  }, []);

  return (
    <div className="container" style={postStyle}>
      <div className="content">
        <span>
          <b>{props.post.amount}</b>
        </span>
        <br />
        <span>{props.post.title}</span>
        <br />
        {icon1 && <GrNotes />}
        {icon2 && <BsPencilSquare />}
        {icon3 && <ImBooks />}
      </div>
    </div>
  );
};

export default CirclePost;
