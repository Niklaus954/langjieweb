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
    const [ links, setLinks ] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setLinks([
                {
                    title: '相关资源',
                    item: [ 1, 2, 3 ],
                },
                {
                    title: '社区',
                    item: [ 1, 2, 3 ],
                },
                {
                    title: '帮助',
                    item: [ 1, 2, 3 ],
                },
                {
                    title: '更多产品',
                    item: [ 1, 2, 3 ],
                },
            ]);
        }, 1000);
    }, []);

    const classes = useStyles();
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const pathname = location.pathname;
    let showAbout = false;
    if (pathname === '/index') showAbout = true;
    return(
        showAbout && 
        <div style={{background: "#3f51b5", color: "#fff"}}>
            <div className={classes.aboutWrap}>
                <div className={classes.about}>
                    <div>服务热线：0571-69958000 </div><br/>
                    <div>总机：0571-88930380</div><br/>
                    <div>传真：0571-85359710</div><br/>
                    <div style={{display: isPc ? "block" : "none" }}>
                        <div>Copyright@2001-2020 杭州朗杰测控技术开发有限公司 <Link href="http://www.beian.miit.gov.cn" color="inherit">浙ICP备09063746号-2</Link></div>
                    </div>
                </div>
                <div>
                    <img src="https://wx.langjie.com/img/gallery/list_公众号二维码2017.jpg" alt="朗杰公司二维码"/>
                </div>
            </div>
            <div style={{ display: isPc ? "none" : "block", padding: "0 20px 20px 20px"}}>Copyright@2001-2020 杭州朗杰测控技术开发有限公司 <Link href="http://www.beian.miit.gov.cn" color="inherit">浙ICP备09063746号-2</Link></div>
        </div>
    )

    // return (
    //     showAbout && <div className={classes.aboutWrap}>
    //         <div style={{maxWidth: CONFIG.indexPageMaxWidth, display: isPc ? 'flex' : 'block', width: '100%', margin: 'auto'}}>
    //             {
    //                 links.map(items => (
    //                     <div key={items.title} className={classes.itemsBlock}>
    //                         <div>{items.title}</div>
    //                         {
    //                             items.item.map((items, index) => <p key={index}>{items}</p>)
    //                         }
    //                     </div>
    //                 ))
    //             }
    //         </div>
    //     </div>
    // );
}

About.propTypes = {
    location: PropTypes.object.isRequired,
};

export default withRouter(About);