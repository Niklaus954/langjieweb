import React, { useState, useEffect } from 'react';
import ItemList from '../Common/ItemList';
import apiService from '../../api/apiService';
import CONFIG from '../../config';
import {
    withRouter,
} from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'
import { List, ListView } from 'antd-mobile';
import ParagraphStyles from "../Common/ParagraphStyles";
import AppBar from '@material-ui/core/AppBar';
import {Tabs, Tab, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types'
import { useTheme, makeStyles } from '@material-ui/core/styles';

const Item = List.Item;
const tabArr = ['生产信息', '销售信息', '注册历史', '保修单']

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return(
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}
  
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
}));

const VirCard = props => {
    const [infoList, setInfoList] = useState([]);
    const [album, setAlbum] = useState([])
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const classes = useStyles();
    const theme = useTheme();
    const [value ,setValue] = useState(0)

    const backSelectedItem = async item => {
        if (isPc) {
            const result = await apiService.fetchVirCardInfo(item)
            console.log(result)
            setInfoList(result.data)
        } else {
            props.history.push({
                pathname: '/virInfo/' + item.serialNo, 
            });
        }
    }

    const renderList = items => {
        const validTime = items.validTime === 0 ? '永久注册' : items.validTime;
        return (
            <div style={{ flex: 1, padding: 4, marginLeft: 4 }}>
                <p>序列号: {items.serialNo}</p>
                <p>型号: {items.model}</p>
                <p>有效日期: {validTime}</p>
            </div>
        )
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
      const handleChangeIndex = (index) => {
        setValue(index);
      };

    return (
        <FadeTransitions>
            <div style={{ width: '100%', height: '100%', display: 'flex', borderRight: '1px solid #eee' }}>
                <div style={{ width: isPc ? 400 : '100%', overflow: 'auto' }}>
                    <ItemList
                        isPc={isPc}
                        fetchList={apiService.fetchVirCard}
                        renderAlbum={true}
                        renderList={renderList}
                        backSelectedItem={backSelectedItem}
                    ></ItemList>
                </div>
                {isPc ? <div style={{margin: '0 auto'}}>
                    <div className="img" style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
                        <img src="http://iph.href.lu/240x160?text=产品图片" alt=""/>
                    </div>
                    <div className={classes.root}>
                        <AppBar position="static" color="default">
                            <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                            >
                            {tabArr.map((tab, index) => (
                                <Tab key={index} label={tab} {...a11yProps(index)} />
                            ))}
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            {tabArr.map((tab, index) => (
                                <TabPanel key={index} value={value} index={index} dir={theme.direction}>{tab}</TabPanel>
                            ))}
                        </SwipeableViews>
                    </div>
                </div> : <div></div>}
            </div>
        </FadeTransitions>
    )
}

export default withRouter(VirCard);