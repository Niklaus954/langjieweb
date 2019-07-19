import React, { Component } from 'react'
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
import MediaQuery from 'react-responsive';
import Drawer from '@material-ui/core/Drawer';
import CONFIG from '../../config'
import { Search } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Common from './Common'

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.renderSideList = this.renderSideList.bind(this);
        this.isFirstRender = 0;
    }

    state = {
        open: false,
        expandMenu: [],
    };

    componentDidMount() {
        this.initSelected(this.props);
    }

    async componentWillReceiveProps(props) {
        this.isFirstRender++;
        const max = window.innerWidth < CONFIG.minDeviceWidth ? 3 : 2;
        if (this.isFirstRender < max) this.initSelected(props);
    }

    // 页面初始化或属性更新时触发需要展开的节点
    initSelected = async params => {
        let { sideMenuList, selectedSideMenu, updateSelectedSideName } = params;
        // sideMenuList = CONFIG.menu;
        let expandMenu = [];
        let presentTitle;
        // 获取当前节点的下层
        getExpand(sideMenuList, {});
        // 获取当前节点的上层
        const topArr = this.getTopIdArr(sideMenuList, selectedSideMenu);
        // 合并
        expandMenu = [...expandMenu, ...topArr];

        this.setState({
            expandMenu,
        });

        // 通知title改变
        if (selectedSideMenu) {
            updateSelectedSideName(presentTitle);
        }

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
    }

    // 获取上部需要展开的节点id
    getTopIdArr = (sideMenuList, selectedSideMenu) => {
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

    // sideMenuClick = items => {
    //     const { updateSelectedSideMenu, showSideMenuBar, sideMenuBar } = this.props;
    //     // 改变选中部分的颜色，其实用不到
    //     updateSelectedSideMenu(items.pathname);
    //     // 移动端收起draw
    //     // showSideMenuBar(!sideMenuBar);
    // }

    // 展开隐藏
    toggleMenu = items => {
        let { expandMenu } = this.state;
        const { updateSelectedSideMenu, updateSelectedSideName } = this.props;
        if (items.id > 0) {
            this.props.history.push({
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
        setTimeout(() => {
            this.setState({
                expandMenu,
            });
            updateSelectedSideMenu(items.pathname);
        }, CONFIG.jumpDelay);
    }

    // 节点递归渲染
    renderSideList = () => {
        let { sideMenuList, selectedSideMenu } = this.props;
        // sideMenuList = CONFIG.menu;
        const { expandMenu } = this.state;
        const that = this;
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
                    {/* <Link to={node.pathname}> */}
                    <ListItem button selected={node.pathname === selectedSideMenu ? true : false} onClick={() => { that.toggleMenu(node) }} style={{ paddingLeft: 16 * num }}>
                        <ListItemText primary={node.text} />
                        {node.subArr && (
                            expandMenu.indexOf(node.id) !== -1 ? <ExpandLess /> : <ExpandMore />
                        )}
                    </ListItem>
                    {/* </Link> */}
                    <Collapse in={expandMenu.indexOf(node.id) !== -1} timeout="auto" unmountOnExit>
                        {node.subArr && ++num && node.subArr.map(it => (
                            renderList(it, num)
                        ))}
                    </Collapse>
                </div>
            );
        }
    }

    // 移动端额外的sidebar渲染
    mobileComponents = () => {
        const { selectedSideMenu } = this.props;
        return (
            <div style={{marginTop: 6, marginBottom: 6, height: 40}}>
                { !selectedSideMenu && <div>
                    <input placeholder={'请输入关键字...'} style={{padding: 10, borderRadius: 4, border: '1px solid #dbdbdb', position: 'relative', left: 12, paddingRight: 42, width: 120}} />
                    <Search style={{position: 'relative', top: 8, left: -15, color: '#3f51b5', cursor: 'pointer'}} />
                </div> }
                { selectedSideMenu && <div style={{paddingLeft: 12, paddingRight: 12}}>
                    <Link to={'/index'}>
                        <Button variant="outlined" style={{width: '100%'}} onClick={() => {Common.jumpToIndex(this.props)}}>
                            回到首页
                        </Button>
                    </Link>
                </div> }
            </div>
        );
    }

    render() {
        const { sideMenuBar, showSideMenuBar } = this.props;
        return (
            <MediaQuery minDeviceWidth={CONFIG.minDeviceWidth} >
                {matches => {
                    if (matches) {
                        return this.renderSideList()
                    } else {
                        return (
                            <Drawer open={sideMenuBar} onClose={() => { showSideMenuBar(!sideMenuBar) }}>
                                {this.mobileComponents()}
                                {this.renderSideList()}
                            </Drawer>
                        )
                    }
                }}
            </MediaQuery>
        )
    }
}

export default withRouter(SideBar)