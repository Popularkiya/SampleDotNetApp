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
import { CSVLink } from "react-csv";
import { Button } from "react-bootstrap";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

export class Humidity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      humidity: [],

      HumidityInstanceFilter: "",
      HumidityTimeStampFilter: "",
      HumidityWithoutFilter: [],
    };
  }

  FilterFn() {
    var HumidityInstanceFilter = this.state.HumidityInstanceFilter;
    var HumidityTimeStampFilter = this.state.HumidityTimeStampFilter;

    var filteredData = this.state.HumidityWithoutFilter.filter(function (el) {
      return (
        el.instance
          .toString()
          .toLowerCase()
          .includes(HumidityInstanceFilter.toString().trim().toLowerCase()) &&
        el.timestamp
          .toString()
          .toLowerCase()
          .includes(HumidityTimeStampFilter.toString().trim().toLowerCase())
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

  changeHumidityInstanceFilter = (e) => {
    this.state.HumidityInstanceFilter = e.target.value;
    this.FilterFn();
  };

  changeHumidityTimeStampFilter = (e) => {
    this.state.HumidityTimeStampFilter = e.target.value;
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

  exportData() {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(this.state.humidity)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "HumidityReport.json";

    link.click();
  }

  render() {
    const { humidity } = this.state;

    return (
      <div>
        <div>
          <Line
            data={{
              labels: humidity.map((hum) => hum.timestamp),
              datasets: [
                {
                  label: "Humidity Values",
                  data: humidity.map((hum) => hum.value),
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
        <div>
          <Button
            variant="primary"
            onClick={() => this.exportData()}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            Export data to JSON
          </Button>
          <CSVLink
            {...{
              filename: "HumidityReport.csv",
              headers: [
                { label: "Id", key: "id" },
                { label: "Value", key: "value" },
                { label: "Instance", key: "instance" },
                { label: "Time Stamp", key: "timestamp" },
                { label: "Status", key: "status" },
              ],
              data: humidity,
            }}
          >
            <Button
              variant="primary"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
              }}
            >
              Export data to CSV
            </Button>
          </CSVLink>
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
                    onChange={this.changeHumidityInstanceFilter}
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
                    onChange={this.changeHumidityTimeStampFilter}
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
            {humidity.map((hum) => (
              <tr key={hum.id}>
                <td>{hum.id}</td>
                <td>{hum.value}</td>
                <td>{hum.instance}</td>
                <td>{hum.timestamp}</td>
                <td>{hum.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
