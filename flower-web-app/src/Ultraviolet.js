import React, { Component } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Legend);

export class Ultraviolet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ultraviolets: [],

      UltravioletInstanceFilter: "",
      UltravioletTimeStampFilter: "",
      UltravioletWithoutFilter: [],
    };
  }

  FilterFn() {
    var UltravioletInstanceFilter = this.state.UltravioletInstanceFilter;
    var UltravioletTimeStampFilter = this.state.UltravioletTimeStampFilter;

    var filteredData = this.state.UltravioletWithoutFilter.filter(function (
      el
    ) {
      return (
        el.instance
          .toString()
          .toLowerCase()
          .includes(
            UltravioletInstanceFilter.toString().trim().toLowerCase()
          ) &&
        el.timestamp
          .toString()
          .toLowerCase()
          .includes(UltravioletTimeStampFilter.toString().trim().toLowerCase())
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

  changeUltravioletInstanceFilter = (e) => {
    this.state.UltravioletInstanceFilter = e.target.value;
    this.FilterFn();
  };

  changeUltravioletTimeStampFilter = (e) => {
    this.state.UltravioletTimeStampFilter = e.target.value;
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
        <div>
          <Line
            data={{
              labels: ultraviolets.map((uv) => uv.timestamp),
              datasets: [
                {
                  label: "Ultraviolet Values",
                  data: ultraviolets.map((uv) => uv.value),
                  backgroundColor: "rgb(156, 211, 100)",
                  borderColor: "rgb(156, 211, 100)",
                  borderWidth: 1,
                },
              ],
            }}
            height={400}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Values",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Time Stamp",
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    color: "black",
                  },
                },
              },
            }}
          />
        </div>
        <table className="table table-strpied">
          <thead>
            <tr>
              <th>Id</th>
              <th>Value</th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeUltravioletInstanceFilter}
                    placeholder="Filter"
                  />
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("instance", true)}
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
                    onClick={() => this.sortResult("instance", false)}
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
                Instance
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeUltravioletTimeStampFilter}
                    placeholder="Filter"
                  />
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("timestamp", true)}
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
                    onClick={() => this.sortResult("timestamp", false)}
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
                Time Stamp
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ultraviolets.map((uv) => (
              <tr key={uv.id}>
                <td>{uv.id}</td>
                <td>{uv.value}</td>
                <td>{uv.instance}</td>
                <td>{uv.timestamp}</td>
                <td>{uv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
