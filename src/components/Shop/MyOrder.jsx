import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import CONFIG from '../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'
import apiShop from '../../api/apiShop'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import { ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import * as moment from 'moment';

const MyOrder = props => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [data, setdata] = useState([[], [], []]);
    const defaultIndex = props.location.state ? props.location.state.index : 0;
    const [value, setValue] = React.useState(defaultIndex);

    const waitPayState = ['未付款', '付款中'];
    const finishPayState = ['付款成功'];

    useEffect(() => {
        const fetch = async () => {
            const result = await apiShop.fetchMyOrderList();
            if (result.code === 200) {
                const data = [[], [], []];
                for (let i = 0; i < result.data.length; i++) {
                    if (waitPayState.includes(result.data[i].state)) {
                        data[0].push(result.data[i]);
                    } else if (finishPayState.includes(result.data[i].state)) {
                        data[1].push(result.data[i]);
                    } else {
                        data[2].push(result.data[i]);
                    }
                }
                setdata(data);
            }
        }
        fetch();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const gotoReview = sn => {
        props.history.push({
            pathname: '/shop/reviewOrderInfo',
            state: {
                order_sn: sn,
            },
        });
    }

    const renderOrderList = () => {
        return data.map((items, index) => {
            return (
                <div key={index} index={index}>
                    {
                        items.map(it => {
                            return (
                                <div onClick={() => gotoReview(it.sn)} key={it.id} style={{margin: '10px 10px 20px 10px', border: '1px solid #eee', borderRadius: 5}}>
                                    <ListItem>
                                        <ListItemText>订单号</ListItemText>
                                        <ListItemSecondaryAction>{it.sn}</ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem style={{borderTop: '1px solid #eee'}}>
                                        <ListItemText>创建时间</ListItemText>
                                        <ListItemSecondaryAction>{moment(it.create_time).format('YYYY-MM-DD HH:mm:ss')}</ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem style={{borderTop: '1px solid #eee'}}>
                                        <ListItemText>金额</ListItemText>
                                        <ListItemSecondaryAction>{'￥' + it.total_amount}</ListItemSecondaryAction>
                                    </ListItem>
                                </div>
                            )
                        })
                    }         
                </div>
            )
        });
    }

    return (
        <FadeTransitions>
            <div style={{display: 'flex', flexDirection: isPc ? 'row' :'column'}}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="待付款" />
                        <Tab label="已完成" />
                        <Tab label="已关闭" />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    { renderOrderList() }
                </SwipeableViews>
            </div>
        </FadeTransitions>
    );
}

export default withRouter(MyOrder);