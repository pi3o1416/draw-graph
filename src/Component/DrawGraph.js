
import React, {useState, useEffect} from 'react'
import {BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import moment from 'moment'


export function DrawGraph(props) {

    const dataset = props.dataset
    const [plotData, setPlotData] = useState(dataset)

    const branchSales = (df, x, y) => {
        df = df.select(x, y)
        let branches = [].concat(...df.unique(x).toArray())
        let data = []
        for (let branch of branches) {
            let total_sales = [].concat(...df.filter(row => row.get(x) === branch).select(y).toArray())
            data.push({
                name: branch,
                total_sale: total_sales.reduce((a, b) => {return a + b})
            })
        }
        return data
    }


    useEffect(() => {
        setPlotData(dataset)
    }, [dataset])

    return (
        <div className="tile is-vertical is-9">
            <div className="tile is-horizontal">
                <div className="tile is-child">
                    <BarChart width={400} height={300} data={branchSales(plotData, 'Branch', 'Total')}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend aria-label="hello" />
                        <Bar dataKey="total_sale" fill="#8884d8" />
                    </BarChart>
                </div>
                <div className="tile is-child">
                    <BarChart width={400} height={300} data={branchSales(plotData, 'Branch', 'Total')}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total_sale" fill="#8884d8" />
                    </BarChart>
                </div>
            </div>
            <div className="tile is-horizontal">
                <div className="tile is-child p-5">
                    <BarChart width={400} height={300} data={branchSales(plotData, 'Time', 'Quantity').sort((a, b) => {return a.name - b.name})}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total_sale" fill="#8884d8" />
                    </BarChart>

                </div>
                <div className="tile is-child p-5">
                    <LineChart width={400} height={300} data={branchSales(plotData, 'Date', 'Quantity').sort((a, b) => {
                        return moment(a.name, 'MM/DD/YYYY') - moment(b.name, 'MM/DD/YYYY')
                    })}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line dataKey="total_sale" fill="#8884d8" />
                    </LineChart>
                </div>
            </div>
        </div>
    )
}
