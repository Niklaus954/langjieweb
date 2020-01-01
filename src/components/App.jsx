import React, { useEffect, useState } from 'react'
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom'
import TopMenuBar from '../containers/TopMenuBar'
import SideBar from '../containers/SideBar'
import RightSideBar from '../containers/RightSideBar'
import Login from '../containers/Login'
import CheckLogin from '../containers/CheckLogin'
import CONFIG from '../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types'
import 'antd-mobile/dist/antd-mobile.css';
import About from './Index/About.jsx'
import LazyIndex from './lazy/LazyIndex'
import LazyHome from './lazy/LazyHome'
import ActivityDetails from './Home/ActivityDetails';
import SuggestReadingDetails from './Home/suggestReadingDetails'

const App = ({ selectedSideMenu }) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [barHeight, setBarHeight] = useState(window.innerHeight);

    useEffect(() => {
        const headerHeight = document.getElementsByClassName('MuiPaper-root')[0].offsetHeight ? document.getElementsByClassName('MuiPaper-root')[0].offsetHeight : 0;
        const barHeight = window.innerHeight - headerHeight;
        setBarHeight(barHeight);
    }, [ window.innerHeight, barHeight ]);

    const getStyle = () => {
        const style = {
            display: 'flex',
            maxWidth: CONFIG.indexPageMaxWidth,
            margin: 'auto',
        };
        if (window.location.hash.indexOf('#/index') === -1) style.height = barHeight;
        return style;
    }

    return (    
        <Router>
            <TopMenuBar />
            <div style={{height: barHeight}}>
                <div style={{height: barHeight, overflow: 'auto', WebkitOverflowScrolling: 'touch'}}>
                    <div style={{width: '100%'}}>
                        <Route path="/index" component={LazyIndex} />
                    </div>
                    <div style={getStyle()}>
                        {
                            (!isPc && <SideBar />) || ( isPc && selectedSideMenu && <SideBar /> )
                        }
                        {
                            (!isPc && <RightSideBar />)
                        }
                        <Switch>
                            <Route path="/home*" component={LazyHome} />
                            <Route path="/activityDetails" component={ActivityDetails}/>
                            <Route path="/recommendReadingDetails" component={SuggestReadingDetails}/>
                            <Route path="/solution*" component={LazyHome} />
                            <Route path="/service*" component={LazyHome} />
                            <Route path="/login" component={Login} />
                            <Route path="/checkLogin" component={CheckLogin} />
                            <Redirect from='/' to='/index' />
                        </Switch>
                    </div>
                    <div style={{width: '100%'}}>
                        <About />
                    </div>
                </div>
            </div>
        </Router>
    )
}

App.propTypes = {
    selectedSideMenu: PropTypes.string.isRequired,
}

export default App