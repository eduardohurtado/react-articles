import React, { FunctionComponent } from "react";
import DataTable from "react-data-table-component";

//Global state REDUX
import { useSelector } from "react-redux";

//Styles
import "./articleList.scss";

interface IProps {
  someProps?: unknown;
}

const data = [
  { id: 1, title: "Conan the Barbarian", year: "1982" },
  { id: 2, title: "Conan the Barbarian", year: "1982" },
  { id: 3, title: "Conan the Barbarian", year: "1982" },
  { id: 4, title: "Conan the Barbarian", year: "1982" },
  { id: 5, title: "Conan the Barbarian", year: "1982" },
  { id: 6, title: "Conan the Barbarian", year: "1982" },
  { id: 7, title: "Conan the Barbarian", year: "1982" },
  { id: 8, title: "Conan the Barbarian", year: "1982" },
  { id: 9, title: "Conan the Barbarian", year: "1982" },
  { id: 10, title: "Conan the Barbarian", year: "1982" },
  { id: 11, title: "Conan the Barbarian", year: "1982" },
  { id: 12, title: "Conan the Barbarian", year: "1982" },
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

const ArticleList: FunctionComponent<IProps> = () => {
  const testingRedux = useSelector((state) => state);

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
        onRowClicked={(e) => {
          console.log(e);
          {
            console.log(testingRedux);
          }
        }}
      />
    </div>
  );
};

export default ArticleList;
