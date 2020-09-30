import React, { Component } from "react";
//Styles
import "./articleList.scss";

import DataTable from "react-data-table-component";

const data = [
  { id: 1, title: "Conan the Barbarian", year: "1982" },
  { id: 2, title: "Conan the Barbarian", year: "1982" },
  { id: 3, title: "Conan the Barbarian", year: "1982" },
  { id: 4, title: "Conan the Barbarian", year: "1982" },
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

class MyComponent extends Component {
  render() {
    return (
      <div className="articleList">
        <div className="articleListContainer">
          <DataTable title="Arnold Movies" columns={columns} data={data} />
        </div>
      </div>
    );
  }
}

export default MyComponent;
// export default function ArticleList() {
//   return <div className="articleList"></div>;
// }
