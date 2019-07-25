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
import About from './Index/About.jsx'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types'

const App = ({ selectedSideMenu }) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    return (
        <Router>
            <TopMenuBar />
            <div style={{width: '100%', margin: 'auto', maxWidth: CONFIG.indexPageMaxWidth, display: 'flex'}}>
                {
                    (!isPc && <SideBar />) || ( isPc && selectedSideMenu && <SideBar /> )
                }
                <Switch>
                    <Route path="/index" component={Index} />
                    <Route path="/home*" component={Home} />
                    <Route path="/solution*" component={Home} />
                    <Route path="/service*" component={Home} />
                    <Redirect from='/' to='/index' />
                </Switch>
            </div>
            <About />
        </Router>
    )
}

App.propTypes = {
    selectedSideMenu: PropTypes.string.isRequired,
}

export default App