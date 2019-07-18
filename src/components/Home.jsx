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

import ToolBox from './Solution/ToolBox'
import CtrlProducts from './Solution/CtrlProducts'
import ServerTeam from './Solution/ServerTeam'
import SecondryDevelop from './Solution/SecondryDevelop'
import MaxTest from './Solution/MaxTest'
import DynaTest from './Solution/DynaTest'
import FlexuralCompression from './Solution/FlexuralCompression'
import ElectronicUniversal from './Solution/ElectronicUniversal'
import ElectroHydraulicUniversal from './Solution/ElectroHydraulicUniversal'
import DynamicFatigue from './Solution/DynamicFatigue'
import PressShear from './Solution/PressShear'
import ActionPlat from './Solution/ActionPlat'
import Application from './Solution/Application'
import CompleteCtrlSystem from './Solution/CompleteCtrlSystem'

import Cloud from './Service/Cloud'

class Home extends Component {
    constructor(props) {
        super(props);
        this.isFirstRender = true;
    }

    componentDidMount() {
        this.init(this.props);
    }

    componentWillReceiveProps(props) {
        this.init(props);
    }

    init = props => {
        const { updateSideMenuList, updateSelectedSideMenu } = props;
        let orderPathname, menuList;
        if (this.props.location.pathname.indexOf('/home') !== -1) {
            orderPathname = '/home';
            menuList = CONFIG.menu[0].subArr;
        } else if (this.props.location.pathname.indexOf('/solution') !== -1) {
            orderPathname = '/solution';
            menuList = CONFIG.menu[1].subArr;
        } else if (this.props.location.pathname.indexOf('/service') !== -1) {
            orderPathname = '/service';
            menuList = CONFIG.menu[2].subArr;
        }
        // menuList = CONFIG.menu;
        const params = {
            updateSideMenuList,
            updateSelectedSideMenu,
            pathname: this.props.location.pathname,
            orderPathname,
            history: this.props.history,
            menuList,
        };
        Common.routeInit(params);
    }

    render() {
        return (
            <Router>
                <div style={{width: '100%', margin: 'auto', maxWidth: CONFIG.indexPageMaxWidth, display: 'flex'}}>
                    <Route path="/home/AboutLangjie" component={AboutLangjie} />
                    <Route path="/home/WxPublicPlat" component={WxPublicPlat} />
                    <Route path="/home/activity" component={Activity} />
                    <Route path="/home/eventRecord" component={EventRecord} />
                    <Route path="/home/contactUs" component={ContactUs} />

                    <Route path="/solution/actionPlat" component={ActionPlat} />
                    <Route path="/solution/toolBox" component={ToolBox} />
                    <Route path="/solution/ctrlProducts" component={CtrlProducts} />
                    <Route path="/solution/serverTeam" component={ServerTeam} />
                    <Route path="/solution/secondryDevelop" component={SecondryDevelop} />
                    <Route path="/solution/application" component={Application} />
                    <Route path="/solution/maxTest" component={MaxTest} />
                    <Route path="/solution/dynaTest" component={DynaTest} />
                    <Route path="/solution/completeCtrlSystem" component={CompleteCtrlSystem} />
                    <Route path="/solution/flexuralCompression" component={FlexuralCompression} />
                    <Route path="/solution/electronicUniversal" component={ElectronicUniversal} />
                    <Route path="/solution/electroHydraulicUniversal" component={ElectroHydraulicUniversal} />
                    <Route path="/solution/dynamicFatigue" component={DynamicFatigue} />
                    <Route path="/solution/pressShear" component={PressShear} />

                    <Route path="/service/cloud" component={Cloud} />
                </div>
            </Router>
        )
    }
}

export default Home