import React from 'react'
import { Line } from "react-chartjs-2";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Bar } from "react-chartjs-2";


class DashboardFreelance extends React.Component {
    state = {
        dataLine: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              lineTension: 0.3,
              backgroundColor: "rgba(225, 204,230, .3)",
              borderColor: "rgb(205, 130, 158)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(205, 130,1 58)",
              pointBackgroundColor: "rgb(255, 255, 255)",
              pointBorderWidth: 10,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0, 0, 0)",
              pointHoverBorderColor: "rgba(220, 220, 220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
              label: "My Second dataset",
              fill: true,
              lineTension: 0.3,
              backgroundColor: "rgba(184, 185, 210, .3)",
              borderColor: "rgb(35, 26, 136)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(35, 26, 136)",
              pointBackgroundColor: "rgb(255, 255, 255)",
              pointBorderWidth: 10,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0, 0, 0)",
              pointHoverBorderColor: "rgba(220, 220, 220, 1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [28, 48, 40, 19, 86, 27, 90]
            }
          ]
        },
        dataBar: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
              {
                label: "% of Votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  "rgba(255, 134,159,0.4)",
                  "rgba(98,  182, 239,0.4)",
                  "rgba(255, 218, 128,0.4)",
                  "rgba(113, 205, 205,0.4)",
                  "rgba(170, 128, 252,0.4)",
                  "rgba(255, 177, 101,0.4)"
                ],
                borderWidth: 2,
                borderColor: [
                  "rgba(255, 134, 159, 1)",
                  "rgba(98,  182, 239, 1)",
                  "rgba(255, 218, 128, 1)",
                  "rgba(113, 205, 205, 1)",
                  "rgba(170, 128, 252, 1)",
                  "rgba(255, 177, 101, 1)"
                ]
              }
            ]
          },
          barChartOptions: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              xAxes: [
                {
                  barPercentage: 1,
                  gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)"
                  }
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)"
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
      };

    render() {
        return (
            <MDBContainer className="mt-5">
            <h1 className="mt-5">Dashboard Freelance</h1>
            <MDBRow className="mt-5">
            <MDBCol>
            <h3>Evolution du chiffre d'affaire</h3>
            <Line data={this.state.dataLine} options={{ responsive: true }} />
            </MDBCol>
            <MDBCol>
            <h3>Nombre de missions accépté</h3>
            <Line data={this.state.dataLine} options={{ responsive: true }} />
            </MDBCol>
            </MDBRow>
            <MDBRow className="mt-5">
            <MDBCol>
            <h3>Etat de la mission</h3>
            <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
            </MDBCol>
            <MDBCol>
            <h3>Retour voyageur</h3>
            <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
            </MDBCol>
            </MDBRow>
          </MDBContainer>
        )
    }
}

export default DashboardFreelance