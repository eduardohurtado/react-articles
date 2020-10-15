import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";

// GraphQL
import { gql, useQuery, useSubscription } from "@apollo/client";

// Global state REDUX
import { connect } from "react-redux";
import { Dispatch } from "redux";

// Notification
import { notifySuccess, notifyDanger } from "../Notification/Notification";

// Queries/Mutations/Subscriptions
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
const SUBSCRIBE_ARTICLES = gql`
  subscription {
    articleSent {
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
    width: "130px",
  },
  {
    name: "Name",
    selector: "name",
    sortable: true,
    width: "150px",
  },
  {
    name: "Description",
    selector: "description",
    sortable: true,
    width: "250px",
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
  addArticleRedux: (payload: ITable) => void;
}

interface ITable {
  _id: string;
  name: string;
  lastName: string;
  gender: string;
  title: string;
  description: string;
}

const ArticleTable: React.FC<IProps> = (props) => {
  // Local state
  const [loadingTable, changeLoadingTable] = useState(false); //true!
  const [dataTable, changeDataTable] = useState([
    {
      _id: "",
      name: "lolol",
      lastName: "",
      gender: "",
      title: "titleLOL",
      description: "descriptionLOL",
    },
  ]);
  // GraphQL
  const { loading, error, data } = useQuery(GET_ARTICLES);
  const { error: errorS, data: dataS } = useSubscription(SUBSCRIBE_ARTICLES);

  useEffect(() => {
    if (error) {
      console.error("GET: Table ERROR.", error);
    } else if (errorS) {
      console.error("SUBSCRIBE: Table ERROR.", errorS);
    }
  }, [error, errorS]);

  useEffect(() => {
    if (loading) {
      changeLoadingTable(false);
    } else {
      changeLoadingTable(true);
    }
    if (data) {
      console.log("Data from MongoDB:", data);
      // changeDataTable(data.articles);
      changeLoadingTable(false);
    }
  }, [data, loading]);

  useEffect(() => {
    if (dataS) {
      console.warn("Article added to MongoDB:", dataS);
      // const currentDataTable = dataTable;
      const subscriptionObject: ITable = {
        _id: dataS.articleSent._id,
        name: dataS.articleSent.name,
        lastName: dataS.articleSent.lastName,
        gender: dataS.articleSent.gender,
        title: dataS.articleSent.title,
        description: dataS.articleSent.description,
      };
      // currentDataTable.push(subscriptionObject as never);
      changeDataTable([...dataTable, subscriptionObject]);
      console.warn("Table after changes:", dataTable);
    }
  }, [dataS]);

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
        onRowClicked={(e: ITable) => {
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
    addArticleRedux: (payload: ITable) =>
      dispatch({ type: "ADD_ARTICLE", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleTable);
