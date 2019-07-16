import React, { Component } from 'react';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom'
import TopMenuBar from '../containers/TopMenuBar'
import SideBar from '../containers/SideBar'
import AboutLangjie from './Home/AboutLangjie'
import WxPublicPlat from './Home/WxPublicPlat'
import Activity from './Home/Activity'
import EventRecord from './Home/EventRecord'
import ContactUs from './Home/ContactUs'
import CONFIG from '../config'
import Common from './Common/Common'

class Home extends Component {

    componentDidMount() {
        const { updateSideMenuList, updateSelectedSideMenu } = this.props;
        Common.routeInit({
            updateSideMenuList,
            updateSelectedSideMenu,
            pathname: this.props.location.pathname,
            orderPathname: '/home',
            history: this.props.history,
            menuList: CONFIG.homeMenu,
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <TopMenuBar selectedMenu={'home'} />
                    <div style={{ display: 'flex' }}>
                        <SideBar />
                        <div>
                            <Route path="/home/AboutLangjie" component={AboutLangjie} />
                            <Route path="/home/WxPublicPlat" component={WxPublicPlat} />
                            <Route path="/home/activity" component={Activity} />
                            <Route path="/home/eventRecord" component={EventRecord} />
                            <Route path="/home/contactUs" component={ContactUs} />
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Home