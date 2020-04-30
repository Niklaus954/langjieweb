import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import FadeTransitions from '../Common/FadeTransitions'
import { Button } from '@material-ui/core';
import apiShop from '../../api/apiShop'
import { Toast, ActivityIndicator } from 'antd-mobile'
import { Checkbox, FormControlLabel, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

const Pay = props => {
    const [amount, setAmount] = useState(0);
    const [paySn, setPaySn] = useState('');
    const [orderSn, setOrderSn] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        if (!props.location.state) {
            props.history.push('/shop/myOrder');
            return;
        }
        setPaySn(props.location.state.pay_sn);
        setOrderSn(props.location.state.order_sn);
        fetchOrderInfo(props.location.state.order_sn);
    }, []);

    const fetchOrderInfo = async orderSn => {
        const result = await apiShop.fetchOrderInfo(orderSn);
        if (result.code === 200) {
            setAmount(result.data.total_amount);
        }
    }

    const subPay = async () => {
        setDisabled(true);
        setAnimating(true);
        const result = await apiShop.applyPay(paySn);
        if (result.code === 200) {
            const payRes = await apiShop.payNoti(paySn);
            setAnimating(false);
            if (payRes.code === 200) {
                Toast.info(payRes.msg);
                setTimeout(() => {
                    props.history.push({
                        pathname: '/shop/myOrder',
                        state: {
                            index: 1,
                        },
                    });
                }, 1000);
            }
        } else {
            setAnimating(false);
        }
    }

    return (
        <FadeTransitions>
            <div style={{marginTop: 10, padding: 10}}>
                <div style={{fontSize: 12, color: '#999', marginLeft: 16, marginBottom: 8}}>订单信息</div>
                <ListItem style={{borderTop: '1px solid #eee'}}>
                    <ListItemText>订单号</ListItemText>
                    <ListItemSecondaryAction>{orderSn}</ListItemSecondaryAction>
                </ListItem>
                <ListItem style={{borderTop: '1px solid #eee', borderBottom: '1px solid #eee'}}>
                    <ListItemText>金额</ListItemText>
                    <ListItemSecondaryAction>{'￥' + amount}</ListItemSecondaryAction>
                </ListItem>
                <div style={{width: '100%', height: 80}}></div>
                <div style={{fontSize: 12, color: '#999', marginLeft: 16, marginBottom: 8}}>请选择支付方式</div>
                <FormControlLabel
                    style={{width: '95%', marginLeft: 5, borderTop: '1px solid #eee', borderBottom: '1px solid #eee'}}
                    control={<Checkbox checked={true} />}
                    label="langjiePay"
                />
                <Button style={{position: 'fixed', width: '100%', bottom: 0, left: 0}}
                    variant="contained" 
                    color="primary"
                    disabled={disabled}
                    onClick={() => subPay()}
                    >
                    确认支付￥{amount}
                </Button>
                <ActivityIndicator animating={animating} toast text="正在支付" />
            </div>
        </FadeTransitions>
    );
}

export default withRouter(Pay);