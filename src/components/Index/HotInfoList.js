import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CONFIG from '../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types'


const checkWidth = (matches, index, seq) => {
    if (!matches) return 'span 12';
    if (index % 2 === 0) {
        if (seq === 1) {
            return 'span 4';
        } else {
            return 'span 8';
        }
    } else {
        if (seq === 1) {
            return 'span 8';
        } else {
            return 'span 4';
        }
    }
}

const checkImgOrText = (matches, items, index, seq, classes) => {
    if (!matches) {
        if (seq === 1) {
            return <img className={classes.img} src={CONFIG.url(`/img/${items.img}`)} alt={items.img}/>;
        } else {
            return <p className={classes.text}>{items.text}</p>;
        }
    }
    if (index % 2 === 0) {
        if (seq === 1) {
            return <img className={classes.img} src={CONFIG.url(`/img/${items.img}`)} alt={items.img}/>;
        } else {
            return <p className={classes.text}>{items.text}</p>;
        }
    } else {
        if (seq === 1) {
            return <p className={classes.text}>{items.text}</p>;
        } else {
            return <img className={classes.img} src={CONFIG.url(`/img/${items.img}`)} alt={items.img}/>;
        }
    }
}

const useStyles = makeStyles(theme => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 40,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
        minHeight: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    img: {
        width: '100%',
    },
    text: {
        width: '100%',
        whiteSpace: 'initial',
        textAlign: 'left',
        textIndent: 32,
        fontSize: 16,
        lineHeight: '32px',
    },
}));

const HotInfoList = ({fetchHostInfoList, hotInfoList, history}) => {
    const classes = useStyles();
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    
    useEffect(() => {
        fetchHostInfoList();
    });

    const renderItem = (items, index) => {
        return (
            <div className={classes.container} key={index} onClick={() => history.push('/solution/dynaTest')} >
                <div style={{ gridColumnEnd: checkWidth(isPc, index, 1) }}>
                    <Paper className={classes.paper}>{checkImgOrText(isPc, items, index, 1, classes)}</Paper>
                </div>
                <div style={{ gridColumnEnd: checkWidth(isPc, index, 2), marginTop: isPc ? 0 : -20 }}>
                    <Paper className={classes.paper}>{checkImgOrText(isPc, items, index, 2, classes)}</Paper>
                </div>
            </div>
        )
    }

    return (
        <div>
            {
                hotInfoList.map((items,index) => renderItem(items, index))
            }
        </div>
    );
}

HotInfoList.propTypes = {
    fetchHostInfoList: PropTypes.func.isRequired,
    hotInfoList: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(HotInfoList);