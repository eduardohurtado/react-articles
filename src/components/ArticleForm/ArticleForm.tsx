import React from "react";

//Style
import "./articleForm.scss";

export default function ArticleForm() {
  return (
    <div className="containerAF">
      <div className="formAF">
        <div className="formAF__header">
          <div className="itemAF1">
            <span>
              <b> Author</b>
            </span>
          </div>
          <div className="itemAF2">
            <span>
              <b>Title</b>
            </span>
          </div>
          <div className="itemAF3">
            <span>
              <b>Compose</b>
            </span>
          </div>
        </div>
        <div className="formAFContent">
          <div className="formAFContent__center">
            <div className="userInfo">
              <p>Name:</p>
              <input type="text" placeholder="Your name" maxLength={10} size={12}></input>
            </div>
            <div className="userInfo">
              <p>Lastname:</p>
              <input type="text" placeholder="Your lastname" maxLength={10} size={12}></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
