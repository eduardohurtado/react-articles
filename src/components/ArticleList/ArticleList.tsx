import React from "react";
import DataTable, { createTheme } from "react-data-table-component";

//Global state REDUX
import { connect } from "react-redux";
import { Dispatch } from "redux";

//Styles
import "./articleList.scss";

const data = [
  { id: 1, title: "Conan the Barbarian", description: "1982" },
  { id: 2, title: "Conan the Barbarian", description: "1982" },
  { id: 3, title: "Conan the Barbarian", description: "1982" },
  { id: 4, title: "Conan the Barbarian", description: "1982" },
  { id: 5, title: "Conan the Barbarian", description: "1982" },
  { id: 6, title: "Conan the Barbarian", description: "1982" },
  { id: 7, title: "Conan the Barbarian", description: "1982" },
  { id: 8, title: "Conan the Barbarian", description: "1982" },
  { id: 9, title: "Conan the Barbarian", description: "1982" },
  { id: 10, title: "Conan the Barbarian", description: "1982" },
  { id: 11, title: "Conan the Barbarian", description: "1982" },
  { id: 12, title: "Conan the Barbarian", description: "1982" },
];
const columns = [
  {
    name: "ID",
    selector: "id",
    sortable: true,
  },
  {
    name: "Title",
    selector: "title",
    sortable: true,
  },
  {
    name: "Year",
    selector: "year",
    sortable: true,
    right: true,
  },
];

interface IProps {
  tasks?: {
    id: number;
    title: string;
    description: string;
    done: boolean;
  };
  addTaskRedux: (payload: IAction) => void;
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
          props.addTaskRedux(e);
        }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addTaskRedux: (payload: IAction) =>
      dispatch({ type: "ADD_ARTICLE", payload }),
  };
};

export default connect(null, mapDispatchToProps)(ArticleList);
