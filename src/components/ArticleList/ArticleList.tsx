import React from "react";
import DataTable, { createTheme } from "react-data-table-component";

//Global state REDUX
import { connect } from "react-redux";
import { Dispatch } from "redux";

//Notification
import { notifySuccess, notifyDanger } from "../Notification/Notification";

//Styles
import "./articleList.scss";

const data = [
  {
    id: 0,
    title: "Welcome to my App",
    description:
      "I made this App to improve skills and well practices on React togheter with GraphQl and redux global state control, please enjoy.",
  },
  {
    id: 1,
    title: "Welcome to my App",
    description:
      "I made this App to improve skills and well practices on React togheter with GraphQl and redux global state control, please enjoy.",
  },
  {
    id: 2,
    title: "Welcome to my App",
    description:
      "I made this App to improve skills and well practices on React togheter with GraphQl and redux global state control, please enjoy.",
  },
];

const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true,
  },
  {
    name: "Description",
    selector: "description",
    sortable: true,
    // right: true,
  },
];

interface IProps {
  articles: {
    id: number;
    title: string;
    description: string;
  }[];
  addArticleRedux: (payload: IAction) => void;
}

interface IAction {
  id: number;
  title: string;
  description: string;
}

const ArticleList: React.FC<IProps> = (props) => {
  createTheme("solarized", {
    text: {
      primary: "#eee",
      secondary: "#2aa198",
    },
    background: {
      default: "#293241",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#fff",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  });

  const checkIfDisplayed = (id: number): boolean => {
    const articlesId = [];

    for (let i = 0; i < props.articles.length; i++) {
      articlesId[i] = props.articles[i].id;
    }
    return articlesId.every((xId: number) => xId !== id);
  };

  return (
    <div className="articleListContainer">
      <DataTable
        title="Articles / Post"
        columns={columns}
        data={data}
        responsive={true}
        pagination={true}
        highlightOnHover={true}
        striped={true}
        pointerOnHover={true}
        progressPending={undefined}
        theme="solarized"
        onRowClicked={(e) => {
          if (props.articles.length === 0) {
            props.addArticleRedux(e);
            notifySuccess("Done", "Article/Post displayed", 1500);
          } else {
            if (checkIfDisplayed(e.id)) {
              props.addArticleRedux(e);
              notifySuccess("Done", "Article/Post displayed", 1500);
            } else {
              notifyDanger("ERROR", "The article is already displayed", 3000);
            }
          }
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: IProps) => {
  return {
    articles: state.articles,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addArticleRedux: (payload: IAction) =>
      dispatch({ type: "ADD_ARTICLE", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
