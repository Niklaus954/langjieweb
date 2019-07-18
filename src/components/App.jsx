import React from 'react'
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom'
import Index from './Index.jsx'
import Home from '../containers/Home'
import TopMenuBar from '../containers/TopMenuBar'
import SideBar from '../containers/SideBar'
import CONFIG from '../config'
import MediaQuery from 'react-responsive';

const App = ({ selectedSideMenu }) => {
    return (
        <Router>
            <TopMenuBar />
            <MediaQuery minDeviceWidth={CONFIG.minDeviceWidth}>
                { matches => ( (!matches && <SideBar />) || ( matches && selectedSideMenu && <SideBar /> ) ) }
            </MediaQuery>
            <Switch>
                <Route path="/index" component={Index} />
                <Route path="/home" component={Home} />
                <Route path="/solution" component={Home} />
                <Route path="/service" component={Home} />
                <Redirect from='/' to='/index' />
            </Switch>
        </Router>
    )
}

export default App