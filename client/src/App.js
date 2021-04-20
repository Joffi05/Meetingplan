import React from 'react'
import Login from './components/Login'
import Table from './components/Table'
import styles from './styles/styles.module.css'

function App() {
  return (
    <div className="App">
      <h1 className={styles.heading}>
        Meetingplan
      </h1>
      <Table/>
      <Login/>
    </div>
  );
}

export default App;
