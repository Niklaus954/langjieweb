import api from './api'

// 关于朗杰
const fetchBasicInfo = async params => {
    const result = await api({
        url: '/open/knowledge/56',
    });
    return result
}

// 推荐阅读
const fetchRecommendReading = async params => {
    const result = await api({
        url: '/open/knowledge/recommendReading',
        queryData: {
            page: params.page ? Number(params.page) : 1,
            pageSize: params.pageSize ? Number(params.pageSize) : 30,
        },
    });
    return result;
}

const fetchRecommendReadingById = async params => {
    const result = await api({
        url: `/open/knowledge/${params.contentId}`
    })
    return result
}

// 近期活动
const fetchRecentActivity = async params => {
    const result = await api({
        url: '/open/knowledge/recentActivity',
        queryData: {
            page: params.page ? Number(params.page) : 1,
            pageSize: params.pageSize ? Number(params.pageSize) : 30,
        },
    });
    return result;
}

const fetchRecentActivityById = async params => {
    const result = await api({
        url:  `/open/knowledge/${params.activityId}`
    })
    return result
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

//获取access_token
const fetchAccessToken = async() => {
    const result = await api({
        url: '/wx/getToken'
    })
    return result
}

export default {
    fetchBasicInfo,
    fetchRecommendReading,
    fetchRecommendReadingById,
    fetchRecentActivity,
    fetchRecentActivityById,
    fetchEventRecord,
    fetchContactUs,
    fetchAccessToken,
};