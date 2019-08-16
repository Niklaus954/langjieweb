import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CONFIG from '../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
    aboutWrap: {
        display: 'flex',
        background: '#000',
        // padding: 10,
    },
    itemsBlock: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        marginTop: 10,
    },
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
    return (
        showAbout && <div className={classes.aboutWrap}>
            <div style={{maxWidth: CONFIG.indexPageMaxWidth, display: isPc ? 'flex' : 'block', width: '100%', margin: 'auto'}}>
                {
                    links.map(items => (
                        <div key={items.title} className={classes.itemsBlock}>
                            <div>{items.title}</div>
                            {
                                items.item.map((items, index) => <p key={index}>{items}</p>)
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

About.propTypes = {
    location: PropTypes.object.isRequired,
};

export default withRouter(About);