import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MediaQuery from 'react-responsive';
import CONFIG from '../../config'


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

class HotInfoList extends Component {

    componentWillMount() {
        const { fetchHostInfoList } = this.props;
        fetchHostInfoList();
    }

    renderItem = (items, index) => {
        const { classes } = this.props;
        return (
                <MediaQuery key={index} minDeviceWidth={CONFIG.minDeviceWidth}>
                    {
                        matches => (
                            <div className={classes.container} key={index} >
                                <div style={{ gridColumnEnd: checkWidth(matches, index, 1) }}>
                                    <Paper className={classes.paper}>{checkImgOrText(matches, items, index, 1, classes)}</Paper>
                                </div>
                                <div style={{ gridColumnEnd: checkWidth(matches, index, 2), marginTop: matches ? 0 : -20 }}>
                                    <Paper className={classes.paper}>{checkImgOrText(matches, items, index, 2, classes)}</Paper>
                                </div>
                            </div>
                        )
                    }
                </MediaQuery>
            
        )
    }

    render() {
        const { hotInfoList } = this.props;
        return (
            <div>
                {
                    hotInfoList.map((items,index) => this.renderItem(items, index))
                }
            </div>
        );
    }
}

export default withStyles(theme => ({
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
}))(HotInfoList);