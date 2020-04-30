import api from './api'
import CONFIG from '../config';
const getHeader = () => {
    return {
        access_token: localStorage.getItem('shop_access_token'),
    };
}

const loginShop = async unionid => {
    const result = await api({
        url: CONFIG.shopUrl + '/login/' + unionid,
        method: 'post',
        reloadUrl: true,
    });
    return result;
}

const fetchGoodsList = async params => {
    const result = await api({
        url: CONFIG.shopUrl + '/ctrl',
        reloadUrl: true,
    });
    return result;
}

const fetchGoodsInfo = async model => {
    const result = await api({
        url: CONFIG.shopUrl + '/ctrl/' + model,
        reloadUrl: true,
    });
    return result;
}

const fetchCart = async () => {
    const result = await api({
        url: CONFIG.shopUrl + '/cart',
        reloadUrl: true,
        header: getHeader(),
    });
    return result;
}

const createOrder = async cartIdArr => {
    const result = await api({
        url: CONFIG.shopUrl + '/order',
        reloadUrl: true,
        formData: {
            cartId: cartIdArr,
        },
        method: 'post',
        header: getHeader(),
    });
    return result;
}

const applyPay = async pay_sn => {
    const result = await api({
        url: CONFIG.shopUrl + '/pay/applyPay/' + pay_sn,
        reloadUrl: true,
        formData: {
            pay_type: 'langjiePay',
        },
        method: 'post',
        header: getHeader(),
    });
    return result;
}

const payNoti = async pay_sn => {
    const result = await api({
        url: CONFIG.shopUrl + '/pay/langjiePayNoti/',
        reloadUrl: true,
        formData: {
            out_trade_no: pay_sn,
        },
        method: 'post',
        header: getHeader(),
    });
    return result;
}

const addCart = async params => {
    const result = await api({
        url: CONFIG.shopUrl + '/cart',
        reloadUrl: true,
        formData: {
            num: params.num,
            goodsId: params.goodsId,
        },
        method: 'post',
        header: getHeader(),
    });
    return result;
}

const updateCartNum = async params => {
    const result = await api({
        url: CONFIG.shopUrl + '/cart/updateGoodsNum',
        reloadUrl: true,
        formData: params,
        method: 'put',
        header: getHeader(),
    });
    return result;
}

const removeCartId = async id => {
    const result = await api({
        url: CONFIG.shopUrl + '/cart/' + id,
        reloadUrl: true,
        method: 'delete',
        header: getHeader(),
    });
    return result;
}

const fetchOrderInfo = async sn => {
    const result = await api({
        url: CONFIG.shopUrl + '/order/' + sn,
        reloadUrl: true,
        header: getHeader(),
    });
    return result;
}

const fetchMyOrderList = async () => {
    const result = await api({
        url: CONFIG.shopUrl + '/order/selfList',
        reloadUrl: true,
        header: getHeader(),
    });
    return result;
}

export default {
    loginShop,
    fetchGoodsList,
    fetchGoodsInfo,
    fetchCart,
    createOrder,
    applyPay,
    payNoti,
    addCart,
    updateCartNum,
    removeCartId,
    fetchOrderInfo,
    fetchMyOrderList,
};