import api from './api'

// 首页文章
const fetchArticle = async params => {
    const result = await api({
        url: '/open/knowledge/indexArticle',
    });
    return result;
}

// 首页轮播
const fetchImage = async params => {
    const result = await api({
        url: '/open/knowledge/60',
    });
    return result;
}

export default {
    fetchArticle,
    fetchImage,
};