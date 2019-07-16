import React, { Component } from 'react'
import {
    Link,
} from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MediaQuery from 'react-responsive';
import Drawer from '@material-ui/core/Drawer';
import CONFIG from '../../config'

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.renderSideList = this.renderSideList.bind(this);
        this.firstRender = true;
    }

    state = {
        open: {},
    };

    componentWillReceiveProps(props) {
        if (!this.firstRender) return;
        const { sideMenuList, selectedSideMenu } = props;
        const open = {};
        sideMenuList.forEach((items, index) => {
            if (items.subArr) {
                let openBool = false;
                items.subArr.forEach((it, ind) => {
                    if (it.pathname === selectedSideMenu) openBool = true;
                });
                open[ 'open_' + items.id ] = openBool;
            }
        });
        this.setState({
            open,
        });
        this.firstRender = false;
    }

    sideMenuClick = (items, index) => {
        const { updateSelectedSideMenu, showSideMenuBar, sideMenuBar } = this.props;
        updateSelectedSideMenu(items.pathname);
        showSideMenuBar(!sideMenuBar);
    }

    toggleOpen = id => {
        const { open } = this.state;
        open[ 'open_' + id ] = !open[ 'open_' + id ];
        this.setState({
            open,
        });
    }

    renderSideList = () => {
        const { sideMenuList, selectedSideMenu } = this.props;
        const { open } = this.state;
        const that = this;
        const headerHeight = window['$']('.MuiPaper-root').height() ? window['$']('.MuiPaper-root').height() : 0;
        const barHeight = window.innerHeight - headerHeight;
        return (
            <div style={{ width: 200, height: barHeight, borderRight: '1px solid #eee', overflow: 'auto' }}>
                <List style={{ padding: 0 }}>
                    {
                        sideMenuList.map((items, index) => (
                            renderList(items, index, 1)
                        ))
                    }
                </List>
            </div>
        );

        function renderList(items, index, level) {
            if (!items.subArr) {
                return (
                    <Link to={items.pathname} key={items.id}>
                        <ListItem button selected={items.pathname === selectedSideMenu ? true : false} onClick={() => that.sideMenuClick(items, index)} key={items.id} style={{ paddingLeft: 16 * level }}>
                            <ListItemIcon style={{ minWidth: 40 }}>
                                { items.icon }
                            </ListItemIcon>
                            <ListItemText primary={items.text} />
                        </ListItem>
                    </Link>
                );
            } else {
                const openState = open['open_' + items.id];
                return (
                    <div key={items.id}>
                        <ListItem button onClick={() => that.toggleOpen(items.id)} key={items.id} style={{ paddingLeft: 16 * level }}>
                            <ListItemIcon style={{ minWidth: 40 }}>
                                { items.icon }
                            </ListItemIcon>
                            <ListItemText primary={items.text} />
                            { openState ? <ExpandLess /> : <ExpandMore /> }
                        </ListItem>
                        <Collapse in={openState} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    items.subArr.map((items, index) => (
                                        renderList(items, index, 2)
                                    ))
                                }
                            </List>
                        </Collapse>
                    </div>
                );
            }
        }
    }

    render() {
        const { sideMenuBar, showSideMenuBar } = this.props;
        return (
            <MediaQuery minDeviceWidth={CONFIG.minDeviceWidth} >
                { matches => {
                    if (matches) {
                        return this.renderSideList()
                    } else {
                        return (
                            <Drawer open={sideMenuBar} onClose={() => { showSideMenuBar(!sideMenuBar)}}>
                                { this.renderSideList() }
                            </Drawer>
                        )
                    }
                }}
            </MediaQuery>
        )
    }
}

export default SideBar