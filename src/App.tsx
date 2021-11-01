import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styles from './App.module.css'
import { HomePage } from './pages'

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Route path='/' component={HomePage} />
      </Router>
    </div>
  )
}

export default App
