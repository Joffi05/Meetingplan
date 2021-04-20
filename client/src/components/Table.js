import React from 'react'
import InputRow from './InputRow'
import { useCookies } from "react-cookie"
import styles from '.././styles/styles.module.css'

export default function Table() {

    const [data, setData] = React.useState(null)
    const [cookies, setCookie] = useCookies()

    React.useEffect(() => {
      fetch("/api/meetings")
      .then((res) => res.json())
      .then((data) => setData(data.message))
    }, [])

    function delData(index) {
        
        var bodyDataDel = JSON.stringify({
            "Fach": data[index].Fach,
            "Uhrzeit": data[index].Uhrzeit,
            "Datum": data[index].Datum,
            "Plattform": data[index].Plattform,
            "Link": data[index].Link,
        })

        fetch("/api/meetings/delete", {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: bodyDataDel,
            }, [])
        .then(response => response.json(window.location.reload()))
    }

    var meetings

    if (data){

        let sortdata = data.sort((a, b) => {
            let aDate = new Date(a.Datum + "T" +  a.Uhrzeit + "Z")
            let bDate = new Date(b.Datum + "T" +  b.Uhrzeit + "Z")

            return aDate - bDate
        })

        meetings = sortdata.map(
            (data, index) => 
                <tr className={styles.tableInner}>
                <td className={styles.tableInner}> {data.Fach} </td>
                <td className={styles.tableInner}> {data.Uhrzeit} </td>
                <td className={styles.tableInner}> {data.Datum} </td>
                <td className={styles.tableInner}> {data.Plattform} </td>
                <td className={styles.tableInner}> {data.Link} </td>
                <td className={styles.tableInner}> <button onClick={() => delData(index)} disabled={!cookies.loggedIn}>Löschen</button></td>
                </tr>   
        )

        console.log(meetings)

        return (
            <table className={styles.table}>
                <th className={styles.tableTop}>Fach</th>
                <th className={styles.tableTop}>Uhrzeit</th>
                <th className={styles.tableTop}>Datum</th>
                <th className={styles.tableTop}>Plattform</th>
                <th className={styles.tableTop}>Link</th>
                <th className={styles.tableTop}>-</th>

                {meetings}
                {cookies.loggedIn ? <InputRow/> : null}
            </table>
        )
    }
    else{
        return (
            <div>
                <h1>Loading...</h1>
                {cookies.loggedIn ? <InputRow/> : null}
            </div>
        )
    }
}
