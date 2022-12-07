import React, { Component } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

export class Temperature extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: [],

      TemperatureInstanceFilter: "",
      TemperatureTimeStampFilter: "",
      TemperatureWithoutFilter: [],
    };
  }

  FilterFn() {
    var TemperatureInstanceFilter = this.state.TemperatureInstanceFilter;
    var TemperatureTimeStampFilter = this.state.TemperatureTimeStampFilter;

    var filteredData = this.state.TemperatureWithoutFilter.filter(function (
      el
    ) {
      return (
        el.instance
          .toString()
          .toLowerCase()
          .includes(
            TemperatureInstanceFilter.toString().trim().toLowerCase()
          ) &&
        el.timestamp
          .toString()
          .toLowerCase()
          .includes(TemperatureTimeStampFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ temperature: filteredData });
  }

  sortResult(prop, asc) {
    var sortedData = this.state.TemperatureWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ temperature: sortedData });
  }

  changeTemperatureInstanceFilter = (e) => {
    this.state.TemperatureInstanceFilter = e.target.value;
    this.FilterFn();
  };

  changeTemperatureTimeStampFilter = (e) => {
    this.state.TemperatureTimeStampFilter = e.target.value;
    this.FilterFn();
  };

  async refreshList() {
    try {
      const response = await axios.get("api/temperature/");

      this.setState({
        temperature: response.data,
        TemperatureWithoutFilter: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.refreshList();
  }

  render() {
    const { temperature } = this.state;

    return (
      <div>
        <div>
          <Line
            data={{
              labels: temperature.map((temp) => temp.timestamp),
              datasets: [
                {
                  label: "Temperature Values",
                  data: temperature.map((temp) => temp.value),
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
                    onChange={this.changeTemperatureInstanceFilter}
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
                    onChange={this.changeTemperatureTimeStampFilter}
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
            {temperature.map((temp) => (
              <tr key={temp.id}>
                <td>{temp.id}</td>
                <td>{temp.value}</td>
                <td>{temp.instance}</td>
                <td>{temp.timestamp}</td>
                <td>{temp.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
