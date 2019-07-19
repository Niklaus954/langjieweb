import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import MediaQuery from 'react-responsive';
import CONFIG from '../../config'

class About extends Component {
    render() {
        const { classes } = this.props;
        const pathname = this.props.location.pathname;
        let showAbout = false;
        if (pathname === '/index') showAbout = true;
        return (
            <MediaQuery minDeviceWidth={CONFIG.minDeviceWidth}>
                {
                    matches => (
                        showAbout && <div className={classes.aboutWrap}>
                            <div style={{maxWidth: CONFIG.indexPageMaxWidth, display: matches ? 'flex' : 'block', width: '100%', margin: 'auto'}}>
                                <div className={classes.itemsBlock}>
                                    <div>相关资源</div>
                                    <p>1</p>
                                    <p>2</p>
                                    <p>3</p>
                                </div>
                                <div className={classes.itemsBlock}>
                                    <div>社区</div>
                                    <p>1</p>
                                    <p>2</p>
                                    <p>3</p>
                                </div>
                                <div className={classes.itemsBlock}>
                                    <div>帮助</div>
                                    <p>1</p>
                                    <p>2</p>
                                    <p>3</p>
                                </div>
                                <div className={classes.itemsBlock}>
                                    <div>更多产品</div>
                                    <p>1</p>
                                    <p>2</p>
                                    <p>3</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </MediaQuery>
        );
    }
}

export default withRouter(withStyles(theme => ({
    aboutWrap: {
        display: 'flex',
        background: '#000',
        padding: 10,
    },
    itemsBlock: {
        flex: 1,
        textAlign: 'center',
        color: '#fff'
    },
}))(About))