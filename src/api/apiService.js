import api from './api'

const getTicket = async params => {
    const result = await api({
        url: '/open/getTicket',
    });
    return result;
}

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

// 合同列表
const fetchContract = async params => {
    const result = await api({
        url: '/open/service/getContract',
        queryData: {
            page: params.page ? Number(params.page) : 1,
            pageSize: params.pageSize ? Number(params.pageSize) : 10,
            keywords: params.keywords ? params.keywords : '',
        },
    });
    console.log(result)
    return result;
}

// 合同详情
const getContractInfo = async params => {
    const result = await api({
        url: '/open/service/getContract/' + params.contract_no,
    });
    return result;
}

//快递查询
const getExpressInfo = async params  => {
    const result = await api({
        url: "/open/service/queryExpress/"+params
    })
    return result
}
//维修确认收件
const repairTakeConfirm = async params => {
    const result = await api({
        method: "put",
        url: "/open/service/repair/takeConfirm/"+params
    })
    return result
}

//合同确认收件
const contractTakeConfirm = async params => {
    const result = await api({
        method: "put",
        url: "/open/service/contract/takeConfirm/"+params
    })
    return result
}

// 获取云盘列表
const fetchCloudDiskList = async params => {
    const result = await api({
        url: '/open/service/cloudDisk/getList',
        queryData: {
            page: params.page ? Number(params.page) : 1,
            pageSize: params.pageSize ? Number(params.pageSize) : 10,
            keywords: params.keywords ? params.keywords : '',
        },
    })
    return result;
}

// 获取指定云盘信息
const fetchCloudDiskInfo = async params => {
    const result = await api({
        url: '/open/service/cloudDisk/info',
        queryData: {
            fileId: params.fileId,
        },
    })
    return result;
}

// 根据云盘id下载软件，文档，安装盘，图库
const downloadByCloudDiskId = async params => {
    const { fileId, picId } = params;
    let url = '/open/service/cloudDisk/download/' + fileId;
    if (picId) {
        url += '/' + picId;
    }
    const result = await api({
        method: 'post',
        url,
    })
    return result;
}

// 下载安装盘中的依赖
const downloadDependency = async params => {
    const { fileId, type, installDiskId } = params;
    const result = await api({
        url: '/open/service/burnDisk/buildDependency/' + installDiskId,
        method: 'post',
        formData: {
            fileId,
            type,
        },
    })
    return result;
}

const downLoadSoftDisk = async params => {
    const result = await api({
        url: '/open/burnDisk/download/'+params
    })
    return result
}

// 根据sn下载安装盘
const downloadInstallDiskBySn = async params => {
    const { sn } = params;
    const result = await api({
        url: '/open/service/cloudDisk/download/' + sn,
        method: 'post',
    })
    return result;
}

// 是否在控制器产品显示下载安装盘
const checkSnAccess = async params => {
    const { sn } = params;
    const result = await api({
        url: '/open/service/burnDisk/checkSnAccess',
        queryData: { sn },
    })
    return result;
}

const changeCloudDiskStar = async params => {
    const { id, star } = params
    const result = await api({
        url: '/open/service/cloudDisk/star',
        method: 'PUT',
        formData: {
            _id: id,
            star
        }
    })
    return result
}

export default {
    getTicket,
    fetchRepair,
    fetchRepairInfo,
    fetchVirCard,
    fetchVirCardInfo,
    fetchContract,
    getContractInfo,
    getExpressInfo,
    repairTakeConfirm,
    contractTakeConfirm,
    fetchCloudDiskList,
    fetchCloudDiskInfo,
    downloadByCloudDiskId,
    downloadDependency,
    downLoadSoftDisk,
    downloadInstallDiskBySn,
    checkSnAccess,
    changeCloudDiskStar
};