import api from './api'

const fetchBasicInfo = async params => {
    const result = await api({
        url: '/open/knowledge/1',
    });
    return result;
}

export default {
    fetchBasicInfo,
};