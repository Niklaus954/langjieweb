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

import Cloud from './Service/Cloud'

const Home = ({updateSideMenuList, updateSelectedSideMenu, sideBarExpand, updateSideBarExpand, updateSelectedSideName, location, history}) => {
    const isPc = window.innerWidth < CONFIG.minDeviceWidthNum ? false : true;

    useEffect(() => {
        init();
    }, [ location.pathname ]);

    const init = () => {
        console.log('初始化');
        let menuList;
        if (CONFIG.getPathName(location.pathname).indexOf('/home') !== -1) {
            menuList = CONFIG.menu[0].subArr;
        } else if (CONFIG.getPathName(location.pathname).indexOf('/solution') !== -1) {
            menuList = CONFIG.menu[1].subArr;
        } else if (CONFIG.getPathName(location.pathname).indexOf('/service') !== -1) {
            menuList = CONFIG.menu[2].subArr;
        }
        if (!isPc) menuList = CONFIG.menu;
        // 获取当前选中的节点
        let selectedSideMenu, selectedSideText;
        let markIndex = 0;  // 移动端，只展开第一个子节点的下属节点
        let besidesNode;    // 保留原来展开的节点
        let expandArr = [];

        getUnderNode(menuList);
        getExpandArr();
        // 移动端保持简约
        if (isPc) {
            expandArr = [...new Set([...expandArr, ...sideBarExpand])];
            expandArr = expandArr.filter(items => items !== besidesNode);
        }
        try {
            updateSideMenuList(menuList);
            updateSelectedSideMenu(selectedSideMenu);
            updateSelectedSideName(selectedSideText);
        } catch (e) {
            history.push({
                pathname: '/',
            });
        }
        updateSideBarExpand(expandArr);

        function getUnderNode(menuList) {
            menuList.forEach((items, index) => {
                if (items.pathname === CONFIG.getPathName(location.pathname)) {
                    selectedSideMenu = items.pathname;
                    selectedSideText = items.text;
                } else if (items.subArr) {
                    getUnderNode(items.subArr);
                }
            });
        }

        function getExpandArr() {
            const merageArr = [];
            funMergeArr(menuList);
            let id;
            merageArr.forEach((items, index) => {
                if (selectedSideMenu === items.pathname) {
                    id = items.id;
                    if (items.subArr) {
                        if (sideBarExpand.indexOf(id) === -1) {
                            expandArr.push(id);
                        } else {
                            besidesNode = id;
                            expandArr.splice(sideBarExpand.indexOf(id), 1);
                        }
                    }
                }
            });
            getSub(id);
            getSup(id);
            expandArr = [ ...new Set(expandArr) ];

            // 所有节点归到一个数组
            function funMergeArr(list) {
                list.forEach((items, index) => {
                    merageArr.push(items);
                    if (items.subArr) {
                        funMergeArr(items.subArr);
                    }
                });
            }

            function getSub(id) {
                merageArr.forEach((items, index) => {
                    if (items.supId === id && items.subArr && markIndex === 0) {
                        markIndex++;
                        expandArr.push(items.id);
                        getSub(items.id);
                    }
                });
            }

            function getSup(id) {
                merageArr.forEach((items, index) => {
                    if (items.id === id && items.supId) {
                        expandArr.push(items.supId);
                        getSup(items.supId);
                    }
                });
            }
        }
    }

    return (
        <Router>
            <Route path="/homePage" component={AboutLangjie} />
            <Route path="/home/AboutLangjie" component={AboutLangjie} />
            <Route path="/home/WxPublicPlat" component={WxPublicPlat} />
            <Route path="/home/activity" component={Activity} />
            <Route path="/home/eventRecord" component={EventRecord} />
            <Route path="/home/contactUs" component={ContactUs} />

            <Route path="/solutionPage" component={ActionPlat} />
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

            <Route path="/servicePage" component={Cloud} />
            <Route path="/service/cloud" component={Cloud} />
        </Router>
    )
}

export default withRouter(Home)