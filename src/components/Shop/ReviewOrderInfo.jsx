import React, { useState, useEffect } from 'react';
import CONFIG from '../../config'
import {
    withRouter,
} from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'
import { Button, Typography } from '@material-ui/core';
import apiShop from '../../api/apiShop'
import CommonOrderInfo from './CommonOrderInfo'

const ReviewOrderInfo = props => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [data, setdata] = useState([]);
    const [needPay, setNeedPay] = useState(false);
    const [orderSn, setOrderSn] = useState('');
    const [paySn, setPaySn] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const waitPayState = ['未付款', '付款中'];

    useEffect(() => {
        if (!props.location.state) {
            props.history.push('/shop/myOrder');
            return;
        }
        const { order_sn } = props.location.state;
        fetch(order_sn);
    }, []);

    const fetch = async sn => {
        const result = await apiShop.fetchOrderInfo(sn);
        const data = [];
        const { supList: list, state, total_amount, sn: order_sn, pay_sn } = result.data;
        for (let i = 0; i < list.length; i++) {
            const o = {
                id: list[i].id,
                num: list[i].num,
                goods: {
                    series: list[i].series,
                    structure: list[i].structure,
                    load_range: list[i].load_range,
                    size: list[i].size,
                    price: list[i].price,
                    ctrlInfo: {
                        chinese_name: list[i].goods_name,
                        img: list[i].goods_img,
                    },
                },
            };
            data.push(o);
        }
        setdata(data);
        setTotalAmount(total_amount);
        setOrderSn(order_sn);
        setPaySn(pay_sn);
        if (waitPayState.includes(state)) {
            setNeedPay(true);
        }
    }

    const gotoPay = () => {
        props.history.push({
            pathname: '/shop/pay',
            state: {
                order_sn: orderSn,
                pay_sn: paySn,
            },
        });
    }

    return (
        <FadeTransitions>
            <div style={{display: 'flex', padding: 10, flexDirection: isPc ? 'row' :'column'}}>
                <CommonOrderInfo data={data} />
                { needPay && <div style={{width: '100%', height: 50, display: 'flex', justifyContent: 'space-between', position: 'fixed', bottom: 0, left: 0, borderTop: '1px solid #eee'}}>
                    <div style={{width: '100%',display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <div style={{marginLeft: 12}}>
                            <span>合计：</span>
                            <span style={{color: 'rgb(255, 80, 0)'}}>￥{totalAmount}</span>
                        </div>
                        <div style={{height: '100%', display: 'flex', alignItems: 'center', marginLeft: 20}} >
                            <Button
                                style={{height: '100%', borderRadius: 0}}
                                variant="contained" 
                                color="primary"
                                onClick={() => gotoPay(true)}
                                >
                                去支付
                            </Button>
                        </div>
                    </div>
                </div> }
            </div>
        </FadeTransitions>
    );
}

export default withRouter(ReviewOrderInfo);