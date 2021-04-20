import React, { Component } from 'react'
import styles from '.././styles/styles.module.css'

export class InputRow extends Component {

    constructor(props) {
        super(props)

        this.state = {}
        this.empty = false

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            meeting: {
                ...this.state.meeting,
                [event.target.name]: event.target.value
            } 
        })
        // console.log(event.target.name)
        // console.log("Change")
    }

    handleSubmit() {  

        if(this.state.meeting === undefined || this.state.meeting.Fach === undefined || this.state.meeting.Uhrzeit === undefined || this.state.meeting.Datum === undefined || this.state.meeting.Plattform === undefined || this.state.meeting.Link === undefined) {
            this.empty = true
        }
        else {
            let bodyData = JSON.stringify({
                "Fach": this.state.meeting.Fach,
                "Uhrzeit": this.state.meeting.Uhrzeit,
                "Datum": this.state.meeting.Datum,
                "Plattform": this.state.meeting.Plattform,
                "Link": this.state.meeting.Link,
            })
    
            fetch("/api/insertMeeting", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: bodyData,
                }, [])
            .then(response => response.json(window.location.reload()))
        }
    }

    render() {
        return (
            <tr>
                <td className={styles.inputRow}><input type="text" placeholder="Fach" name="Fach" onChange={this.handleChange}/></td>
                <td className={styles.inputRow}><input type="time" placeholder="Uhrzeit" name="Uhrzeit" onChange={this.handleChange}/></td>
                <td className={styles.inputRow}><input type="date" placeholder="Datum" name="Datum" onChange={this.handleChange}/></td>
                <td className={styles.inputRow}><input type="text" placeholder="Plattform" name="Plattform" onChange={this.handleChange}/></td>
                <td className={styles.inputRow}><input type="text" placeholder="Link" name="Link" onChange={this.handleChange}/></td>
                <td className={styles.inputRow}><input type="submit" onClick={this.handleSubmit}/></td>
            </tr>
            
        )
    }
}

export default InputRow



