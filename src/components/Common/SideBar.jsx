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
import PropTypes from 'prop-types'

const SideBar = ({sideMenuList, selectedSideMenu, updateSelectedSideName, updateSelectedSideMenu, history, location, sideMenuBar, showSideMenuBar, sideBarExpand, updateSideBarExpand}) => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);

    // 展开隐藏
    const toggleMenu = items => {
        history.push({
            pathname: items.pathname,
            state: sideBarExpand,
        });
        if (Common.getPathName(location.pathname) === items.pathname && items.subArr) {
            // 通知需要展开或隐藏
            history.push({
                pathname: items.pathname + '?timestamp='+Date.now(),
                state: sideBarExpand,
            });
        }
    }

    // 节点递归渲染
    const renderSideList = () => {
        return (
            <div style={{ width: 200, minWidth: 200, borderRight: '1px solid #eee', overflow: 'auto' }}>
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

        // 身份权限判断
        function renderList(node, num) {
            if (!Common.authSideMenuList(node)) return;
            return (
                <div key={node.id}>
                    <ListItem button selected={node.pathname === selectedSideMenu && node.id > 0} onClick={() => { toggleMenu(node) }} style={{ paddingLeft: 16 * num }}>
                        <ListItemText primary={node.text} />
                        {node.subArr && (
                            sideBarExpand.indexOf(node.id) !== -1 ? <ExpandLess /> : <ExpandMore />
                        )}
                    </ListItem>
                    <Collapse in={sideBarExpand.indexOf(node.id) !== -1} timeout="auto" unmountOnExit>
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
                            updateSideBarExpand,
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

SideBar.propTypes = {
    sideMenuList: PropTypes.array.isRequired,
    selectedSideMenu: PropTypes.string.isRequired,
    updateSelectedSideName: PropTypes.func.isRequired,
    updateSelectedSideMenu: PropTypes.func.isRequired,
    sideBarExpand: PropTypes.array.isRequired,
    updateSideBarExpand: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    showSideMenuBar: PropTypes.func.isRequired,
    sideMenuBar: PropTypes.bool.isRequired,
};

export default withRouter(SideBar)