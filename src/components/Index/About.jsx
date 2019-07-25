import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CONFIG from '../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
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
}));

const About = ({location}) => {
    const classes = useStyles();
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const pathname = location.pathname;
    let showAbout = false;
    if (pathname === '/index') showAbout = true;
    return (
        showAbout && <div className={classes.aboutWrap}>
            <div style={{maxWidth: CONFIG.indexPageMaxWidth, display: isPc ? 'flex' : 'block', width: '100%', margin: 'auto'}}>
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
    );
}

About.propTypes = {
    location: PropTypes.object.isRequired,
};

export default withRouter(About);