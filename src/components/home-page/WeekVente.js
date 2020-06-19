import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';


class WeekVente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                datasets: [
                    {
                        label: 'Montant en TND',
                        data: [
                            54544,
                            12121,
                            53633,
                            66555,
                            64545,
                            22222,
                            54544,

                        ],
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.2)',

                        ]
                    }
                ]
            }
        }
    }
    render() {
        return (
            <div className="chart">
                <Line
                    data={this.state.chartData}
                    //   width={'100%'}
                    height={'250px'}
                    options={{
                        maintainAspectRatio: false
                    }}
                />

            </div>
        );
    }
}

export default WeekVente;