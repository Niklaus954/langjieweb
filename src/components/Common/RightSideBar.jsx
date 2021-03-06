import React from 'react'
import {
    withRouter,
} from 'react-router-dom'
import { Button, Drawer } from '@material-ui/core';
import Common from './Common'
import PropTypes from 'prop-types'

const RightSideBar = ({ showRightSideBar, updateShowRightSideBar, selectedSideMenu, memberInfo, location, history }) => {
    
    const login = () => {
        if (location.pathname === '/login') {
            updateShowRightSideBar(false);
            return;
        }
        history.push({
            pathname: '/login',
            search: '?path=' + selectedSideMenu,
        });
        updateShowRightSideBar(false);
    }

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    const showSuperAuth = () => {
        let showSuperAuth = false;
        try {
            const lj_member_info = JSON.parse(localStorage.getItem('lj_member_info'));
            if (lj_member_info.company === '杭州朗杰测控技术开发有限公司' && Number(lj_member_info.checked) === 1 ) {
                showSuperAuth = true;
            }
        } catch (e) {
            
        }
        return showSuperAuth;
    }

    return (
        <Drawer anchor={'right'} open={showRightSideBar} onClose={() => updateShowRightSideBar(false)}>
            {
                !Common.getAuthToken() && (
                    <div>
                        <Button variant="outlined" style={{width: 150, margin: 20}} onClick={() => login()}>登陆</Button>
                    </div>
                )
            }
            {
                Common.getAuthToken() && (
                    <div>
                        <div style={{textAlign: 'center', marginTop: 16}}>{memberInfo.name}</div>
                        <div>
                            <Button variant="outlined" style={{width: 150, margin: '20px 20px 0px 20px'}} onClick={() => history.push('/shop/cart')}>购物车</Button>
                        </div>
                        <div>
                            <Button variant="outlined" style={{width: 150, margin: '20px 20px 0px 20px'}} onClick={() => history.push('/shop/myOrder')}>订单</Button>
                        </div>
                        {
                            Common.showSuperAuth() && (
                                <div>
                                    <Button onClick={() => history.push('/superAuth?path='+history.location.pathname)} variant="outlined" style={{width: 150, margin: '20px 20px 0px 20px'}}>超级权限</Button>
                                </div>
                            )
                        }
                        <Button variant="outlined" style={{width: 150, margin: 20}} onClick={() => logout()}>注销</Button>
                    </div>
                )
            }
        </Drawer>
    )
}

RightSideBar.propTypes = {
    showRightSideBar: PropTypes.bool.isRequired,
    updateShowRightSideBar: PropTypes.func.isRequired,
    selectedSideMenu: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(RightSideBar)