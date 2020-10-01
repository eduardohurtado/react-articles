import React, { useState, useEffect } from "react";
// import $ from "jquery";

//Icon
import { SiCheckmarx } from "react-icons/si";

//Style
import "./articleForm.scss";

export default function ArticleForm() {
  const [iconAuthor, updateIAuthor] = useState(false);
  const [iconTitle, updateITitle] = useState(false);
  const [iconCompose, updateICompose] = useState(false);
  const [articlePost, updateSelection] = useState(true);
  const [nameValue, updateName] = useState("");
  const [lastnameValue, updateLast] = useState("");
  const [titleValue, updateTitle] = useState("");
  const [composeValue, updateCompose] = useState("");

  const iconDefault = {
    color: "#555",
  };
  const iconDone = {
    color: "#5d5",
  };

  onsubmit = (e) => {
    e.preventDefault();
    console.log(nameValue);
  };

  useEffect(() => {
    if (nameValue === "" || lastnameValue === "") {
      updateIAuthor(false);
    } else {
      updateIAuthor(true);
    }
  }, [nameValue, lastnameValue]);

  useEffect(() => {
    if (articlePost === false) {
      updateITitle(true);
    } else {
      updateITitle(false);
      if (titleValue !== "") {
        updateITitle(true);
      } else {
        updateITitle(false);
      }
    }
  }, [articlePost, titleValue]);

  useEffect(() => {
    if (composeValue === "") {
      updateICompose(false);
    } else {
      updateICompose(true);
    }
  }, [composeValue]);

  return (
    <div className="formAF">
      <form>
        <div className="formAF__header">
          <div className="itemAF">
            <SiCheckmarx style={iconAuthor ? iconDone : iconDefault} />
            <span>
              <b> Author</b>
            </span>
          </div>
          <div className="itemAF">
            <SiCheckmarx style={iconTitle ? iconDone : iconDefault} />
            <span>
              <b> Title</b>
            </span>
          </div>
          <div className="itemAF">
            <SiCheckmarx style={iconCompose ? iconDone : iconDefault} />
            <span>
              <b> Compose</b>
            </span>
          </div>
        </div>
        <div className="formAFContent">
          <div className="formAFContent__center">
            <div className="userInfoName">
              <p>
                <b>Name:</b>
              </p>
              <input
                type="text"
                placeholder="Your name"
                maxLength={10}
                size={12}
                value={nameValue}
                onChange={(e) => {
                  updateName(e.target.value);
                }}
              ></input>
            </div>

            <div className="userInfoName">
              <p>
                <b>Lastname:</b>
              </p>
              <input
                type="text"
                placeholder="Your lastname"
                maxLength={10}
                size={12}
                value={lastnameValue}
                onChange={(e) => {
                  updateLast(e.target.value);
                }}
              ></input>
            </div>
          </div>

          <div className="formAFContent__center">
            <div className="userInfoGender">
              <span>
                <b>Gender: </b>
              </span>
              <input
                type="radio"
                name="b-userInfo"
                id="b-male"
                value="b-male"
                defaultChecked
              />
              <label htmlFor="b-male"> Male </label>
              <input
                type="radio"
                name="b-userInfo"
                id="b-female"
                value="b-female"
              />
              <label htmlFor="b-female"> Female </label>
              <input
                type="radio"
                name="b-userInfo"
                id="b-other"
                value="b-other"
              />
              <label htmlFor="b-other"> Other </label>
            </div>
          </div>

          <div className="formAFContent__center">
            <div className="userInfo">
              <span>
                <b>Type of compose: </b>
              </span>
              <select
                onChange={(e) => {
                  if (e.target.value === "article") {
                    updateSelection(true);
                  } else {
                    updateSelection(false);
                  }
                }}
              >
                <option value="article">Article</option>
                <option value="post">Post</option>
              </select>
            </div>
          </div>

          {articlePost && (
            <div className="formAFContent__center">
              <div className="userInfo">
                <p>Title:</p>
                <input
                  type="text"
                  name="title"
                  placeholder="Write title"
                  maxLength={20}
                  size={25}
                  value={titleValue}
                  onChange={(e) => {
                    updateTitle(e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          <div className="formAFContent__center">
            <div className="userInfo">
              <p>Compose:</p>
              <textarea
                name="compose"
                placeholder="Compose your Article/Post"
                cols={33}
                rows={10}
                maxLength={400}
                style={{ resize: "none" }}
                value={composeValue}
                onChange={(e) => {
                  updateCompose(e.target.value);
                }}
              ></textarea>
            </div>
          </div>

          <div className="formAFContent__center">
            <button type="submit" className="buttonSubmit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
