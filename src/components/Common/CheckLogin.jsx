import React, { useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import PropTypes from 'prop-types'

const CheckLogin = ({ location, history }) => {

    useEffect(() => {
        // 获取code
        // 获取重定向pathname
        // 后台code校验
        // 跳转到pathname
        const { search } = location;
        const query = search.split('?')[1];
        const param = query.split('&');
        const hashMapper = {};
        param.forEach((items, index) => {
            const key = items.split('=')[0];
            const value = items.split('=')[1];
            hashMapper[key] = value;
        });
        const redirectUrl = hashMapper['redirectUrl'];
        const code = hashMapper['code'];
        console.log(redirectUrl);
        console.log(code);
        setTimeout(() => {
            localStorage.setItem('token', 'aaaaaaaaaaaa');
            history.push(redirectUrl);
        }, 5000);
    }, []);

    return (
        <div style={{width: '100%'}}>
            loading...    
        </div>
    );
}

CheckLogin.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default withRouter(CheckLogin);