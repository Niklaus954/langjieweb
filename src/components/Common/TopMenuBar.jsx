import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MButton from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { AccountCircle, Menu, Search } from '@material-ui/icons';
import CONFIG from '../../config'
import Common from './Common'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
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
    },
}));

const TopMenuBar = ({selectedSideMenu, updateSideMenuList, updateSelectedSideMenu, history, sideMenuBar, showSideMenuBar, updateSelectedSideName, selectedSideName, selectedMenu, updateSideBarExpand}) => {
    const [showPopperList, setShowPopperList] = useState(false);
    const [presentPopper, setPresentPopper] = useState('');
    // const [keywords, setKeywords] = useState('');
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);

    const classes = useStyles();

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
                            CONFIG['menu'][index].subArr.map(items => <MenuItem selected={items.pathname === selectedSideMenu} key={items.id} onClick={() => { popperMenuClick(items, index) }}>{items.text}</MenuItem>)
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

    // 移动端
    const renderMobileTopBar = () => {
        return (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
                <Menu onClick={() => {sideBarClick()}} />
                <p>{selectedSideName}</p>
                <AccountCircle/>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                {(!isPc && renderMobileTopBar()) || (isPc && <div style={{ margin: 'auto', width: '100%', ...showMaxWidth(selectedMenu) }}>
                    <Toolbar className={classes.toolBar}>
                        <div>
                            <Link to="/index" onClick={() => {jumpToIndex()}} style={{ color: '#fff' }}>
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
    sideMenuBar: PropTypes.bool.isRequired,
    showSideMenuBar: PropTypes.func.isRequired,
    updateSelectedSideName: PropTypes.func.isRequired,
    selectedSideName: PropTypes.string.isRequired,
    selectedMenu: PropTypes.string,
    updateSideBarExpand: PropTypes.func.isRequired,
};

export default withRouter(TopMenuBar);