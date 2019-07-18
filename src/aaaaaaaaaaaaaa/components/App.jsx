import React from 'react'
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom'
import Index from './Index.jsx'
import Home from '../containers/Home'
import Solution from '../containers/Solution'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/index" component={Index} />
                <Route path="/home" component={Home} />
                <Route path="/solution" component={Home} />
                <Redirect from='/' to='/index' />
            </Switch>
        </Router>
    )
}

export default App