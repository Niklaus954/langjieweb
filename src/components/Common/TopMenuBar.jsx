import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MButton from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { AccountCircle, Menu, Search } from '@material-ui/icons';
import MediaQuery from 'react-responsive';
import CONFIG from '../../config'
import Common from './Common'

class TopMenuBar extends Component {

    state = {
        showPopperList: false,
        presentPopper: '',
        keywords: '',
    };

    renderActionMenu = menuName => {
        const { selectedSideMenu } = this.props;
        if (selectedSideMenu.indexOf(menuName) !== -1) return CONFIG.activeMenuColor;
        return '#fff';
    }

    componentDidMount() {
        
    }

    menuClick = index => {
        const { updateSideMenuList, updateSelectedSideMenu } = this.props;
        const pathname = CONFIG['menu'][index].subArr[0].pathname;
        this.props.history.push({
            pathname,
        });
        updateSideMenuList(CONFIG.menu[index].subArr);
        updateSelectedSideMenu(pathname);
    }

    popperMenuClick = (items, index) => {
        const { updateSideMenuList, updateSelectedSideMenu } = this.props;
        const { pathname } = items;
        this.props.history.push({
            pathname,
        });
        updateSideMenuList(CONFIG.menu[index].subArr);
        updateSelectedSideMenu(pathname);
    }

    sideBarClick = () => {
        const { sideMenuBar, showSideMenuBar, updateSideMenuList } = this.props;
        // sideMenuList初始化
        updateSideMenuList(CONFIG.menu);
        // 弹出边框
        showSideMenuBar(!sideMenuBar);
    }

    showMaxWidth = selectedMenu => {
        return { maxWidth: CONFIG.indexPageMaxWidth };
    }

    handleToggle = (bool, index) => {
        this.setState({
            showPopperList: bool,
            presentPopper: index,
        });
    }

    showPopper = index => {
        const { showPopperList, presentPopper } = this.state;
        const { selectedSideMenu } = this.props;
        let display = showPopperList ? 'block' : 'none';
        if (index !== presentPopper) display = 'none';
        return (
            <div
                onMouseEnter={e => this.handleToggle(true, index)}
                onMouseLeave={e => this.handleToggle(false, index)}
            >
                <MButton style={{fontSize: 16}} color="inherit" onClick={() => this.menuClick(index)}>{CONFIG['menu'][index].text}</MButton>
                <Paper style={{ position: 'absolute', zIndex: 9, display }}>
                    <MenuList>
                        {
                            CONFIG['menu'][index].subArr.map(items => <MenuItem selected={items.pathname === selectedSideMenu} key={items.id} onClick={() => { this.popperMenuClick(items, index) }}>{items.text}</MenuItem>)
                        }
                    </MenuList>
                </Paper>
            </div>
        );
    }

    jumpToIndex = () => {
        Common.jumpToIndex(this.props);
    }

    // 移动端
    renderMobileTopBar = () => {
        const { selectedSideName } = this.props;
        return (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
                <Menu onClick={() => {this.sideBarClick()}} />
                <p>{selectedSideName}</p>
                <AccountCircle/>
            </div>
        );
    }

    render() {
        const { classes, selectedMenu } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <MediaQuery minDeviceWidth={CONFIG.minDeviceWidth}>
                        {
                            matches => (
                                (!matches && this.renderMobileTopBar()) || (matches && <div style={{ margin: 'auto', width: '100%', ...this.showMaxWidth(selectedMenu) }}>
                                    <Toolbar className={classes.toolBar}>
                                        <div>
                                            <Link to="/index" onClick={() => {this.jumpToIndex()}} style={{ color: '#fff' }}>
                                                <img style={{ width: 400 }} src={CONFIG.url('/img/朗杰logo-全.png')} alt={'朗杰logo-全.png'} />
                                            </Link>
                                        </div>
                                        <div style={{display: 'flex'}}>
                                            <div style={{display: 'flex', alignItems: 'baseline', marginRight: 20}}>
                                                <input placeholder={'请输入关键字...'} style={{padding: 10, borderRadius: 4, border: 'none', width: 260}} />
                                                <Search style={{position: 'relative', top: 8, left: -30, color: '#3f51b5', cursor: 'pointer'}} />
                                            </div>
                                            <AccountCircle style={{ fontSize: 38, marginRight: 40, cursor: 'pointer' }} />
                                        </div>
                                    </Toolbar>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <section style={{ color: this.renderActionMenu('home'), marginRight: 20 }}>
                                            {this.showPopper(0)}
                                        </section>
                                        <section style={{ color: this.renderActionMenu('solution'), marginRight: 20 }}>
                                            {this.showPopper(1)}
                                        </section>
                                        <section style={{ color: this.renderActionMenu('service'), marginRight: 20 }}>
                                            {this.showPopper(2)}
                                        </section>
                                    </div>
                                </div>)
                            )
                        }
                    </MediaQuery>
                </AppBar>
            </div>
        )
    }
}

export default withRouter(withStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 0,
        paddingRight: 0,
        width: '100%',
        margin: 'auto',
        marginTop: 1,
    }
}))(TopMenuBar))