// import React from "react";
// import ReactDOM from "react-dom";
// import ReactDataGrid from "react-data-grid";

// const columns = [
//   { key: "id", name: "ID", editable: true },
//   { key: "title", name: "Title", editable: true },
//   { key: "complete", name: "Complete", editable: true },
// ];

// const rows = [
//   { id: 0, title: "Task 1", complete: 20 },
//   { id: 1, title: "Task 2", complete: 40 },
//   { id: 2, title: "Task 3", complete: 60 },
// ];

// class GridExample extends React.Component {
//   state = { rows };

//   onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
//     this.setState((state) => {
//       const rows = state.rows.slice();
//       for (let i = fromRow; i <= toRow; i++) {
//         rows[i] = { ...rows[i], ...updated };
//       }
//       return { rows };
//     });
//   };
//   render() {
//     return (
//       <ReactDataGrid
//         columns={columns}
//         rowGetter={(i) => this.state.rows[i]}
//         rowsCount={3}
//         onGridRowsUpdated={this.onGridRowsUpdated}
//         enableCellSelect={true}
//       />
//     );
//   }
// }

// export default GridExample;
// "use strict";

import React, { Component } from "react";
// import { AgGridReact } from "@ag-grid-community/react";
// import { AllModules } from "@ag-grid-enterprise/all-modules";
// //import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
// import "@ag-grid-community/all-modules/dist/styles/ag-theme-alpine-dark.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
//import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

function getRowData() {
  var rowData = [];
  for (var i = 1; i <= 20; i++) {
    rowData.push({
      group: i < 5 ? "A" : "B",
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
      e: (i * 619) % 100,
      f: (i * 571) % 100,
    });
  }
  return rowData;
}

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: "a",
          type: "valueColumn",
        },
        {
          field: "b",
          type: "valueColumn",
        },
        {
          field: "c",
          type: "valueColumn",
        },
        {
          field: "d",
          type: "valueColumn",
        },
        {
          field: "e",
          type: "valueColumn",
        },
        {
          field: "f",
          type: "valueColumn",
        },
        {
          headerName: "Total",
          valueGetter: "data.a + data.b + data.c + data.d + data.e + data.f",
          editable: false,
          aggFunc: "sum",
          cellClass: "total-col",
        },
      ],
      defaultColDef: {
        flex: 1,
        sortable: true,
      },
      columnTypes: {
        valueColumn: {
          editable: true,
          aggFunc: "sum",
          valueParser: "Number(newValue)",
          filter: "agNumberColumnFilter",
        },
      },
      rowData: getRowData(),
      groupDefaultExpanded: 1,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid"
          style={{
            height: "100%",
            width: "100%",
          }}
          className="ag-theme-alpine-dark"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            columnTypes={this.state.columnTypes}
            rowData={this.state.rowData}
            groupDefaultExpanded={this.state.groupDefaultExpanded}
            suppressAggFuncInHeader={true}
            enableCellChangeFlash={true}
            animateRows={true}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

export default GridExample;

// render(<GridExample></GridExample>, document.querySelector('#root'));
