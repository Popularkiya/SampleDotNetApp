import React, { Component } from "react";
import { variables } from "./Variables.js";
import axios, * as others from "axios";

export class Ultraviolet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ultraviolets: [],

      UltravioletIdFilter: "",
      UltravioletValueFilter: "",
      UltravioletWithoutFilter: [],
    };
  }

  FilterFn() {
    var UltravioletIdFilter = this.state.UltravioletIdFilter;
    var UltravioletValueFilter = this.state.UltravioletValueFilter;

    var filteredData = this.state.UltravioletWithoutFilter.filter(function (
      el
    ) {
      return (
        el.id
          .toString()
          .toLowerCase()
          .includes(UltravioletIdFilter.toString().trim().toLowerCase()) &&
        el.value
          .toString()
          .toLowerCase()
          .includes(UltravioletValueFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ ultraviolets: filteredData });
  }

  sortResult(prop, asc) {
    var sortedData = this.state.UltravioletWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ ultraviolets: sortedData });
  }

  changeUltravioletIdFilter = (e) => {
    this.state.UltravioletIdFilter = e.target.value;
    this.FilterFn();
  };

  changeUltravioletValueFilter = (e) => {
    this.state.UltravioletValueFilter = e.target.value;
    this.FilterFn();
  };

  async refreshList() {
    try {
      const response = await axios.get("api/ultraviolet/");

      this.setState({
        ultraviolets: response.data,
        UltravioletWithoutFilter: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    this.refreshList();
  }

  render() {
    const { ultraviolets } = this.state;

    return (
      <div>
        <table className="table table-strpied">
          <thead>
            <tr>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeUltravioletIdFilter}
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
                Ultraviolet Id
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeUltravioletValueFilter}
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
                Ultraviolet Value
              </th>
            </tr>
          </thead>
          <tbody>
            {ultraviolets.map((uv) => (
              <tr key={uv.id}>
                <td>{uv.id}</td>
                <td>{uv.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
