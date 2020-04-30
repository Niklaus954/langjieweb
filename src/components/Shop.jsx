import React, { useEffect } from 'react';
import {
    HashRouter as Router,
    Route,
    withRouter,
    Redirect,
} from 'react-router-dom'
import CONFIG from '../config'
import GoodsList from './Shop/GoodsList'
import Cart from './Shop/Cart'
import OrderInfo from './Shop/OrderInfo'
import GoodsInfo from './Shop/GoodsInfo'
import Pay from './Shop/Pay'
import MyOrder from './Shop/MyOrder'
import ReviewOrderInfo from './Shop/ReviewOrderInfo'
import Common from './Common/Common'

const Shop = props => {
    const isPc = window.innerWidth < CONFIG.minDeviceWidthNum ? false : true;
    const shopRouteArr = [
        {
            pathname: '/shop/goodsList',
            component: GoodsList,
            text: '商品列表',
            auth: false,
        },
        {
            pathname: '/shop/goodsInfo/:model',
            component: GoodsInfo,
            text: '商品详情',
            auth: false,
        },
        {
            pathname: '/shop/cart',
            text: '购物车',
            component: Cart,
            auth: true,
        },
        {
            pathname: '/shop/orderInfo',
            text: '确认订单',
            component: OrderInfo,
            auth: true,
        },
        {
            pathname: '/shop/pay',
            text: '支付',
            component: Pay,
            auth: true,
        },
        {
            pathname: '/shop/myOrder',
            text: '我的订单',
            component: MyOrder,
            auth: true,
        },
        {
            pathname: '/shop/reviewOrderInfo',
            text: '订单详情',
            component: ReviewOrderInfo,
            auth: true,
        },
    ];

    useEffect(() => {
        init();
    }, [ props.location.pathname ]);

    const init = () => {
        let selectedName = shopRouteArr[0].text;
        for (let i = 0; i < shopRouteArr.length; i++) {
            if (shopRouteArr[i].pathname === props.location.pathname) {
                selectedName = shopRouteArr[i].text;
            }
        }
        if (props.location.pathname.indexOf('/shop/goodsInfo') !== -1) selectedName = '商品详情';
        props.updateSelectedSideName(selectedName);
        props.updateSelectedSideMenu('/shop/goodsList');
        props.updateSideMenuList(CONFIG.menu);
    }

    const initRouteArr = () => {
        const token = Common.getAuthToken();
        return shopRouteArr.map(items => {
            return <Route key={items.pathname} path={items.pathname} render={() => 
                (!items.auth ? (<items.component />) : (token ? <items.component /> : <Redirect to={{
                    pathname: '/login?path=' + items.pathname,
                }} />)
            )} />
        });
    }

    return (
        <Router>
            <div style={{width: '100%', overflow: 'auto', WebkitOverflowScrolling: 'touch', wordBreak: 'break-all', whiteSpace: 'preWrap', background: "rgb(245, 245, 249)"}}>
                { initRouteArr() }
            </div>
        </Router>
    )
}

export default withRouter(Shop)