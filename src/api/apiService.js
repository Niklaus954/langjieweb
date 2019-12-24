import api from './api'

// 维修列表
const fetchRepair = async params => {
    const result = await api({
        url: '/open/service/getRepair',
        queryData: {
            page: params.page ? Number(params.page) : 1,
            pageSize: params.pageSize ? Number(params.pageSize) : 10,
            keywords: params.keywords ? params.keywords : '',
        },
    });
    return result;
}

// 维修详情
const fetchRepairInfo = async params => {
    const result = await api({
        url: '/open/service/getRepair/' + params.repair_contractno,
    });
    return result;
}

// 威程卡列表
const fetchVirCard = async params => {
    const result = await api({
        url: '/open/service/getVirCard',
        queryData: {
            page: params.page ? Number(params.page) : 1,
            pageSize: params.pageSize ? Number(params.pageSize) : 10,
            keywords: params.keywords ? params.keywords : '',
        },
    });
    return result;
}

// 威程卡详情
const fetchVirCardInfo = async params => {
    const result = await api({
        url: '/open/service/getVirCard/' + params.serialNo,
    });
    return result;
}

export default {
    fetchRepair,
    fetchRepairInfo,
    fetchVirCard,
    fetchVirCardInfo,
};