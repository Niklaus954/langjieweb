import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => {
    return {
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
    };
});

const About = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <div className={classes.aboutWrap} style={{display: matches ? 'flex' : 'block'}}>
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
    )
}

export default About