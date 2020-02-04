import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MButton from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { AccountCircle, Menu as MenuIcon, Search } from '@material-ui/icons';
import CONFIG from '../../config'
import Common from './Common'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 0,
        paddingRight: 0,
        width: '100%',
    },
}));

let refreshSideMenuAuthCount = 0;

const TopMenuBar = ({memberInfo, selectedSideMenu, updateSideMenuList, updateSelectedSideMenu, history, sideMenuBar, showSideMenuBar, updateSelectedSideName, selectedSideName, selectedMenu, updateSideBarExpand, updateShowRightSideBar, location}) => {
    const [showPopperList, setShowPopperList] = useState(false);
    const [presentPopper, setPresentPopper] = useState('');
    const [ anchorEl, setAnchorEl] = useState(null);
    // const [keywords, setKeywords] = useState('');
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const isIE = !!window.ActiveXObject || "ActiveXObject" in window;

    const classes = useStyles();

    // 客户服务边栏显示
    if (refreshSideMenuAuthCount === 0) {
        refreshSideMenuAuthCount++;
        Common.refreshSideMenuAuth(history, location);
    }

    useEffect(() => {
        if (location.pathname === '/index') updateSelectedSideName(CONFIG.defaultIndexTitle);
    });

    const renderActionMenu = menuName => {
        if (selectedSideMenu.indexOf(menuName) !== -1) return CONFIG.activeMenuColor;
        return '#fff';
    }

    const menuClick = index => {
        const pathname = CONFIG['menu'][index].subArr[0].pathname;
        history.push({
            pathname,
        });
        updateSideMenuList(CONFIG.menu[index].subArr);
        updateSelectedSideMenu(pathname);
    }

    const popperMenuClick = (items, index) => {
        const { pathname } = items;
        history.push({
            pathname,
        });
        updateSideMenuList(CONFIG.menu[index].subArr);
        updateSelectedSideMenu(pathname);
    }

    const sideBarClick = () => {
        // sideMenuList初始化
        updateSideMenuList(CONFIG.menu);
        // 弹出边框
        showSideMenuBar(!sideMenuBar);
    }

    const showMaxWidth = selectedMenu => {
        return { maxWidth: CONFIG.indexPageMaxWidth };
    }

    const handleToggle = (bool, index) => {
        setShowPopperList(bool);
        setPresentPopper(index);
    }

    const showPopper = index => {
        let display = showPopperList ? 'block' : 'none';
        if (index !== presentPopper) display = 'none';
        return (
            <div
                onMouseEnter={e => handleToggle(true, index)}
                onMouseLeave={e => handleToggle(false, index)}
            >
                <MButton style={{fontSize: 16}} color="inherit" onClick={() => menuClick(index)}>{CONFIG['menu'][index].text}</MButton>
                <Paper style={{ position: 'absolute', zIndex: 9, display }}>
                    <MenuList>
                        {
                            CONFIG['menu'][index].subArr.map(items => (
                                Common.authSideMenuList(items) && <MenuItem 
                                    selected={items.pathname === selectedSideMenu} 
                                    key={items.id} 
                                    onClick={() => { popperMenuClick(items, index) }}
                                >{items.text}</MenuItem>
                            ))
                        }
                    </MenuList>
                </Paper>
            </div>
        );
    }

    const jumpToIndex = () => {
        Common.jumpToIndex({
            updateSelectedSideMenu,
            updateSelectedSideName,
            updateSideBarExpand,
        });
    }

    const showMobileRightSide = () => {
        updateShowRightSideBar(true);
    }

    // 移动端
    const renderMobileTopBar = () => {
        return (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
                <MenuIcon onClick={() => {sideBarClick()}} />
                <p>{selectedSideName}</p>
                {
                    !Common.getAuthToken() && <AccountCircle onClick={() => {showMobileRightSide()}} />
                }
                {
                    Common.getAuthToken() && <img style={{width: 30, height: 30, borderRadius: '50%'}} src={memberInfo.portrait} alt={'头像'} onClick={() => {showMobileRightSide()}}/>
                }
            </div>
        );
    }

    const handleMemberClick = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleMemberClose = () => {
        setAnchorEl(null);
    }

    const renderAccountMenuItem = () => {
        if (memberInfo.name && Common.getAuthToken()) {
            let timeGreet;
            const nowHours = new Date().getHours();
            if (nowHours > 3 && nowHours <= 11) {
                timeGreet = '上午好！';
            } else if (nowHours > 11 && nowHours <= 13) {
                timeGreet = '中午好！';
            } else if (nowHours > 13 && nowHours <= 18) {
                timeGreet = '下午好！';
            } else {
                timeGreet = '晚上好！';
            }
            return(
                <div style={{minWidth: 150}}>
                    <MenuItem onClick={handleMemberClose}>{timeGreet + memberInfo.name}</MenuItem>
                    <MenuItem onClick={logout}>注销</MenuItem>
                </div>
            );
        }
        return(
            <div style={{minWidth: 150}}>
                <MenuItem onClick={login}>登陆</MenuItem>
            </div>
        ); 
    }

    const login = () => {
        history.push({
            pathname: '/login',
            search: '?path=' + location.pathname,
        });
        handleMemberClose();
    }

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className={classes.root}>
            <AppBar style={{position: 'relative'}}>
                {(!isPc && renderMobileTopBar()) || (isPc && <div style={{ margin: 'auto', width: '100%', ...showMaxWidth(selectedMenu) }}>
                    <Toolbar className={classes.toolBar} style={{position: 'relative', top: isIE ? 10 : 0}}>
                        <div>
                            <Link to="/index" onClick={() => {jumpToIndex()}} style={{ color: '#fff' }}>
                                <img style={{ width: 190 }} src={CONFIG.url('/img/朗杰logo-白.png')} alt={'朗杰logo-白.png'} />
                            </Link>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div style={{ display: 'flex', alignItems: 'baseline', marginRight: 20 }}>
                                <section style={{ color: renderActionMenu('home'), marginRight: 20 }}>
                                    {showPopper(0)}
                                </section>
                                <section style={{ color: renderActionMenu('solution'), marginRight: 20 }}>
                                    {showPopper(1)}
                                </section>
                                <section style={{ color: renderActionMenu('service'), marginRight: 20 }}>
                                    {showPopper(2)}
                                </section>
                            </div>
                        </div>
                        <div style={{display: 'flex'}}>
                            <div style={{display: 'flex', alignItems: 'baseline', marginRight: 20}}>
                                <input placeholder={'请输入关键字...'} style={{padding: 10, borderRadius: 4, border: 'none', width: 260}} />
                                <Search style={{position: 'relative', top: 8, left: -30, color: '#3f51b5', cursor: 'pointer'}} />
                            </div>
                            {
                                !Common.getAuthToken() && <AccountCircle aria-controls="simple-menu" aria-haspopup="true" onClick={handleMemberClick} style={{ fontSize: 38, marginRight: 40, cursor: 'pointer' }} />
                            }
                            {
                                Common.getAuthToken() && <img aria-controls="simple-menu" aria-haspopup="true" onClick={handleMemberClick} style={{width: 38, height: 38, borderRadius: '50%', cursor: 'pointer', marginRight: 40, fontSize: 38}} src={memberInfo.portrait} alt={'头像'} />
                            }
                            <Menu
                                style={{marginTop: 40}}
                                id="simple-menu"
                                keepMounted
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                onClose={handleMemberClose}
                            >
                                { renderAccountMenuItem() }
                            </Menu>
                        </div>
                    </Toolbar>
                </div>)}
            </AppBar>
        </div>
    )
}

TopMenuBar.propTypes = {
    selectedSideMenu: PropTypes.string.isRequired,
    updateSideMenuList: PropTypes.func.isRequired,
    updateSelectedSideMenu: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    sideMenuBar: PropTypes.bool.isRequired,
    showSideMenuBar: PropTypes.func.isRequired,
    updateSelectedSideName: PropTypes.func.isRequired,
    selectedSideName: PropTypes.string.isRequired,
    selectedMenu: PropTypes.string,
    updateSideBarExpand: PropTypes.func.isRequired,
    updateShowRightSideBar: PropTypes.func.isRequired,
};

export default withRouter(TopMenuBar);