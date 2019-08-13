import api from './api'

const fetchVerCode = async params => {
    const { formData } = params;
    const result = await api({
        url: 'https://api.langjie.com/login/getVerCode',
        method: 'POST',
        formData,
        reloadUrl: true,
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
    const result = await api({
        url: 'https://api.langjie.com/member/info/' + unionid,
        reloadUrl: true,
    });
    return result;
}

export default {
    fetchVerCode,
    checkVerCode,
    fetchMemberInfo,
};