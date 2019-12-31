import React from 'react';
import {
    HashRouter as Router,
    Route,
    withRouter,
    Redirect,
} from 'react-router-dom'
import { useEffect } from 'react';
import CONFIG from '../config'
import PropTypes from 'prop-types'
import Common from './Common/Common'

const Home = ({updateSideMenuList, updateSelectedSideMenu, sideBarExpand, updateSideBarExpand, updateSelectedSideName, location, history}) => {
    const isPc = window.innerWidth < CONFIG.minDeviceWidthNum ? false : true;

    useEffect(() => {
        init();
    }, [ location.pathname ]);

    const init = () => {
        console.log('初始化');
        let menuList;
        if (Common.getPathName(location.pathname).indexOf('/home') !== -1) {
            menuList = CONFIG.menu[0].subArr;
        } else if (Common.getPathName(location.pathname).indexOf('/solution') !== -1) {
            menuList = CONFIG.menu[1].subArr;
        } else if (Common.getPathName(location.pathname).indexOf('/service') !== -1) {
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
                if (items.pathname === Common.getPathName(location.pathname)) {
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

    const initRouteArr = () => {
        const menuArr = [];
        funMergeArr(CONFIG.menu);
        // 所有节点归到一个数组
        function funMergeArr(list) {
            list.forEach((items, index) => {
                menuArr.push(items);
                if (items.subArr) {
                    funMergeArr(items.subArr);
                }
            });
        }
        return menuArr.map(items => {
            const token = Common.getAuthToken();
            return <Route key={items.id} path={items.pathname} render={() => 
                (!items.auth ? (<items.component parentLocation={location} />) : (token ? <items.component parentLocation={location} /> : <Redirect to={{
                    pathname: '/login?path=' + items.pathname,
                }} />)
            )} />
        });
    }

    return (
        <Router>
            <div style={{width: '100%', padding: 10, overflow: 'auto', WebkitOverflowScrolling: 'touch', wordBreak: 'break-all', whiteSpace: 'preWrap'}}>
                { initRouteArr() }
            </div>
        </Router>
    )
}

Home.propTypes = {
    updateSideMenuList: PropTypes.func.isRequired,
    updateSelectedSideMenu: PropTypes.func.isRequired,
    sideBarExpand: PropTypes.array.isRequired,
    updateSideBarExpand: PropTypes.func.isRequired,
    updateSelectedSideName: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(Home)