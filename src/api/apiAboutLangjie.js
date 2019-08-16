import api from './api'

const fetchBasicInfo = async params => {
    const result = await api({
        url: '/open/knowledge/1',
    });
    return result;
}

const fetchEventRecord = async params => {
    const result = await api({
        url: '/open/knowledge/51',
    });
    return result;
}

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