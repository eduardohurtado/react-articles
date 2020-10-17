import React, { useState, useEffect } from "react";

// GraphQL
import { gql, useMutation } from "@apollo/client";

// Global state REDUX
import { connect } from "react-redux";

// Icon
import { ImCheckboxChecked } from "react-icons/im";

// Notification
import { notifyDanger, notifyWarning } from "../Notification/Notification";

// Style
import "./articleForm.scss";

// Mutations
const ADD_ARTICLE = gql`
  mutation createArticle($input: ArticleInput) {
    createArticle(input: $input) {
      _id
    }
  }
`;

interface IProps {
  isSelecting: boolean;
}

const ArticleForm: React.FC<IProps> = (props) => {
  // Local state
  const [iconAuthor, updateIAuthor] = useState(false);
  const [iconTitle, updateITitle] = useState(false);
  const [iconCompose, updateICompose] = useState(false);
  const [articlePost, updateSelection] = useState(true);
  const [nameValue, updateName] = useState("");
  const [lastnameValue, updateLast] = useState("");
  const [titleValue, updateTitle] = useState("");
  const [composeValue, updateCompose] = useState("");
  // GraphQL
  const [createArticle, { error }] = useMutation(ADD_ARTICLE);

  const iconDefault = {
    color: "#555",
  };
  const iconDone = {
    color: "#5d5",
  };

  onsubmit = (e) => {
    e.preventDefault();

    if (!props.isSelecting) {
      let genderForm = "";
      if (
        iconAuthor === false ||
        iconTitle === false ||
        iconCompose === false
      ) {
        notifyDanger("ERROR", "Please fill all form fields", 3000);
      } else {
        const radioSelected = (document.getElementsByName(
          "b-userInfo"
        ) as unknown) as HTMLInputElement[];
        for (let i = 0; i < radioSelected.length; i++) {
          if (radioSelected[i].checked) {
            genderForm = radioSelected[i].value;
          }
        }

        createArticle({
          variables: {
            input: {
              name: nameValue,
              lastName: lastnameValue,
              gender: genderForm,
              title: titleValue,
              description: composeValue,
            },
          },
        });

        updateName("");
        updateLast("");
        updateTitle("");
        updateCompose("");
      }
    } else {
      notifyWarning("Warning", "You can't submit while select articles", 5000);
    }
  };

  useEffect(() => {
    if (error) {
      console.error("ERROR on Article submit:", error);
    }
  }, [error]);

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
      updateTitle("Post");
    } else {
      updateITitle(false);
      if (titleValue === "Post") {
        updateTitle("");
      } else if (titleValue !== "") {
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
            <ImCheckboxChecked style={iconAuthor ? iconDone : iconDefault} />
            <span>
              <b> Author</b>
            </span>
          </div>
          <div className="itemAF">
            <ImCheckboxChecked style={iconTitle ? iconDone : iconDefault} />
            <span>
              <b> Title</b>
            </span>
          </div>
          <div className="itemAF">
            <ImCheckboxChecked style={iconCompose ? iconDone : iconDefault} />
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
                value="Male"
                defaultChecked
              />
              <label htmlFor="b-male"> Male </label>
              <input
                type="radio"
                name="b-userInfo"
                id="b-female"
                value="Female"
              />
              <label htmlFor="b-female"> Female </label>
              <input
                type="radio"
                name="b-userInfo"
                id="b-other"
                value="Other"
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
                <p>
                  <b>Title:</b>
                </p>
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
              <p>
                <b>Compose:</b>
              </p>
              <textarea
                name="compose"
                placeholder="Compose your Article/Post"
                cols={33}
                rows={10}
                maxLength={1000}
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
};

const mapStateToProps = (state: IProps) => {
  return {
    isSelecting: state.isSelecting,
  };
};

export default connect(mapStateToProps)(ArticleForm);
