import api from './api'
import request from 'superagent';
import { Toast } from 'antd-mobile'

const fetchVerCode = async params => {
    const { formData } = params;
    const result = await new Promise(resolve => {
        request.post('https://api.langjie.com/login/getVerCode')
            .send(formData)
            .end((err, res) => {
                if (err) {
                    Toast.info(err.message);
                    return false;
                }
                resolve(res.body);
            });
    });
    return result;
}

const checkVerCode = async params => {
    const { formData } = params;
    const result = await api({
        url: '/open/login/checkVerCode',
        method: 'POST',
        formData,
    });
    return result;
}

const fetchMemberInfo = async params => {
    const { unionid } = params;
    const result = await new Promise(resolve => {
        request.get('https://api.langjie.com/member/info/' + unionid)
            .end((err, res) => {
                if (err) {
                    Toast.info(err.message);
                    return false;
                }
                resolve(res.body);
            });
    });
    return result;
}

const checkWxCode = async params => {
    const { formData } = params;
    const result = await api({
        url: 'https://www.langjie.com/open/login/scanCode',
        method: 'POST',
        reloadUrl: true,
        formData,
    });
    return result;
}

const refreshSideMenuAuth = async params => {
    const result = await api({
        url: '/open/refreshSideMenuAuth',
        method: 'POST',
    });
    return result;
}

export default {
    fetchVerCode,
    checkVerCode,
    fetchMemberInfo,
    checkWxCode,
    refreshSideMenuAuth,
};