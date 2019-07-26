import React, { useEffect, useState } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import PropTypes from 'prop-types'

const Login = ({ location, history }) => {
    const [ redirectUrl, setRedirectUrl ] = useState('');


    useEffect(() => {
        const { search } = location;
        const query = search.split('?')[1];
        const param = query.split('&');
        const hashMapper = {};
        param.forEach((items, index) => {
            const key = items.split('=')[0];
            const value = items.split('=')[1];
            hashMapper[key] = value;
        });
        const pathname = hashMapper['path'];
        setRedirectUrl(pathname);
    }, []);

    return (
        <div style={{width: '100%'}}>
            <iframe 
                key={'loginIframe'}
                title={'loginIframe'}
                style={{width: '100%', height: 420, border: 'none', marginTop: 112}} 
                src={'https://open.weixin.qq.com/connect/qrconnect?appid=wx19792965396beb35&redirect_uri=' + encodeURIComponent('https://os.langjie.com/web/#checkLogin?redirectUrl=' + redirectUrl) + '&response_type=code&scope=snsapi_login#wechat_redirect'} 
                frameBorder="0" />
        </div>
    );
}

Login.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default withRouter(Login);
