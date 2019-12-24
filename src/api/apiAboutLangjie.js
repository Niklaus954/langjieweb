import api from './api'

// 关于朗杰
const fetchBasicInfo = async params => {
    const result = await api({
        url: '/open/knowledge/56',
    });
    return result;
}

// 大事记
const fetchEventRecord = async params => {
    const result = await api({
        url: '/open/knowledge/51',
    });
    return result;
}

// 联系我们
const fetchContactUs = async params => {
    const result = await api({
        url: '/open/knowledge/35',
    });
    return result;
}

export default {
    fetchBasicInfo,
    fetchEventRecord,
    fetchContactUs,
};