import React, { useState, useEffect, useCallback, useMemo } from "react";
import DataTable, { createTheme } from "react-data-table-component";

// GraphQL
import { gql, useQuery, useSubscription } from "@apollo/client";

// Global state REDUX
import { connect } from "react-redux";
import { Dispatch } from "redux";

// Notification
import {
  notifySuccess,
  notifyWarning,
  notifyDanger,
} from "../Notification/Notification";

// Queries/Subscriptions
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

// Theme
import "./articleTable.scss";

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
    width: "95px",
    sortable: true,
    right: true,
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
  changeSelectingRedux: (payload: ISelecting) => void;
}

interface ITable {
  _id: string;
  name: string;
  lastName: string;
  gender: string;
  title: string;
  description: string;
}

interface ITableActions {
  title: string;
}

interface ISelecting {
  isSelecting: boolean;
}

const ArticleTable: React.FC<IProps> = (props) => {
  // Local state
  const [loadingTable, changeLoadingTable] = useState(true);
  const [dataTable, changeDataTable] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // GraphQL
  const { error, data } = useQuery(GET_ARTICLES);
  const { error: errorS, data: dataS } = useSubscription(SUBSCRIBE_ARTICLES);

  useEffect(() => {
    if (error) {
      console.error("GET: Table ERROR.", error);
    } else if (errorS) {
      console.error("SUBSCRIBE: Table ERROR.", errorS);
    }
  }, [error, errorS]);

  useEffect(() => {
    if (data) {
      if (data.articles.length === 0) {
        console.warn("There's not data on MongoDB");
        notifyWarning("Warning", "There's not data on MongoDB.", 5000);
        changeLoadingTable(false);
      } else {
        console.log("Data from MongoDB:", data);
        changeDataTable(data.articles);
        changeLoadingTable(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (dataS) {
      const subscriptionObject: ITable = {
        _id: dataS.articleSent._id,
        name: dataS.articleSent.name,
        lastName: dataS.articleSent.lastName,
        gender: dataS.articleSent.gender,
        title: dataS.articleSent.title,
        description: dataS.articleSent.description,
      };
      changeDataTable([...dataTable, subscriptionObject as never]);
    }
  }, [dataS]);

  createTheme("solarized", {
    text: {
      primary: "#eee",
      secondary: "#eee",
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

  const handleRowClicked = (e: ITable) => {
    if (props.articles.length === 0) {
      props.addArticleRedux(e);
      notifySuccess("Done", "Article/Post displayed", 1500);
    } else {
      if (checkIfDisplayed(e._id)) {
        props.addArticleRedux(e);
        notifySuccess("Done", "Article/Post displayed", 1500);
      } else {
        notifyDanger("ERROR", "The article/post is already displayed", 3000);
      }
    }
  };

  const handleRowSelected = useCallback((e) => {
    setSelectedRows(e.selectedRows);
    if (e.selectedCount > 0) {
      props.changeSelectingRedux({ isSelecting: true });
    } else {
      props.changeSelectingRedux({ isSelecting: false });
    }
  }, []);

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (e: ITableActions) => e.title
          )}?`
        )
      ) {
        console.warn(
          `Youre deleted:\r ${selectedRows.map((e: ITableActions) => e.title)}`
        );
      }
    };

    return (
      <button className="button" key="delete" onClick={handleDelete}>
        Delete
      </button>
    );
  }, [data, selectedRows]);

  return (
    <div>
      <DataTable
        title="Articles / Post"
        columns={columns}
        data={dataTable}
        responsive={true}
        pagination={true}
        highlightOnHover={true}
        striped={true}
        selectableRows={true}
        selectableRowsVisibleOnly={true}
        pointerOnHover={true}
        progressPending={loadingTable}
        theme="solarized"
        onRowClicked={handleRowClicked}
        onSelectedRowsChange={handleRowSelected}
        contextActions={contextActions}
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

    changeSelectingRedux: (payload: ISelecting) =>
      dispatch({ type: "TABLE_SELECTING", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleTable);
