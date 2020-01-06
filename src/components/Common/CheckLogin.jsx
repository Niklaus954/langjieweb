import React, { useEffect } from 'react';
import {
    withRouter,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import Common from './Common'
import apiLogin from '../../api/apiLogin'
import CircularProgress from '@material-ui/core/CircularProgress';

const CheckLogin = ({ location, history, updateMemberInfo }) => {

    useEffect(() => {
        // 获取code
        // 获取重定向pathname
        // 后台code校验
        // 跳转到pathname
        const { search } = location;
        const hashMapper = Common.getLocationParamMapper(search);
        const redirectUrl = hashMapper['redirectUrl'];
        const code = hashMapper['code'];
        // console.log(redirectUrl);
        // console.log(code);
        const fetch = async () => {
            const result = await apiLogin.checkWxCode({
                formData: { code },
            });
            Common.loginCallBack(result, {
                apiLogin,
                updateMemberInfo,
                history,
                redirectUrl,
                location,
            });
        }
        fetch();
    }, []);

    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
             <CircularProgress />
        </div>
    );
}

CheckLogin.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default withRouter(CheckLogin);
