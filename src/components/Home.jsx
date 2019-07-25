import React from 'react';
import {
    HashRouter as Router,
    Route,
    withRouter,
} from 'react-router-dom'
import { useEffect } from 'react';
import AboutLangjie from './Home/AboutLangjie'
import WxPublicPlat from './Home/WxPublicPlat'
import Activity from './Home/Activity'
import EventRecord from './Home/EventRecord'
import ContactUs from './Home/ContactUs'
import CONFIG from '../config'

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
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Cloud from './Service/Cloud'

const Home = ({updateSideMenuList, updateSelectedSideMenu, location, history}) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);

    useEffect(() => {
        init();
    });

    const init = () => {
        console.log('页面初始化');
        let menuList;
        if (location.pathname.indexOf('/home') !== -1) {
            menuList = CONFIG.menu[0].subArr;
        } else if (location.pathname.indexOf('/solution') !== -1) {
            menuList = CONFIG.menu[1].subArr;
        } else if (location.pathname.indexOf('/service') !== -1) {
            menuList = CONFIG.menu[2].subArr;
        }
        if (!isPc) menuList = CONFIG.menu;
        // 获取当前选中的节点
        let selectedSideMenu;
        getUnderNode(menuList);
        try {
            updateSideMenuList(menuList);
            updateSelectedSideMenu(selectedSideMenu);
        } catch (e) {
            history.push({
                pathname: '/',
            });
        }

        function getUnderNode(menuList) {
            menuList.forEach((items, index) => {
                if (items.pathname === location.pathname) {
                    selectedSideMenu = items.pathname;
                } else if (items.subArr) {
                    getUnderNode(items.subArr);
                }
            });
        }
    }

    return (
        <Router>
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
        </Router>
    )
}

export default withRouter(Home)