import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MButton from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Home, Build, AccountCircle, Cloud, Menu } from '@material-ui/icons';
import MediaQuery from 'react-responsive';
import CONFIG from '../../config'

class TopMenuBar extends Component {
    constructor(props) {
        super(props);
        this.menuClick = this.menuClick.bind(this);
    }

    state = {
        selectedMenu: null,
    };

    renderActionMenu = menuName => {
        const { selectedMenu } = this.state;
        if (selectedMenu === menuName) return CONFIG.activeMenuColor;
        return '#fff';
    }

    componentDidMount() {
        const { selectedMenu } = this.props;
        this.setState({
            selectedMenu,
        });
    }

    menuClick = menu => {
        this.props.history.push({
            pathname: '/' + menu,
        });
    }

    sideBarClick = () => {
        const { sideMenuBar, showSideMenuBar } = this.props;
        showSideMenuBar(!sideMenuBar);
    }

    render() {
        const { classes, selectedMenu } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <MediaQuery minDeviceWidth={CONFIG.minDeviceWidth}>
                        {
                            matches => (
                                <Toolbar style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: 0, paddingRight: 0 }}>
                                    <div>
                                        <Link to="/index" style={{ color: '#fff' }}>
                                                {!matches && <IconButton color="inherit">
                                                    <img width={30} src={'https://wx.langjie.com/img/朗杰弓三角.png'} alt={'logo'} />
                                                </IconButton>}
                                                {matches && <Typography variant="h6" className={classes.title}>
                                                    <IconButton color="inherit">
                                                        朗杰测控
                                                    </IconButton>
                                                </Typography>}
                                        </Link>
                                        {!matches && selectedMenu && <IconButton color="inherit" onClick={this.sideBarClick}>
                                            <Menu></Menu>
                                        </IconButton>}
                                    </div>
                                    <div style={{display: 'flex'}}>
                                        <section onClick={() => this.menuClick('home')} style={{ color: this.renderActionMenu('home') }}>
                                            {matches && <MButton color="inherit">朗杰</MButton>}
                                            {!matches && <IconButton color="inherit" style={{ marginRight: 3 }}>
                                                <Home></Home>
                                            </IconButton>}
                                        </section>
                                        <section onClick={() => this.menuClick('solution')} style={{ color: this.renderActionMenu('solution') }}>
                                            {matches && <MButton color="inherit">解决方案</MButton>}
                                            {!matches && <IconButton color="inherit" style={{ marginRight: 3 }}>
                                                <Build></Build>
                                            </IconButton>}
                                        </section>
                                        <section onClick={() => this.menuClick('service')} style={{ color: this.renderActionMenu('service') }}>
                                        {matches && <MButton color="inherit">客户服务</MButton>}
                                            {!matches && <IconButton color="inherit" style={{ marginRight: 3 }}>
                                                <Cloud></Cloud>
                                            </IconButton>}
                                        </section>
                                            <section onClick={() => this.menuClick('member')} style={{ color: this.renderActionMenu('member') }}>
                                            {matches && <MButton color="inherit">会员</MButton>}
                                            {!matches && <IconButton color="inherit">
                                                <AccountCircle></AccountCircle>
                                            </IconButton>}
                                        </section>
                                    </div>
                                </Toolbar>
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
}))(TopMenuBar))