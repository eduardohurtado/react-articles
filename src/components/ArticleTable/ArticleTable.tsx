import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";

// GraphQL
import { gql, useQuery } from "@apollo/client";

// Global state REDUX
import { connect } from "react-redux";
import { Dispatch } from "redux";

// Notification
import { notifySuccess, notifyDanger } from "../Notification/Notification";

// Styles
import "./articleTable.scss";

// Queries/Mutations
const GET_ARTICLES = gql`
  query {
    articles {
      _id
      name
      lastName
      gender
      title
      description
    }
  }
`;

const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true,
  },
  {
    name: "Name",
    selector: "name",
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
    _id: string;
    name: string;
    lastName: string;
    gender: string;
    title: string;
    description: string;
  }[];
  addArticleRedux: (payload: IAction) => void;
}

interface IAction {
  _id: string;
  name: string;
  lastName: string;
  gender: string;
  title: string;
  description: string;
}

const ArticleTable: React.FC<IProps> = (props) => {
  // Local state
  const [loadingTable, changeLoadingTable] = useState(true);
  const [dataTable, changeDataTable] = useState([]);
  // GraphQL
  const { loading, error, data } = useQuery(GET_ARTICLES);

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    if (loading) {
      changeLoadingTable(false);
    } else {
      changeLoadingTable(true);
    }
    if (data) {
      console.log(data.articles);
      changeDataTable(data.articles);
      changeLoadingTable(false);
    }
  }, [data, loading]);

  createTheme("solarized", {
    text: {
      primary: "#eee",
      secondary: "#2aa198",
    },
    background: {
      default: "#295241",
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

  const checkIfDisplayed = (id: string): boolean => {
    const articlesId = [];

    for (let i = 0; i < props.articles.length; i++) {
      articlesId[i] = props.articles[i]._id;
    }
    return articlesId.every((arrayId: string) => arrayId !== id);
  };

  return (
    <div className="articleListContainer">
      <DataTable
        title="Articles / Post"
        columns={columns}
        data={dataTable}
        responsive={true}
        pagination={true}
        highlightOnHover={true}
        striped={true}
        pointerOnHover={true}
        progressPending={loadingTable}
        theme="solarized"
        onRowClicked={(e: IAction) => {
          if (props.articles.length === 0) {
            props.addArticleRedux(e);
            notifySuccess("Done", "Article/Post displayed", 1500);
          } else {
            if (checkIfDisplayed(e._id)) {
              props.addArticleRedux(e);
              notifySuccess("Done", "Article/Post displayed", 1500);
            } else {
              notifyDanger(
                "ERROR",
                "The article/post is already displayed",
                3000
              );
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleTable);
