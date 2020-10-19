import React, { useState, useEffect, useCallback, useMemo } from "react";
import DataTable, { createTheme } from "react-data-table-component";

// GraphQL
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";

// Global state REDUX
import { connect } from "react-redux";
import { Dispatch } from "redux";

// Notification
import {
  notifySuccess,
  notifyWarning,
  notifyDanger,
} from "../Notification/Notification";

// Theme
import "./articleTable.scss";

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
const DELETE_ARTICLE = gql`
  mutation deleteArticle($_id: ID) {
    deleteArticle(_id: $_id) {
      _id
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
  // State
  const [loadingTable, changeLoadingTable] = useState(true);
  const [dataTable, changeDataTable] = useState([]);
  const [clearSelectedRows, changeClearSelectedRows] = useState(false);
  const [selectedRows, setSelectedRows] = useState([
    {
      _id: "",
      title: "",
    },
  ]);

  // GraphQL
  const { error, data, refetch } = useQuery(GET_ARTICLES);
  const [deleteArticle, { error: errorD, data: dataD }] = useMutation(
    DELETE_ARTICLE
  );
  const { error: errorS, data: dataS } = useSubscription(SUBSCRIBE_ARTICLES);

  useEffect(() => {
    props.changeSelectingRedux({ isSelecting: false });
  }, []);

  useEffect(() => {
    if (dataD) {
      refetch();
    }
  }, [dataD]);

  useEffect(() => {
    if (error) {
      console.error("GET Table ERROR:", error.message);
    } else if (errorS) {
      console.error("SUBSCRIBE Table ERROR:", errorS.message);
    } else if (errorD) {
      console.error("DELETE Table ERROR:", errorD.message);
    }
  }, [error, errorS, errorD]);

  useEffect(() => {
    if (data) {
      if (data.articles.length === 0) {
        notifyWarning("Warning", "There's not data on MongoDB.", 5000);
        changeLoadingTable(false);
        changeDataTable(data.articles);
      } else {
        changeDataTable(data.articles);
        changeLoadingTable(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (dataS) {
      refetch();
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
        const idCatch = [];
        for (let i = 0; i < selectedRows.length; i++) {
          idCatch[i] = selectedRows[i]._id;
        }

        for (let i = 0; i < idCatch.length; i++) {
          deleteArticle({
            variables: {
              _id: idCatch[i],
            },
          });
        }

        changeClearSelectedRows(!clearSelectedRows);
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
        clearSelectedRows={clearSelectedRows}
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
