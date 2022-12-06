import React, { Component } from "react";
import { variables } from "./Variables.js";
import axios, * as others from "axios";

export class Humidity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      humidity: [],

      HumidityIdFilter: "",
      HumidityValueFilter: "",
      HumidityWithoutFilter: [],
    };
  }

  FilterFn() {
    var HumidityIdFilter = this.state.HumidityIdFilter;
    var HumidityValueFilter = this.state.HumidityValueFilter;

    var filteredData = this.state.HumidityWithoutFilter.filter(function (el) {
      return (
        el.id
          .toString()
          .toLowerCase()
          .includes(HumidityIdFilter.toString().trim().toLowerCase()) &&
        el.value
          .toString()
          .toLowerCase()
          .includes(HumidityValueFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ humidity: filteredData });
  }

  sortResult(prop, asc) {
    var sortedData = this.state.HumidityWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ humidity: sortedData });
  }

  changeHumidityIdFilter = (e) => {
    this.state.HumidityIdFilter = e.target.value;
    this.FilterFn();
  };

  changeHumidityValueFilter = (e) => {
    this.state.HumidityValueFilter = e.target.value;
    this.FilterFn();
  };

  async refreshList() {
    try {
      const response = await axios.get("api/humidity/");

      this.setState({
        humidity: response.data,
        HumidityWithoutFilter: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.refreshList();
  }

  render() {
    const { humidity } = this.state;

    return (
      <div>
        <table className="table table-strpied">
          <thead>
            <tr>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeHumidityIdFilter}
                    placeholder="Filter"
                  />
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("id", true)}
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
                    onClick={() => this.sortResult("id", false)}
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
                Humidity Id
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeHumidityValueFilter}
                    placeholder="Filter"
                  />
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("value", true)}
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
                    onClick={() => this.sortResult("value", false)}
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
                Humidity Value
              </th>
            </tr>
          </thead>
          <tbody>
            {humidity.map((temp) => (
              <tr key={temp.id}>
                <td>{temp.id}</td>
                <td>{temp.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
