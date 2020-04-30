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

const OrderInfo = props => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [data, setdata] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    const lj_member_info = JSON.parse(localStorage.getItem('lj_member_info'));

    useEffect(() => {
        if (!props.location.state) {
            props.history.push('/shop/goodsList');
            return;
        }
        let totalAmount = 0;
        props.location.state.selectArr.forEach(items => {
            totalAmount += Number(items.num) * Number(items.goods.price);
        });
        setTotalAmount(totalAmount);
        setdata(props.location.state.selectArr);
    }, []);

    const renderOrderInfo = () => {
        return data.map(items => {
            return (
                <div key={items.id} style={{display: 'flex' ,padding: 10, marginBottom: 12, border: '1px solid #eee', borderRadius: 8}}>
                    <div style={{width: 100, height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${items.goods.ctrlInfo.img})`, backgroundSize: '100% 100%'}}></div>
                    <div style={{flex: 1, marginLeft: 6, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <div>
                            <div style={{marginBottom: 4}}>{items.goods.ctrlInfo.chinese_name}</div>
                            <div style={{fontSize: 12, color: '#999'}}>主机风格：{items.goods.series}，主机结构：{ items.goods.structure }，最大量程：{ items.goods.load_range }，尺寸大小：{ items.goods.size }</div>
                            <div style={{marginTop: 5, color: 'rgb(255, 80, 0)'}}>
                                <span>￥{Number(items.num) * Number(items.goods.price)}</span>
                                <span style={{color: '#999', marginLeft: 12}}>x{items.num}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    const createOrder = async () => {
        setDisabled(true);
        const idArr = data.map(items => items.id);
        const result = await apiShop.createOrder(idArr);
        if (result.code === 200) {
            props.history.push({
                pathname: '/shop/pay',
                state: {
                    pay_sn: result.data.pay_sn,
                    order_sn: result.data.order_sn,
                },
            });
        }
    }

    return (
        <FadeTransitions>
            <div style={{display: 'flex', padding: 10, flexDirection: isPc ? 'row' :'column'}}>
                <div style={{height: 80, border: '1px solid #eee', borderRadius: 5, paddingLeft: 12, paddingTop: 10, marginBottom: 12}}>
                    <Typography variant="body2" gutterBottom>
                        { lj_member_info.name }
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        { lj_member_info.phone }
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        { lj_member_info.company }
                    </Typography>
                </div>
                <CommonOrderInfo data={data} />
                <div style={{width: '100%', height: 50, display: 'flex', justifyContent: 'space-between', position: 'fixed', bottom: 0, left: 0, borderTop: '1px solid #eee'}}>
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
                                disabled={disabled}
                                onClick={() => createOrder(true)}
                                >
                                提交订单
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </FadeTransitions>
    );
}

export default withRouter(OrderInfo);