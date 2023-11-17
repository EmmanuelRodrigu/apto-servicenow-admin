import React, { useEffect, useState } from "react";
import { http } from '@providers/http.js';
import notify from '@utils/notify';
import { Bar, Doughnut } from "react-chartjs-2";
import {
    CategoryScale, 
    Chart, 
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

export default function Dashboard() {
    const [labels, setLabels] = useState(null);
    const [dataset, setData] = useState(null);
    const [status, setStatus] = useState(null);
    const [typeRequest, setTypeRequest] = useState(null);

    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement
    )

    const chartRequestForProject = {
        labels: labels,
        datasets: [
            {
                label: 'Solicitudes de soporte',
                backgroundColor: 'rgb(145, 78, 171)',
                borderColor: '#FF0000',
                data: dataset,
            }
        ]
    };

    const chartRequestForStatus = {
        labels: ['Backlog', 'ToDo', 'In Progress', 'Work in Progress', 'Review', 'Done'],
        datasets: [
            {
                label: 'Cantidad',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
                data: status,
            }
        ]
    };

    const chartForTypeRequest = {
        labels: ['Nueva funcionalidad', 'Bug', 'Soporte tecnico'],
        datasets: [
            {
                label: 'Cantidad',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
                data: typeRequest,
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true
    };


    const getData = async () => {
        http.get('api/dashboard')
            .then((response) => {
                setLabels(response.data.map((value) => { return [value.name] }));
                setData(response.data.map((value) => { return [value.requests] }));
                setStatus(response.requestForStatus);
                setTypeRequest(response.requestForType);
            })
            .catch((error) => {
                notify(error, 'error')
            });
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="space-y-20">
            <div>
                <Bar 
                    style={{ height: '18rem' }} 
                    data={chartRequestForProject} 
                    options={options}
                />
            </div>
            <div className="flex flex-cols-2 justify-evenly">
                <div className="">
                    <Doughnut
                        style={{ height: '18rem', width: '18rem' }}
                        data={chartRequestForStatus}
                        options={options}
                    />
                </div>
                <div className="">
                    <Doughnut
                        style={{  }}
                        data={chartForTypeRequest}
                        options={options}
                    />
                </div>
            </div>

        </div>
    )
}