import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Temperature extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: [],

      TemperatureIdFilter: "",
      TemperatureSummaryFilter: "",
      temperatureWithoutFilter: [],
    };
  }

  FilterFn() {
    var TemperatureIdFilter = this.state.TemperatureIdFilter;
    var TemperatureSummaryFilter = this.state.TemperatureSummaryFilter;

    var filteredData = this.state.temperatureWithoutFilter.filter(function (
      el
    ) {
      return (
        el.TemperatureId.toString()
          .toLowerCase()
          .includes(TemperatureIdFilter.toString().trim().toLowerCase()) &&
        el.Summary.toString()
          .toLowerCase()
          .includes(TemperatureSummaryFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ temperature: filteredData });
  }

  sortResult(prop, asc) {
    var sortedData = this.state.temperatureWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ temperature: sortedData });
  }

  changeTemperatureIdFilter = (e) => {
    this.state.TemperatureIdFilter = e.target.value;
    this.FilterFn();
  };

  changeTemperatureSummaryFilter = (e) => {
    this.state.TemperatureSummaryFilter = e.target.value;
    this.FilterFn();
  };

  refreshList() {
    fetch(variables.API_URL + "temperature")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ temperature: data, temperatureWithoutFilter: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  render() {
    const { temperature } = this.state;

    return (
      <div>
        <table className="table table-strpied">
          <thead>
            <tr>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeTemperatureIdFilter}
                    placeholder="Filter"
                  />
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("TemperatureId", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("TemperatureId", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                TemperatureId
              </th>
              <th>TemperatureC</th>
              <th>TemperatureF</th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeTemperatureSummaryFilter}
                    placeholder="Filter"
                  />
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("Summary", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("Summary", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                Summary
              </th>
            </tr>
          </thead>
          <tbody>
            {temperature.map((temp) => (
              <tr key={temp.TemperatureId}>
                <td>{temp.TemperatureId}</td>
                <td>{temp.TemperatureC}</td>
                <td>{temp.TemperatureF}</td>
                <td>{temp.Summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
