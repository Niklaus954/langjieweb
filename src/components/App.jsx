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
import LazyShop from './lazy/LazyShop'
// import ActivityContent from './Home/ActivityContent';
import ActivityContentContainer from '../containers/ActivityContentContainer';
import ReadingContentContainer from '../containers/ReadingContentContainer';
// import ReadingContent from './Home/ReadingContent'
import RepairInfo from './Service/RepairInfo'
import ContractInfo from './Service/ContractInfo'
import VirInfo from './Service/VirInfo'
import VirProInfo from '../containers/VirProInfoContainer';
import DynaProInfo from '../containers/DynaProInfoContainer';
import SuperAuth from '../containers/SuperAuth';


const App = ({ selectedSideMenu }) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [barHeight, setBarHeight] = useState(window.innerHeight);

    useEffect(() => {
        const headerHeight = document.getElementsByClassName('MuiPaper-root')[0].offsetHeight ? document.getElementsByClassName('MuiPaper-root')[0].offsetHeight : 0;
        const barHeight = window.innerHeight - headerHeight;
        setBarHeight(barHeight);
    }, [ window.innerHeight, barHeight ]);

    // 20200619补丁
    if (!localStorage.getItem('tokenbuding')) {
        localStorage.clear();
        localStorage.setItem('tokenbuding', '1');
    }

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
                            <Route path="/activityContent" component={ActivityContentContainer}/>
                            <Route path="/readingContent" component={ReadingContentContainer}/>
                            <Route path="/solution*" component={LazyHome} />
                            <Route path="/service*" component={LazyHome} />
                            <Route path="/login" component={Login} />
                            <Route path="/checkLogin" component={CheckLogin} />
                            <Route path="/repairInfo" component={RepairInfo}/>
                            <Route path="/contractInfo" component={ContractInfo}/>
                            <Route path="/virInfo" component={VirInfo}/>
                            <Route path="/virProInfo" component={VirProInfo}/>
                            <Route path="/dynaProInfo" component={DynaProInfo}/>
                            <Route path="/shop*" component={LazyShop}/>
                            <Route path="/superAuth" component={SuperAuth} />
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