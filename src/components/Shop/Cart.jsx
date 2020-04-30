import React, { useState, useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import CONFIG from '../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FadeTransitions from '../Common/FadeTransitions'
import apiShop from '../../api/apiShop'
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Stepper, Toast } from 'antd-mobile';

const Cart = props => {
    const isPc = useMediaQuery(CONFIG.minDeviceWidth);
    const [data, setData] = useState([]);
    const [priceMap, setPriceMap] = useState({});
    const [selectArr, setSelectArr] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const [totalSelect, setTotalSelect] = useState(false);
    const [isManage, setIsManage] = useState(false);

    useEffect(() => {
        fetch();
    }, []);

    async function fetch() {
        const result = await apiShop.fetchCart();
        if (result.code !== 200) {
            return;
        }
        const priceMap = {};
        for (let i = 0; i < result.data.length; i++) {
            const { num, id, goods } = result.data[i];
            const { price } = goods;
            priceMap[id] = { price, num, amount: Number(price) * Number(num), checked: false };
        }
        setPriceMap(priceMap);
        setData(result.data);
    }

    // 改变数量
    const goodsNumChange = (id, num) => {
        priceMap[id].num = num;
        priceMap[id].amount = Number(num) * Number(priceMap[id].price);
        setPriceMap(JSON.parse(JSON.stringify(priceMap)));
        if (selectArr.includes(id)) {
            goodsChecked(id, true);
        }
    }

    // 单个选择
    const goodsChecked = (id, checked) => {
        priceMap[id].checked = checked;
        let _arr = selectArr;
        if (checked) {
            _arr.push(id);
        } else {
            _arr = _arr.filter(items => items !== id);
        }
        _arr = [ ...new Set(_arr) ];
        let totalAmount = 0;
        for (let i = 0; i < _arr.length; i++) {
            totalAmount += priceMap[_arr[i]].amount;
        }
        setPriceMap(JSON.parse(JSON.stringify(priceMap)));
        setSelectArr(_arr);
        setTotalAmount(totalAmount);
        // 判断是否全部选择了
        if (_arr.length === Object.keys(priceMap).length) {
            setTotalSelect(true);
        } else {
            setTotalSelect(false);
        }
    }

    // 渲染列表
    const renderGoods = () => {
        return data.map(items => {
            const { price, num, checked } = priceMap[items.id];
            return (
                <div key={items.id} style={{display: 'flex', height: 100, padding: 10, marginBottom: 12, border: '1px solid #eee', borderRadius: 8}}>
                    <div style={{width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Checkbox checked={checked} onChange={e => goodsChecked(items.id, e.target.checked)}></Checkbox>
                    </div>
                    <div style={{width: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${items.goods.ctrlInfo.img})`, backgroundSize: '100% 100%'}}></div>
                    <div style={{flex: 1, marginLeft: 6, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <div>
                            <div style={{marginBottom: 4}}>{items.goods.ctrlInfo.chinese_name}</div>
                            <div style={{fontSize: 12, color: '#999'}}>主机风格：{items.goods.series}，主机结构：{ items.goods.structure }，最大量程：{ items.goods.load_range }，尺寸大小：{ items.goods.size }</div>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{fontSize: 22, marginTop: 5, color: 'rgb(255, 80, 0)'}}>￥{price}</div>
                            <div>
                                <Stepper
                                    style={{ width: 100 }}
                                    showNumber
                                    max={10}
                                    min={1}
                                    value={num}
                                    onChange={ v => goodsNumChange(items.id, v) }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }

    // 全选
    const totalCheck = checked => {
        let totalAmount = 0;
        const selectedArr = [];
        if (checked) {
            for (let i = 0; i < data.length; i++) {
                totalAmount += priceMap[data[i].id].amount;
                selectedArr.push(data[i].id);
                priceMap[data[i].id].checked = true;
            }
        } else {
            for (let id in priceMap) {
                priceMap[id].checked = false;
            }
        }
        setTotalSelect(checked);
        setSelectArr(selectedArr);
        setTotalAmount(totalAmount);
        setPriceMap(JSON.parse(JSON.stringify(priceMap)));
    }

    // 去结算
    const goToOrderViewPage = async () => {
        if (selectArr.length === 0) {
            Toast.info('请至少选择一件商品');
            return;
        }
        const params = {};
        for (let i = 0; i < selectArr.length; i++) {
            params[selectArr[i]] = priceMap[selectArr[i]].num;
        }
        const result = await apiShop.updateCartNum({ data: params });
        if (result.code === 200) {
            props.history.push({
                pathname: '/shop/orderInfo',
                state: {
                    selectArr: data.filter(items => selectArr.includes(items.id)),
                },
            });
        }
    }

    // 移除
    const remove = async () => {
        if (selectArr.length === 0) {
            Toast.info('请至少选择一件商品');
            return;
        }
        const r = window.confirm('移除后将不可恢复，是否继续？');
        if (!r) {
            return;
        }
        const _p = [];
        selectArr.forEach((items, index) => {
            _p[index] = new Promise(async resolve => {
                await apiShop.removeCartId(items);
                resolve();
            });
        });
        await Promise.all(_p);
        setData([]);
        setPriceMap({});
        setSelectArr([]);
        setTotalAmount(0);
        setTotalSelect(false);
        setIsManage(false);
        fetch();
    }

    return (
        <FadeTransitions>
            <div style={{padding: 10, flexDirection: isPc ? 'row' :'column'}}>
                <div style={{width: '100%', height: 30, display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{fontSize: 16}}>购物车（<span>{ data.length }</span>）</div>
                    <div onClick={() => setIsManage(!isManage)}>{ !isManage && '管理' }{ isManage && '完成' }</div>
                </div>
                {renderGoods()}
                <div style={{width: '100%', height: 50, display: 'flex', justifyContent: 'space-between', position: 'fixed', bottom: 0, left: 0, borderTop: '1px solid #eee'}}>
                    <FormControlLabel
                        style={{marginLeft: 6}}
                        control={<Checkbox checked={totalSelect} onChange={e => totalCheck(e.target.checked)} />}
                        label="全选"
                    />
                    {
                        !isManage && <div style={{display: 'flex', alignItems: 'center'}}>
                            <div>
                                <span>合计：</span>
                                <span style={{color: 'rgb(255, 80, 0)'}}>￥{totalAmount}</span>
                            </div>
                            <div style={{height: '100%', display: 'flex', alignItems: 'center', background: '#3f51b5', color: '#fff', padding: '0px 18px', marginLeft: 20}} onClick={() => goToOrderViewPage()} >
                                去结算
                            </div>
                        </div>
                    }
                    {
                        isManage && <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{height: '100%', display: 'flex', alignItems: 'center', background: '#3f51b5', color: '#fff', padding: '0px 18px', marginLeft: 20}} onClick={() => remove()} >
                            删除
                        </div>
                    </div>
                    }
                </div>
            </div>
        </FadeTransitions>
    );
}

export default withRouter(Cart);