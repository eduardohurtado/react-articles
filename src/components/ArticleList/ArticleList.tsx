import React, { Component } from "react";
import DataTable from "react-data-table-component";

//Styles
import "./articleList.scss";

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

class MyComponent extends Component {
  render() {
    return (
      <div className="articleListContainer">
        <DataTable title="Arnold Movies" columns={columns} data={data} />
      </div>
    );
  }
}

export default MyComponent;
