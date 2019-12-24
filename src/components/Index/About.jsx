import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CONFIG from '../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    aboutWrap: {
        // display: 'flex',
        // background: '#3f51b5',
        // padding: 10,

        display: "flex",
        justifyContent: "space-around",
        padding: 20,
    },
    itemsBlock: {
        flex: 1,
        textAlign: 'center',
        color: '#000',
        marginTop: 10,
    },
    about: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
    }
}));

const About = ({location}) => {

    const QQ = "http://192.168.50.80:7090/images/QQ.png"
    const classes = useStyles();
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const pathname = location.pathname;
    let showAbout = false;
    if (pathname === '/index') showAbout = true;
    return(
        showAbout && 
        <div style={{background: "#3f51b5", color: "#ffffff"}}>
            <div className={classes.aboutWrap}>
                <div className={classes.about}>
                    <div>服务热线：0571-69958000 </div><br/>
                    <div>总机：0571-88930380</div><br/>
                    <div>服务QQ： <a style={{cursor: "pointer", color: "#fff"}} href="tencent://message/?uin=1820128000&Site=Sambow&Menu=yes"><img src={CONFIG.url(`/img/QQ.png`)} alt="" width="16px" height="16px"/>在线咨询</a> </div><br/>
                    <div style={{display: isPc ? "block" : "none" }}>
                        <div>Copyright@2001-2020 杭州朗杰测控技术开发有限公司 <Link href="http://www.beian.miit.gov.cn" color="inherit">浙ICP备09063746号-2</Link></div>
                    </div>
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <img src="https://wx.langjie.com/img/gallery/list_公众号二维码2017.jpg" alt="朗杰公司二维码" width={100} height={100}/>
                </div>
            </div>
            <div style={{ display: isPc ? "none" : "block", padding: "0 20px 20px 20px"}}>Copyright@2001-2020 杭州朗杰测控技术开发有限公司 <Link href="http://www.beian.miit.gov.cn" color="inherit">浙ICP备09063746号-2</Link></div>
        </div>
    )
}

About.propTypes = {
    location: PropTypes.object.isRequired,
};

export default withRouter(About);