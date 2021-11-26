
import React, {useState, useEffect} from 'react'
import DataFrame from 'dataframe-js'
import {Navbar} from './Component/Navbar'
import {SidePanel} from './Component/SidePanel'
import {DrawGraph} from './Component/DrawGraph'
import Papa from 'papaparse'
import csv from './data.csv'

function App() {

    const [data, setData] = useState([])

    async function fetchCsv() {
        const response = await fetch(csv);
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const file = decoder.decode(result.value);
        return file;
    }

    async function GetData(artist) {
        const temp = Papa.parse(await fetchCsv());
        setData(temp.data)
    }

    const castColumnsType = (df, columns, castFunction) => {
        let newDataframe = df
        for (let column of columns) {
            newDataframe = newDataframe.cast(column, castFunction)
        }
        return newDataframe
    }

    const timeStringtoInt = (value) => {
        let hourMinute = value.split(':')
        return Number(hourMinute[0]) + Math.round(hourMinute[1] / 60)
    }

    const df = new DataFrame(data.slice(1), data[0])
    let newDf = castColumnsType(df, ['Unit price', 'Quantity', 'Tax 5%', 'Total', 'cogs', 'gross margin percentage', 'gross income', 'Rating'], Number)
    newDf = newDf.cast('Time', timeStringtoInt)

    useEffect(() => {
        const info = GetData()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="m-5">
            </div>
            <div className="tile is-ancestor">
                <SidePanel />
                {newDf.dim()[0] !== 0 && <DrawGraph dataset={newDf}/>}
            </div>

        </div>
    );
}

export default App;
