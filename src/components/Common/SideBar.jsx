import React, { useState, useEffect } from 'react'
import {
    withRouter,
    Link,
} from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Drawer from '@material-ui/core/Drawer';
import CONFIG from '../../config'
import { Search } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Common from './Common'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const SideBar = ({sideMenuList, selectedSideMenu, updateSelectedSideName, updateSelectedSideMenu, history, sideMenuBar, showSideMenuBar}) => {
    const [expandMenu, setExpandMenu] = useState([]);
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);

    useEffect(() => {
        initSelected();
    }, [1,2,3]);

    // 页面初始化需要展开的节点
    const initSelected = () => {
        console.log('节点初始化');
        let expandMenu = [];
        let presentTitle;
        // 获取当前节点的下层
        getExpand(sideMenuList, {});
        // 获取当前节点的上层
        const topArr = getTopIdArr(sideMenuList, selectedSideMenu);
        // 合并
        expandMenu = [...expandMenu, ...topArr];
        expandMenu = [...new Set(expandMenu)];

        setExpandMenu(expandMenu);

        // 通知title改变
        if (selectedSideMenu) updateSelectedSideName(presentTitle);

        function getExpand(list, parentItem) {
            list.forEach((items, index) => {
                if (items.pathname === selectedSideMenu) {
                    presentTitle = items.text;
                    if (parentItem.pathname) {
                        expandMenu.push(parentItem.id);
                    } else {
                        expandMenu.push(items.id);
                    }
                } else if (items.subArr) {
                    getExpand(items.subArr, items);
                }
            });
        }

        // 获取上部需要展开的节点id
        function getTopIdArr(sideMenuList, selectedSideMenu) {
            const expandMenu = [];
            const merageArr = [];
            funMergeArr(sideMenuList);
            merageArr.forEach((items, index) => {
                if (items.pathname === selectedSideMenu) {
                    getTopNodes(items.id);
                }
            });
            return expandMenu;

            function getTopNodes(id) {
                merageArr.forEach((items, index) => {
                    if (items.id === id) {
                        expandMenu.push(items.supId);
                        if (items.supId) getTopNodes(items.supId);
                    }
                });
            }

            function funMergeArr(list) {
                list.forEach((items, index) => {
                    merageArr.push(items);
                    if (items.subArr) {
                        funMergeArr(items.subArr);
                    }
                });
            }
        }
    }

    // 展开隐藏
    const toggleMenu = items => {
        if (items.id > 0) {
            history.push({
                pathname: items.pathname,
            });
            updateSelectedSideName(items.text);
        }
        if (!items.subArr) return;
        const id = items.id;
        if (expandMenu.indexOf(id) === -1) {
            expandMenu.push(id);
        } else {
            expandMenu.splice(expandMenu.indexOf(id), 1);
        }
        updateSelectedSideMenu(items.pathname);
        setTimeout(() => {
            setExpandMenu(expandMenu);
        }, CONFIG.jumpDelay);
    }

    // 节点递归渲染
    const renderSideList = () => {
        const headerHeight = window['$']('.MuiPaper-root').height() ? window['$']('.MuiPaper-root').height() : 0;
        const barHeight = window.innerHeight - headerHeight;
        return (
            <div style={{ width: 200, height: barHeight, borderRight: '1px solid #eee', overflow: 'auto' }}>
                <List style={{ padding: 0 }}>
                    {
                        sideMenuList.map((items, index) => (
                            <div key={items.id}>
                                {renderList(items, 1)}
                            </div>
                        ))
                    }
                </List>
            </div>
        );

        function renderList(node, num) {
            return (
                <div key={node.id}>
                    <ListItem button selected={node.pathname === selectedSideMenu} onClick={() => { toggleMenu(node) }} style={{ paddingLeft: 16 * num }}>
                        <ListItemText primary={node.text} />
                        {node.subArr && (
                            expandMenu.indexOf(node.id) !== -1 ? <ExpandLess /> : <ExpandMore />
                        )}
                    </ListItem>
                    <Collapse in={expandMenu.indexOf(node.id) !== -1} timeout="auto" unmountOnExit>
                        {node.subArr && ++num && node.subArr.map(it => (
                            renderList(it, num)
                        ))}
                    </Collapse>
                </div>
            );
        }
    }

    const mobileComponents = () => {
        return (
            <div style={{marginTop: 6, marginBottom: 6, height: 40}}>
                { !selectedSideMenu && <div>
                    <input placeholder={'请输入关键字...'} style={{padding: 10, borderRadius: 4, border: '1px solid #dbdbdb', position: 'relative', left: 12, paddingRight: 42, width: 120}} />
                    <Search style={{position: 'relative', top: 8, left: -15, color: '#3f51b5', cursor: 'pointer'}} />
                </div> }
                { selectedSideMenu && <div style={{paddingLeft: 12, paddingRight: 12}}>
                    <Link to={'/index'}>
                        <Button variant="outlined" style={{width: '100%'}} onClick={() => {Common.jumpToIndex({
                            updateSelectedSideMenu,
                            updateSelectedSideName,
                        })}}>
                            回到首页
                        </Button>
                    </Link>
                </div> }
            </div>
        );
    }

    return (
        (isPc && renderSideList()) || (!isPc && <Drawer open={sideMenuBar} onClose={() => { showSideMenuBar(!sideMenuBar) }}>
            {mobileComponents()}
            {renderSideList()}
        </Drawer>)
    )
}

export default withRouter(SideBar)